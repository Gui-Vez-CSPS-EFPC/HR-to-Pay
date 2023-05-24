<template>
    <div :class="{ 'carousel-item': $parent.carousel, 'active': ($parent.carousel && questionNum == 1) }" :id="$parent.carousel ? 'carousel-1-' + questionNum : ''" :role="$parent.carousel ? 'tabpanel' : ''">
        <div class="row">
            <div class="col-12">
                <div class="question multiple-choice">
                    <fieldset>
                        <legend :id="'carousel-1-' + questionNum + '-title'"><strong>Question {{ questionNum  }}&ThinSpace;&ndash;&ThinSpace;</strong><slot name="question" /></legend>
                        <div class="answers" :data-correct-answer-id="'q' + questionNum + '-' + rightAnswer">
                            <p v-for="option, index in options">
                                <input type="radio" :name="'q' + questionNum" :id="'q' + questionNum + '-' + toLetter(index + 1)" :aria-posinset="index + 1" :aria-setsize="options.length">
                                <label :for="'q' + questionNum + '-' + toLetter(index + 1)">{{ option }}</label>
                            </p>
                        </div>
                        <button class="btn btn-primary submit-btn" @click="submitClicked($event)">{{ (lang == "fr") ? "Vérifier la réponse" : "Check Answer" }}</button>
                        <div class="feedback" role="alert" style="display: none;">
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
                    </fieldset>
                </div>
            </div>
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
        questionNum: { type: Number, required: true },
        options: { type: Array, required: true },
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
            var $question = $(event.target).closest(".question");

            //find the div that contains the answers
            var $answers = $question.find(".answers");

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
    },
    computed: {
        
    },
    watch: {

    }
}

</script>