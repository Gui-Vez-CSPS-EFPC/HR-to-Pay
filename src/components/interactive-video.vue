<template>
    <div class="video-player">
        <div class="row">
            <div class="col">
                <figure style="clear:both;position:relative;background-color: #000; margin-bottom: 0;">
                    <video :id="vId" @waiting="loading" @cuechange="readCaptions" @click="setPlaying" ref="videoplayer" :poster="posterurl" playsinline @loadedmetadata="resumePosition" @timeupdate="update" @ended="isPaused = !isPaused" crossorigin="anonymous">
                        <source :src="videourl">
                        <track key="chapen" v-if="chapterurl" kind="chapters" :src="chapterurl" @load="generate" default="">
                        <track key="suben" kind="metadata" :src="ccurl" srclang="en" label="captions" @cuechange="readCaptions">
                    </video>
                    <transition name="overlay-fade" appear>
                        <div class="overlay" v-show="showPlayOverlay && !videoDone">
                            <span class="fa fas fa-5x fa-play" role="presentation"></span>
                        </div>
                    </transition>
                    <transition name="overlay-fade" appear>
                        <div class="overlay done" v-show="videoDone">
                            <span class="fa fas fa-5x fa-check" role="presentation"></span>
                            <p class="text-center">{{ videoDoneTxt }}</p>
                        </div>
                    </transition>
                    <transition name="expand">
                        <figcaption class="CC" v-if="CCactive">
                            <p aria-live="polite">{{ Captions }}</p>
                        </figcaption>
                    </transition>
                    <div ref="video-controls" class="controls" data-state="hidden">
                        <transition name="tooltip-fade" appear>
                            <div id="timeline-tooltip" v-show="showTooltip">{{ formatTime(mousePosition) }}</div>
                        </transition>
                        <progress tabindex="0" @click="setTime" ref="progress" @mousemove="changeTime" @mouseover="changeTime" @mouseout="showTooltip = false" :value="PlayTime" min="0" max="100" @keyup.arrow-left="goBackwards" @keyup.arrow-right="goForward" :aria-label="timeline">
                            <span class="progress" ref="progress-bar" :style="'width:' + PlayTime + '%'"></span>
                        </progress>
                        <button class="videoControls" ref="playpause" @click="setPlaying" type="button" :aria-label="isPaused ? play : pause" :title="isPaused ? play : pause">
                            <span class="fa fas fa-play" role="presentation" v-if="isPaused"></span>
                            <span class="fa fas fa-pause" role="presentation" v-if="!isPaused"></span>
                        </button>
                        <button class="videoControls" ref="stop" @click="stopVideo" type="button" :aria-label="stop" :title="stop">
                            <span class="fa fas fa-stop" role="presentation"></span>
                        </button>
                        <button class="videoControls" ref="backward" @click="goBackwards" type="button" :aria-label="backward" :title="backward">
                            <span class="fa fas fa-backward" role="presentation"></span>
                        </button>
                        <button class="videoControls" ref="forward" @click="goForward" type="button" :aria-label="forward" :title="forward">
                            <span class="fa fas fa-forward" role="presentation"></span>
                        </button>
                        <!-- <button type="button" data-state="go-fullscreen"><i class="fas fa-compress"></i></button> -->
                        <p class="mediaTime">{{ formatTime(isPlayingNow)  }} / {{ formatTime(totalTime) }}</p>
                        <span class="showVolume">
                            <button class="videoControls" ref="mute" @click="isMuted = !isMuted" type="button" :title="isMuted ? unmute : mute" :aria-label="isMuted ? unmute : mute">
                                <span class="fa fas fa-volume-mute" role="presentation" v-if="isMuted"></span>
                                <span class="fa fas fa-volume-up" role="presentation" v-if="!isMuted"></span>
                            </button>
                            <label><input class="setVolume" type="range" v-model="setVolume" :title="'Volume: ' + setVolume + '%'" :aria-label="'Volume: ' + setVolume + '%'"><span class="sr-only">Volume</span></label>
                        </span>
                        <button class="videoControls" :aria-pressed="CCactive" style="margin-left: auto;" @click="showCC" type="button" :title="(CCactive ? hide : show) + closedcaptionning" :aria-label="(CCactive ? hide : show) + closedcaptionning">
                            <span :class="'fa fa-closed-captioning ' + solidOrRegular" role="presentation"></span>
                        </button>
                    </div>
                    <span class="sr-only">{{ sr_transcriptlocation }}</span>
                </figure>
            </div>
        </div>
        <div class="row" style="margin-top: 20px;">
            <div class="col">
                <h2 v-if="chapters">{{ segmentsTitle }}</h2>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col">
                <ul v-if="chapters" class="bar" ref="linkBar">
                    <li v-for="item, index in navBarTracks" :class="'chaptersLink ' + isItPlaying(index)">
                        <span>
                            <p>{{ item }}</p><br>
                            
                            <!-- Play button -->
                            <button v-if="modalArray[index]" @click="seek" class="playButton" :key="index" :data-start="Math.ceil(startTime[index] + 0.5) + .01" :data-end="endTime[index]" :title="playSegment + ' - ' + navBarTracks[index]" data-toggle="tooltip"><img src="./../assets/VideoIcon.svg" :data-start="Math.ceil(startTime[index] + 0.5) + .01" :data-end="endTime[index]" :alt="playIcon" width="48" height="48"><span class="sr-only">{{ playSegment }}: {{ navBarTracks[index] }}</span></button>

                            <!-- If the popup is a quiz -->
                            <button v-if="modalArray[index] && isInArray(index, currentPageQuiz)" class="activityButton" @click.prevent="accessibleModal(index)" :title="jumpQuiz + ' - ' + navBarTracks[index]" data-toggle="tooltip"><img src="./../assets/QuizIcon.svg" :alt="quizIcon" width="48" height="48"></button>

                            <!-- If the popup is a reference -->
                            <button v-else-if="modalArray[index] && isInArray(index, currentPageReferences)" class="activityButton" @click.prevent="accessibleModal(index)" :title="jumpReference + ' - ' + navBarTracks[index]" data-toggle="tooltip"><img src="./../assets/ReferenceIcon.svg" :alt="referenceIcon" width="48" height="48"></button>

                            <!-- If the popup is an info -->
                            <button v-else-if="modalArray[index] && isInArray(index, currentPageInfos)" class="activityButton" @click.prevent="accessibleModal(index)" :title="jumpInfo + ' - ' + navBarTracks[index]" data-toggle="tooltip"><img src="./../assets/InfoIcon.svg" :alt="infoIcon" width="48" height="48"></button>

                            <!-- If the popup is an activity -->
                            <button v-else-if="modalArray[index]" class="activityButton" @click.prevent="accessibleModal(index)" :title="jumpActivity + ' - ' + navBarTracks[index]" data-toggle="tooltip"><img src="./../assets/ActivityIcon.svg" :alt="pencilIcon" width="48" height="48"></button>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        
        <!-- Used for troublehooting video set debugging to true in data-->
        <div v-if="debugging">
            <span>currentFrame :{{ currentFrame }}</span><br><span>startTime : {{ startTime }}</span><br>
            <span>endTime : {{ endTime }}</span><br>
            <span>isPlayingNow : {{ isPlayingNow }}</span> FPS: <span>{{ byFrame }}</span><br>
            <span v-for="segments in hasPlayed">HP {{ hasPlayed }}P: {{ segments }}</span>
        </div>
        <!-- Used for troublehooting video -->
    </div>
</template>

<style scoped lang="scss">
.video-player {
    video {
        /*box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);*/
        background: transparent;
        cursor: pointer;
        margin-bottom: 0px;
    }

    .mediaTime {
        color: #fff;
        background-color: #000;
        position: relative;
        display: inline-block;
        padding: .5em;
        margin: 0px;
        flex: 0 0 auto;
        font-size: 0.8rem;
        width: auto;

        @media(max-width: 576px) {
            font-size: 0.8em;
        }
    }

    .bar {
        counter-reset: WPepisode;
        display: flex;
        flex-wrap: wrap;
        margin: auto;
        position: relative;
        color: #CCC;
        justify-content: flex-start;
        padding: 0;
        margin-left: -0.5%;
        margin-right: -0.5%;

        & > li {
            list-style-type: none;
            flex: 0 0 32.3333333333%;

            @media (max-width: 649.9px) {
                flex: 0 0 49%;
            }

            @media (max-width: 399.9px) {
                flex: 0 0 99%;
            }

            & > span > p {
                display: inline-block;
                height: 2.6em;
                font-size: 0.8rem;
                line-height: normal;

                @media (max-width: 767.9px) {
                    font-size: 0.7rem;
                }
            }

            &:before {
                display: none;
            }
        }
    }

    .chaptersLink {
        position: relative;
        align-content: flex-start;
        text-align: center;
        /*width: 200px;*/
        height: 171px;
        overflow: hidden;
        padding: 1.2em 0.7em;
        line-height: 17px;
        color: #333;
        background-color: #cfdbe6;
        //background-image: url('../../assets/Film_strip.svg');
        background-size: cover;
        //border-radius: 2px;
        //border: 1px solid #c3bfb6;
        margin: 0 0.5% 10px 0.5%;
        font-weight: bolder;

        @media (max-width: 649.9px) {
            padding: 1.2em 1em;
        }

        @media (max-width: 399.9px) {
            padding: 1.5em 1em;
        }

        &.isPlaying:after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background-color: #4e5b73;
        }

        button {
            padding: 0;
        }
    }

    .playButton,
    .activityButton {
        display: inline-block;
        width: 58px;
        height: min-content;
        background-color: transparent;
        float: none;

        &:hover, &:focus {
            /*Insert hover animation here, placeholder for now*/
            opacity: 0.8;
            background-color: transparent;
        }
    }

    .playButton {
        left: 20px;
    }

    .activityButton {
        right: 20px;
    }

    button.accessibilityButton {
        margin: 5px;
        border-radius: 5px;
    }

    .CC {
        height: 4em;
        padding: .5em;
        padding-top: 1.5em;
        background-color: #000;
        color: #FFF;
        font-family: sans-serif;
        text-align: center;
        width: 100%;
        margin-bottom: 0;

        p {
            font-size: 1rem;
            font-style: normal;
        }
    }

    .expand-enter-active,
    .expand-leave-active {
        transition: all 1s ease;
        //padding: 0 10px;
        overflow: hidden;
        max-height: 15em;
    }

    /* .expand-enter defines the starting state for entering */
    /* .expand-leave defines the ending state for leaving */
    .expand-enter-from,
    .expand-leave-to {
        height: 0px;
        padding: 0 10px;
        opacity: 0;
    }

    label {
        margin: 0;
    }

    input[type=range] {
        appearance: none;
        -webkit-appearance: none;
        background: 0 0;
        display: inline-block;
        height: 2.5em;
        padding: 0;
        width: 7em;
        margin: 0;
        margin-left: 5px;
        flex: 0 0 auto;

        &:focus {
            outline-offset: 0
        }

        &::-webkit-slider-runnable-track {
            background: #aaa;
            height: 4px
        }

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            background: #fff;
            border: 1px solid #707070;
            -webkit-box-sizing: content-box;
            box-sizing: content-box;
            height: 0.7em;
            margin-top: -5px;
            width: 10px
        }

        &::-moz-range-track {
            background: #aaa;
            border: 0
        }

        &::-moz-range-thumb {
            background: #fff;
            border: 1px solid #707070;
            border-radius: 0;
            height: 1.3em;
            width: 10px
        }

        &::-ms-track {
            border: 0;
            color: transparent;
            height: 4px
        }

        &::-ms-fill-upper {
            background: #aaa
        }

        &::-ms-fill-lower {
            background: #aaa
        }

        &::-ms-thumb {
            background: #fff;
            border: 1px solid #707070;
            height: 1.3em;
            width: 10px
        }
    }

    .showVolume {
        position: relative;
        display: flex;
        transition: all 1s;
        align-items: center;
        width: 180px;

        input[type=range] {
            height: 1em;
            width: min-content;
        }

        &:hover, input[type="range"]:focus {
            position: relative;
            height: 1em;
            width: min-content;
            overflow: inherit;
            opacity: 1;
        }
    }

    .setVolume:focus {
        outline: 1px dashed white;
        outline-offset: 5px;
    }

    .fd-slider {
        display: inline-block;
        height: 100%;
        margin-top: 10px;
        width: 7em
    }

    .fd-slider-handle {
        background: #fff;
        border: 1px solid #707070;
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
        width: 10px;
    }

    progress {
        appearance: none;
        -webkit-appearance: none;
        background: #000;
        background-clip: padding-box;
        border: 2px solid #4d4d4d;
        color: #b54142;
        display: block;
        left: 0;
        padding: 2px;
        position: relative;
        clear: both;
        top: 0;
        width: 100%
    }

    .videoControls {
        margin: .6em 3px;
        background-color: #000;
        color: #fff;
        font-size: 0.8rem;
        padding: 0;

        @media(max-width: 576px) {
            font-size: 0.7em;
            width: auto;
        }

        &:hover,
        &:focus {
            color: #6d6d6d;
        }

        &:active {
            color: #b54142;
        }

        &:focus {
            outline: 1px dashed white;
        }
    }

    progress::-moz-progress-bar {
        background: -moz-linear-gradient(45deg, transparent, transparent 33%, rgba(0, 0, 0, 0.1) 33%, rgba(0, 0, 0, 0.1) 66%, transparent 66%);
        background: linear-gradient(45deg, transparent, transparent 33%, rgba(0, 0, 0, 0.1) 33%, rgba(0, 0, 0, 0.1) 66%, transparent 66%);
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0.2));
        border-radius: 50px;
        background-color: #b54142;
        background-image: (45deg, transparent, transparent 33%, rgba(0, 0, 0, 0.1) 33%, rgba(0, 0, 0, 0.1) 66%, transparent 66%), (to right, #bc1339, #4a0000);
        background-size: 25px 14px, 100% 100%, 100% 100%;
    }

    .progress {
        height: 14px
    }

    progress {
        flex: 0 0 100%;
        height: 14px;
        margin: 0 auto;
        display: block;
        /* Important Thing */
        appearance: none;
        -webkit-appearance: none;
        border: none;
        border-bottom: 1px solid #4d4d4d;

        &:focus {
            outline: 1px dashed white;
        }

        &::-webkit-progress-bar {
            background: #000;
            border-radius: 50px;
            padding: 2px;
        }

        &::-webkit-progress-value {
            border-radius: 50px;
            transition: width 1s;
            background:
                linear-gradient(45deg, transparent, transparent 33%, rgba(0, 0, 0, 0.1) 33%, rgba(0, 0, 0, 0.1) 66%, transparent 66%),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0.2)),
                linear-gradient(to right, #b54142, #b54142);
            background-size: 25px 14px, 100% 100%, 100% 100%;
        }
    }

    .player {
        width: 480px;
        margin: 10px auto;
        border: 1px solid #ccc;
    }

    video,
    audio,
    .controls {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: center;
        position: relative;
    }

    button {
        display: block;
        border: 0;
        //margin-right: 3px;
        width: 40px;
        cursor: pointer;
        flex: 0 0 auto;
    }

    .controls div {
        font-size: 12px;
        display: inline-block;
        line-height: 36px;
        width: 45px;
    }

    .tipRow {
        /*transition: height 0.3s; */
        overflow: hidden;
    }

    .overlay {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.4);
        pointer-events: none;

        transition: opacity 0.3s;

        &.done {
            background-color: rgba(0, 0, 0, 0.7);
            transition: opacity 1s;
        }

        & > .fa {
            position: absolute;
            top: calc(50% - 50px);
            left: calc(50% - 43.75px);
            color: white;
        }

        & > p {
            position: absolute;
            top: calc(50% + 60px);
            color: white;
            display: block;
            width: 100%;
        }
    }

    .overlay-fade-enter-from {
        opacity: 0;
    }

    .overlay-fade-enter-to {
        opacity: 1;
    }

    .overlay-fade-leave {
        opacity: 1;
    }

    .overlay-fade-leave-to {
        opacity: 0;
    }

    #timeline-tooltip {
        position: absolute;
        top: -43px;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        font-size: 12px;
        width: 60px !important;
        transition: left 0.2s, top 0.3s, opacity 0.3s;
        text-align: center;

        &:after {
            content: "";
            position: absolute;
            top: 100%;
            left: 25px;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-top: 7px solid rgba(0, 0, 0, 0.7);
            border-right: 5px solid transparent;
        }
    }

    .tooltip-fade-enter-from {
        opacity: 0;
        top: -33px !important;
    }

    .tooltip-fade-enter-to {
        opacity: 1;
        top: -43px !important;
    }

    .tooltip-fade-leave {
        opacity: 1;
        top: -43px !important;
    }

    .tooltip-fade-leave-to {
        opacity: 0;
        top: -33px !important;
    }
}
</style>

<script type="text/javascript">

export default {
    components: {

    },

    data() {
        return {
            accessiblePopup: false,
            byFrame: 0,
            canPlay: false,
            Captions: "",
            CCactive: false,
            currentFrame: 0,
            debugging: false,
            endTime: [],
            hasPlayed: {},
            isMuted: false,
            isPaused: true,
            isPlayingNow: 0,
            isPlayingSoon: 0,
            justSeeked: false,
            mousePosition: 0,
            navBarTracks: [],
            oldVolume: 100,
            PlayTime: 0,
            playToPercent: 0,
            ready: false,
            setVolume: 100,
            startTime: [],
            totalTime: 0,
            Captions: "",
            changeButton: false,
            videoDone: false,
            showPlayOverlay: false,
            showTooltip: false,
            MenuShowing: false,

            popups: {
                createbudget: {
                    references: [1],
                    infos: [0, 6],
                    quiz: [7]
                }
            },
            modalArrays: {
                createbudget: ["purpose", "financialCycle", "budgetKeyTerms", "budgetAnalyze", "forecastBudget", "submitBudget", "reallife", "quiz"]
            },


            play: $("html").attr("lang") == "fr" ? "Jouer" : "Play",
            pause: $("html").attr("lang") == "fr" ? "Pause" : "Pause",
            stop: $("html").attr("lang") == "fr" ? "Arrêter" : "Stop",
            forward: $("html").attr("lang") == "fr" ? "Avancer 10 secondes" : "Forward 10 seconds",
            backward: $("html").attr("lang") == "fr" ? "Reculer 10 secondes" : "Rewind 10 seconds",
            timeline: $("html").attr("lang") == "fr" ? "Barre de temps vidéo, utilisez les flèches gauche et droite pour reculer ou avancer de 10 secondes" : "Video timeline, use the left and right arrows to skip backwards or forwards 10 seconds",
            mute: $("html").attr("lang") == "fr" ? "Désactiver le son" : "Mute",
            unmute: $("html").attr("lang") == "fr" ? "Activer le son" : "Unmute",
            show: $("html").attr("lang") == "fr" ? "Afficher le " : "Show ",
            hide: $("html").attr("lang") == "fr" ? "Cacher le " : "Hide ",
            closedcaptionning: $("html").attr("lang") == "fr" ? "sous-titrage codé" : "Closed Captions",
            playSegment: $("html").attr("lang") == "fr" ? "Faire jouer le segment vidéo" : "Play video segment",
            continue: $("html").attr("lang") == "fr" ? "Continuer à la section suivante" : "Continue to next section",
            sr_transcriptlocation: $("html").attr("lang") == "fr" ? "Le transcript peut être trouvé après la liste des segments." : "The transcript can be found after the segments list.",
            segmentsTitle: $("html").attr("lang") == "fr" ? "Segments vidéo" : "Video Segments",
            videoDoneTxt: $("html").attr("lang") == "fr" ? "Vous avez complété cette section." : "You have completed this section.",

            jumpActivity: $("html").attr("lang") == "fr" ? "Sauter à l’activité" : "Jump to activity",
            jumpReference: $("html").attr("lang") == "fr" ? "Sauter à la référence" : "Jump to reference",
            jumpInfo: $("html").attr("lang") == "fr" ? "Sauter à la boîte d'information" : "Jump to information box",
            jumpQuiz: $("html").attr("lang") == "fr" ? "Sauter au quiz" : "Jump to quiz",
            playIcon: $("html").attr("lang") == "fr" ? "Jouer la vidéo" : "Play icon",
            pencilIcon: $("html").attr("lang") == "fr" ? "Icône « activité »" : "Pencil icon",
            quizIcon: $("html").attr("lang") == "fr" ? "Icône « quiz »" : "Quiz icon",
            infoIcon: $("html").attr("lang") == "fr" ? "Icône « information »" : "Info icon",
            referenceIcon: $("html").attr("lang") == "fr" ? "Icône « référence »" : "Reference icon",
            continueButton: $("html").attr("lang") == "fr" ? "Continuer" : "Continue"
        }
    },

    props: {
        vId: { type: String, default: 'mainPlayer' },
        restartAt: { type: Number, default: 0 },
        toResume: { type: String, default: 'setHomepage' },
        chapters: { type: Boolean, default: false },
        videourl: { type: String, required: true, default: 'IntroVideoPrototype.mp4' },
        posterurl: { type: String, default: 'video_poster.PNG' },
        chapterurl: { type: String, default: '' },
        ccurl: { type: String, default: '' },
        currentpage: { type: String, default: '' },
    },

    computed: {
        solidOrRegular() {
            return this.CCactive ? 'far' : 'fas'
        },

        trackNumber() {
            if (this.chapters) { return 1 } else { return 0 }
        },

        currentPageReferences() {
            switch (this.currentpage) {
                case "createbudget":
                    return this.popups.createbudget.references;
                    break;
            }
        },

        currentPageInfos() {
            switch (this.currentpage) {
                case "createbudget":
                    return this.popups.createbudget.infos;
                    break;
            }
        },

        currentPageQuiz() {
            switch (this.currentpage) {
                case "createbudget":
                    return this.popups.createbudget.quiz;
                    break;
            }
        },

        modalArray() {
            switch (this.currentpage) {
                case "createbudget":
                    return this.modalArrays.createbudget;
                    break;
                default:
                    return [];
                    break;
            }
        }
    },

    watch: {
        playToPercent(newValue) {
            this.$emit('timeupdate', newValue)
        },

        isMuted() {
            const video = this.$refs.videoplayer
            if (this.isMuted) {
                this.oldVolume = this.setVolume
                this.setVolume = 0
                video.muted = true
            } else {
                video.muted = false
                this.setVolume = this.oldVolume
                video.volume = this.setVolume / 100
            }
        },

        setVolume(volume) {
            const video = this.$refs.videoplayer
            if (volume == 0) {
                this.isMuted = true
            } else {
                this.isMuted = false
                video.volume = (volume / 100)
                this.oldVolume = this.setVolume
            }
        },

        PlayTime(time) {
            if (time >= 99.5 && this.chapters) {
                this.videoDone = true;
            }
            else {
                this.videoDone = false;
            }
        },

        MenuShowing(newVal) {
            var that = this;
            setTimeout(function () {
                that.setOverlayHeight();
            }, 500);
        }
    },

    methods: {
        formatTime(time) {
            let minutes = Math.floor(time / 60),
                seconds = Math.floor(time - minutes * 60),
                minuteValue, secondValue
            if (minutes < 10) {
                minuteValue = "0" + minutes;
            } else {
                minuteValue = minutes;
            }
            if (seconds < 10) {
                secondValue = "0" + seconds;
            } else {
                secondValue = seconds;
            }
            return minuteValue + ":" + secondValue
        },

        loading() {
            this.canPlay = false
        },

        readCaptions(e) {
            if (this.$refs.videoplayer) {
                const v = e.target.parentNode
                const tt = v.textTracks[this.trackNumber]
                const cuesThere = tt.activeCues
                if (cuesThere.length > 0) { this.Captions = tt.activeCues[0].text } else { this.Captions = "" }
            }
        },

        showCC() {
            this.CCactive = !this.CCactive
            if (this.CCactive) {
                this.$refs.videoplayer.textTracks[this.trackNumber].mode = "showing"
            } else {
                this.$refs.videoplayer.textTracks[this.trackNumber].mode = "hidden"
            }
        },

        generate() {
            this.$nextTick(() => {
                if (this.$refs.videoplayer) {
                    this.navBarTracks = []
                    const c = this.$refs.videoplayer.textTracks[0].cues
                    for (let i = 0; i < c.length - 1; i++) {
                        this.navBarTracks.push(c[i].text)
                        this.startTime[i] = c[i].startTime
                        this.endTime[i] = Math.floor(c[i].endTime)
                        this.startTime.push(this.startTime[this.startTime.length - 1])
                    }
                }
            })
            this.resumePosition()

            this.showPlayOverlay = true
            this.setOverlayHeight()
        },

        resumePlay() {
            if (!this.accessiblePopup) {
                const videoPlayer = this.$refs.videoplayer
                setTimeout(function () { videoPlayer.play(); }, 250)
            }
        },

        accessibleModal(i) {
            const videoPlayer = this.$refs.videoplayer
            this.accessiblePopup = true
            videoPlayer.pause()
            this.isPaused = true
            $("#" + this.modalArray[i]).modal('show')
        },

        showModal(i) {
            this.accessiblePopup = false;
            if (!this.$refs.videoplayer.paused) {
                this.$refs.videoplayer.pause()
                if (this.startTime[i + 1]) {
                    this.$refs.videoplayer.currentTime = this.startTime[i + 1]
                }

                var that = this;
                $(".video-modal").on('shown.bs.modal', function (e) {
                    if ($(this).attr("id") == that.modalArray[i] && that.changeButton) {
                        $("#" + that.modalArray[i]).find(".modal-footer .btn").html(that.continueButton);
                        that.changeButton = false;
                    }
                });

                this.changeButton = true;
                $("#" + this.modalArray[i]).modal('show')
            }
        },

        seek(e) {
            const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            this.accessiblePopup = false
            this.justSeeked = true
            this.ready = false
            const videoPlayer = this.$refs.videoplayer
            const timeData = e.target.getAttribute('data-start')
            videoPlayer.pause()
            this.isPlayingSoon = timeData
            if (!iOS) { videoPlayer.currentTime = timeData } else { videoPlayer.currentTime = timeData + 2 }
            this.isPlayingNow = videoPlayer.currentTime
            const isNow = this.isPlayingNow
            this.currentFrame = this.startTime.findIndex(element => element === isNow)
            this.$nextTick(function () {
                this.isPaused = false
                var that = this;
                setTimeout(function () {
                    videoPlayer.play()
                    that.showPlayOverlay = false;
                    //that.$refs.vId.focus({preventScroll: true})
                }, 250)
                this.justSeeked = false
            })
        },

        resumePosition() {
            if (this.$refs.videoplayer) {
                this.canPlay = true
                this.totalTime = this.$refs.videoplayer.duration
                this.$refs.videoplayer.volume = this.setVolume / 100
                const savedPosition = this.startTime[this.restartAt]
                if (savedPosition) {
                    this.$refs.videoplayer.currentTime = savedPosition
                }
                if (!this.chapters) {
                    this.showPlayOverlay = false;
                    this.setOverlayHeight()
                }
            }
        },

        update(e) {
            let currentTime = e.target.currentTime
            let duration = e.target.duration
            this.canPlay = true
            this.PlayTime = (currentTime / duration) * 100
            this.playToPercent = 10 * (parseInt(Math.ceil(this.PlayTime / 10)))
            if (!this.justSeeked) {
                const v = e.target
                v.volume = this.setVolume / 100
                this.isPlayingNow = v.currentTime
                const isNow = this.isPlayingNow
                this.hasPlayed = v.played.length
                this.currentFrame = this.endTime.findIndex(element => element > isNow)
                this.byFrame = (this.isPlayingNow - this.isPlayingSoon)
                if ((this.isPlayingNow + this.byFrame) > this.endTime[this.currentFrame]) this.showModal(this.currentFrame)
                this.isPlayingSoon = v.currentTime
            }
        },

        isItPlaying(i) {
            const isNow = this.isPlayingNow
            if (i === this.endTime.findIndex(element => element > isNow)) {
                return 'isPlaying'
            } else { return '' }
        },

        stopVideo() {
            const video = this.$refs.videoplayer
            video.currentTime = 0
            this.$refs.videoplayer.pause()
            this.isPaused = true
        },

        setTime(e) {
            const video = this.$refs.videoplayer
            var pos = (e.pageX - (this.$refs.progress.getBoundingClientRect().left)) / this.$refs.progress.offsetWidth;
            video.currentTime = pos * video.duration;
        },

        isReady() {
            this.ready = true
        },

        goBackwards() {
            const video = this.$refs.videoplayer
            if (this.isPlayingNow) {
                if (this.isPlayingNow - 10 >= 0) { video.currentTime -= 10 } else { video.currentTime = 0 }
            }
        },

        goForward() {
            const video = this.$refs.videoplayer
            if (this.isPlayingNow || (video.currentTime == 0 && this.totalTime >= 10)) {
                if (this.isPlayingNow + 10 < this.totalTime) { video.currentTime += 10 } else {
                    video.pause()
                    video.currentTime = this.totalTime
                }
            }
        },

        setPlaying() {
            this.isPaused = !this.isPaused;
            this.showPlayOverlay = false;
            if (!this.isPaused) {
                this.$refs.videoplayer.play()
            } else {
                this.$refs.videoplayer.pause()
            }
        },

        isInArray(val, arr) {
            if (arr) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == val) {
                        return true;
                    }
                }
            }
            return false;
        },

        changeTime(e) {
            let rect = e.target.getBoundingClientRect()
            let rectSize = rect.right - rect.left
            let mousePos = e.clientX - rect.left
            let toPercent = mousePos / rectSize * this.totalTime
            this.mousePosition = toPercent;

            this.showTooltip = true;
            this.$el.querySelector("#timeline-tooltip").style.left = (mousePos - 30) + "px";
        },

        setOverlayHeight() {
            if (this.$refs.videoplayer) {
                var videoHeight = this.$refs.videoplayer.offsetHeight;
                var overlays = document.querySelectorAll(".overlay");
                for (var l = 0; l < overlays.length; l++) {
                    overlays[l].style.height = videoHeight + "px";
                }
            }
        }
    },

    mounted() {
        window.onresize = this.setOverlayHeight;

        var that = this;
        $(".video-modal").on('hidden.bs.modal', function (e) {
            that.resumePlay();
        })

        this.$nextTick(function () {
            setTimeout(function () {
                $('[data-toggle="tooltip"]').tooltip();
            }, 500);
        })
    },

}

</script>