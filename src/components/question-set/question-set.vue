<template>
    <div :class="{ 'question-set': true, 'carousel-question-set': carousel }">
        <div v-if="carousel" id="carousel-1" class="carousel slide" data-ride="carousel" data-interval="false">
            <div class="carousel-control">
                <a class="carousel-control-prev" href="#carousel-1" role="button" data-slide="prev" :title="(lang == 'fr') ? 'Question précédente' : 'Previous Question'" data-toggle="tooltip" data-placement="bottom">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">{{ (lang == "fr") ? "Question précédente" : "Previous Question" }}</span>
                </a>
                <ol class="carousel-indicators" role="tablist">
                    <li v-for="index in questionNum" :class="{'active': index == 1}" role="tab" data-target="#carousel-1" :data-slide-to="index - 1" :aria-selected="index == 1" :aria-expanded="index == 1" :aria-controls="'carousel-1-' + index" :aria-labelledby="'carousel-1-' + index + '-title'" tabindex="0"></li>
                </ol>
                <a class="carousel-control-next" href="#carousel-1" role="button" data-slide="next" :title="(lang == 'fr') ? 'Question suivante' : 'Next Question'" data-toggle="tooltip" data-placement="bottom">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">{{ (lang == "fr") ? "Question suivante" : "Next Question" }}</span>
                </a>
            </div>
            <div class="carousel-inner">
                <slot />
            </div>
        </div>
        <div v-else>
            <slot />
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>

<script type="text/javascript">

export default {
    components: {

    },
    props: {
        carousel: { type: Boolean, default: true }
    },
    data() {
        return {
            lang: "en",
            questionNum: 0
        }
    },
    methods: {
        arraysEqual(a, b) {
            if (a === b) return true;
            if (a == null || b == null) return false;
            if (a.length !== b.length) return false;

            // If you don't care about the order of the elements inside
            // the array, you should sort both arrays here.
            // Please note that calling sort on an array will modify that array.
            // you might want to clone your array first.

            for (var i = 0; i < a.length; ++i) {
                if (a[i] !== b[i]) return false;
            }
            return true;
        },
        HideFeedback(feedback) {
            feedback.hide();
            feedback.find(".right").hide();
            feedback.find(".wrong").hide();

            //need to check if the element is not null in cases where the generic feedback element is not present
            var generic = feedback.find(".generic");

            //javascript statements are 'truthy' or 'falsy' so this counts as true / false
            if (generic) {
                generic.hide();
            }
        },
        DisplayFeedback(feedback, isCorrect) {
            feedback.show();

            if (isCorrect) {
                feedback.find(".right").show();
                feedback.addClass("correct");
                feedback.removeClass("incorrect");

                let funct_btn = feedback.find(".right").find("button[style='display: none;']");
                if (funct_btn) { funct_btn.click(); }
            }
            else {
                feedback.find(".wrong").show();
                feedback.addClass("incorrect");
                feedback.removeClass("correct");

                let funct_btn = feedback.find(".wrong").find("button[style='display: none;']");
                if (funct_btn) { funct_btn.click(); }
            }

            //need to check if the element is not null in cases where the generic feedback element is not present
            var generic = feedback.find(".generic");

            //javascript statements are 'truthy' or 'falsy' so this counts as true / false
            if (generic) {
                generic.show();
            }
        },
        AlertError() {
            //get the lang setting for the page
            var $lang = $("html").attr("lang");
            //check for lang settings
            if ($lang == "en") {
                alert("Please choose an answer.");
            }
            else if ($lang == "fr") {
                alert("Veuillez choisir une réponse.");
            }
        }
    },
    mounted() {
        $(".question-set").find(".feedback").hide();

        this.questionNum = $(this.$el).find(".question").length;

        if($("html").attr("lang") == "fr"){
            this.lang = "fr";
        }
    },
    computed: {

    },
    watch: {

    }
}

</script>