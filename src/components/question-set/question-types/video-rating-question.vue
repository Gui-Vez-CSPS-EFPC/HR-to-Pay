<template>
    <div :class="{ 'carousel-item': $parent.carousel, 'active': ($parent.carousel && questionNum == 1) }" :id="$parent.carousel ? 'carousel-1-' + questionNum : ''" :role="$parent.carousel ? 'tabpanel' : ''">
        <div class="row">
            <div class="col-12">
                <div class="question video-rating">
                    <fieldset> 
                        <legend :id="'carousel-1-' + questionNum + '-title'"><strong>Question {{ questionNum  }}&ThinSpace;&ndash;&ThinSpace;</strong><slot name="question" /></legend>

                        <div class="video">
                            <div id="kaltura_player_vy9D9suATP3j4fjtkISI"></div>
                        </div>    
                    
                        <div class="rating">
                            <div class="star-rating">
                                <div class="stars" :data-correct-answer-id="'rating' + rightAnswer">
                                    <input type="radio" name="rating" value="1" id="rating1"  aria-posinset="1" aria-setsize="5" />
                                    <label for="rating1" :aria-label="(lang == 'fr') ? 'Une étoile' : 'One star'"><span>1</span></label>
                                    
                                    <input type="radio" name="rating" value="2" id="rating2" aria-posinset="2" aria-setsize="5" />
                                    <label for="rating2" :aria-label="(lang == 'fr') ? 'Deux étoiles' : 'Two stars'"><span>2</span></label>
                                    
                                    <input type="radio" name="rating" value="3" id="rating3" aria-posinset="3" aria-setsize="5" />
                                    <label for="rating3" :aria-label="(lang == 'fr') ? 'Trois étoiles' : 'Three stars'"><span>3</span></label>
                                    
                                    <input type="radio" name="rating" value="4" id="rating4" aria-posinset="4" aria-setsize="5" />
                                    <label for="rating4" :aria-label="(lang == 'fr') ? 'Quatre étoiles' : 'Four star'"><span>4</span></label>
                                    
                                    <input type="radio" name="rating" value="5" id="rating5" aria-posinset="5" aria-setsize="5" />
                                    <label for="rating5" :aria-label="(lang == 'fr') ? 'Cinq étoiles' : 'Five stars'"><span>5</span></label>
                                </div>
                            </div>
                            
                            <button class="btn btn-primary submit-btn" @click="submitClicked($event)">{{ (lang == "fr") ? "Vérifier la réponse" : "Check Answer" }}</button>
                            
                            <div class="feedback" role="alert">
                                <div class="right">
                                    <slot name="rightFeedback" />
                                </div>
                                <div class="wrong">
                                    <slot name="wrongFeedback" />
                                </div>
                                <div class="generic">
                                    <slot name="genericFeedback" />
                                </div>
                            </div>
                        </div>
                    </fieldset> 
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

    @import "../../../assets/question-set/_colors";

    .video-rating {
        border: 1px solid $quaternary;
        border-radius: 5px;
        padding: 30px;
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .star-rating {
        width: min-content;
        padding: 0.3rem;
        margin-top: 10px;

        legend {
            float: none;
            margin-bottom: 0.5rem;
            font-size: 1.2rem;
            line-height: 1.3;
        }

        & > div {
            position: relative;
            height: 3rem;
            width: 15rem;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3e%3c!--! Font Awesome Pro 6.3.0 by %40fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --%3e%3cpath fill='%23F39C12' d='M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z'/%3e%3c/svg%3e");
            fill: #346494;
            background-size: 3rem 3rem;
        }

        label {
            position: absolute;
            height: 100%;
            background-size: 3rem 3rem;
            cursor: pointer;

            &:nth-of-type(1) {
                z-index: 5;
                width: 3rem;
            }

            &:nth-of-type(2) {
                z-index: 4;
                width: 6rem;
            }

            &:nth-of-type(3) {
                z-index: 3;
                width: 9rem;
            }

            &:nth-of-type(4) {
                z-index: 2;
                width: 12rem;
            }

            &:nth-of-type(5) {
                z-index: 1;
                width: 15rem;
            }
        }

        input:checked + label, input:focus + label {
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3e%3c!--! Font Awesome Pro 6.3.0 by %40fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --%3e%3cpath fill='%23F39C12' d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'/%3e%3c/svg%3e");
        }

        input:checked + label:hover, label:hover {
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3e%3c!--! Font Awesome Pro 6.3.0 by %40fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --%3e%3cpath fill='%23F39C12' d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z'/%3e%3c/svg%3e");
        }

        input:focus + label {
            outline: 0.25rem solid $tertiary;
        }

        input, label > span {
            border: 0;
            padding: 0;
            margin: 0;
            position: absolute !important;
            height: 1px;
            width: 1px;
            overflow: hidden;
            clip: rect(1px, 1px, 1px, 1px);
            clip-path: inset(50%);
            white-space: nowrap;
        }
    }

</style>

<script type="text/javascript">

export default {
    components: {
        
    },
    props: {
        questionNum: { type: Number, required: true },
        entryId: { type: String, required: true },
        rightAnswer: { type: String, required: true },
    },
    data() {
        return {
            lang: "en"
        }
    },
    methods: {
        submitClicked(event){
            //find the div that contains all of the elements for this question
            var $question = $(event.target).closest(".rating");

            //find the div that contains the answers
            var $answers = $question.find(".stars");

            //get the value of the attribute that has the id of the correct answer
            var $rightAnswer = $answers.data("correct-answer-id");

            //find the selected answer inside the div containing the answers
            var $selectedAnswer = $answers.find("input:checked");

            //get the id of the selected answer
            var selectedAnswerID = $selectedAnswer.attr("id");

            //find the container for the feedback
            var $feedback = $question.find(".feedback");

            //we make sure to hide both the correct and incorrect feedback so that we can
            //  display the correct feedback later
            this.$parent.HideFeedback($feedback);

            //if there are no answers selected and they try to submit we show them an error message
            if (!$selectedAnswer.length) {
                this.$parent.AlertError();
            }
            //if they have selected an answer check if it is correct/incorrect and
            // show the correct feedback
            else {
                var isCorrect = false;

                if (selectedAnswerID == $rightAnswer) {
                    isCorrect = true;
                }

                this.$parent.DisplayFeedback($feedback, isCorrect);
            }
        },
        toLetter(num){
            var letter = String.fromCharCode(num + 64);
            return letter.toLowerCase();
        }
    },
    mounted() {
        if($("html").attr("lang") == "fr"){
            this.lang = "fr";
        }

        $(".video").prepend('<script src="https://video.csps-efpc.gc.ca/p/101/sp/10100/embedIframeJs/uiconf_id/' + ((this.lang == "fr") ? "23448245" : "23448244") + '/partner_id/101">');
        var that = this;
        var interval = setInterval(function(){
            if(kWidget){
                kWidget.embed({
                    "targetId": "kaltura_player_vy9D9suATP3j4fjtkISI",
                    "wid": "_101",
                    "uiconf_id": (that.lang == "fr") ? "23448245" : "23448244",
                    "flashvars": {},
                    "entry_id": that.entryId
                });
                clearInterval(interval);
            }
        }, 500)
        setInterval(function(){
            var width = $("#kaltura_player_vy9D9suATP3j4fjtkISI").width();
            $("#kaltura_player_vy9D9suATP3j4fjtkISI").height(width / 1.625);
        }, 300);
    },
    computed: {
        
    },
    watch: {

    }
}

</script>