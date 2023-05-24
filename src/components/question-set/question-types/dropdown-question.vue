<template>
    <div :class="{ 'carousel-item': $parent.carousel, 'active': ($parent.carousel && questionNum == 1) }" :id="$parent.carousel ? 'carousel-1-' + questionNum : ''" :role="$parent.carousel ? 'tabpanel' : ''">
        <div class="row">
            <div class="col-12">
                <div class="question dropdown">
                    <fieldset>
                        <legend :id="'carousel-1-' + questionNum + '-title'"><strong>Question {{ questionNum  }}&ThinSpace;&ndash;&ThinSpace;</strong><slot name="question" /></legend>
                        <slot name="contentBefore" />
                        <div class="answers" :data-correct-answer-value="parsedRightAnswers">
                            <p v-for="par, parIndex in content">
                                <label v-for="drop, dropIndex in par" :for="'q' + questionNum + '-' + toLetter(dropNum(parIndex, dropIndex))">
                                    <span v-html="drop.textBefore"></span>
                                    <select :id="'q' + questionNum + '-' + toLetter(dropNum(parIndex, dropIndex))" :style="drop.questionStyle ? 'margin-left: 0; margin-top: 10px;': ''">
                                        <option value="0" disabled selected>{{ (lang == "fr") ? "Veuillez choisir" : "Please choose" }}</option>
                                        <option v-for="option, optIndex in drop.options" :value="optIndex + 1">{{ option }}</option>
                                    </select>
                                    <span v-html="drop.textAfter"></span>
                                </label>
                            </p>
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
        content: { type: Array, required: true },
        rightAnswers: { type: Array, required: true }
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
            var $rightAnswerValues = String($answers.data("correct-answer-value")).split(" ");

            //find the selected answer inside the div containing the answers
            var $selectedAnswers = $answers.find("option:selected");

            //get the value of the selected answer
            var selectedAnswerValues = [];
            $selectedAnswers.each(function () {
                selectedAnswerValues.push($(this).val());
            });

            //find the element containing the feedback
            var $feedback = $question.find(".feedback");

            //we make sure to hide both the correct and incorrect feedback so that we can
            //  display the correct feedback later
            this.$parent.HideFeedback($feedback);

            //if there are no answers selected and they try to submit we show them an error message
            if (selectedAnswerValues.length < $rightAnswerValues.length || selectedAnswerValues.indexOf("0") >= 0) {
                this.$parent.AlertError();
            }
            //if they have selected an answer check if it is correct/incorrect and
            // show the correct feedback
            else {
                var isCorrect = this.$parent.arraysEqual(selectedAnswerValues, $rightAnswerValues);
                this.$parent.DisplayFeedback($feedback, isCorrect);
            }
        },
        toLetter(num){
            var letter = String.fromCharCode(num + 64);
            return letter.toLowerCase();
        },
        dropNum(parIndex, dropIndex){
            var num = 0;
            for(var i = 0; i < parIndex; i++){
                num += this.content[i].length;
            }

            return num + dropIndex + 1;
        }
    },
    mounted() {
        if($("html").attr("lang") == "fr"){
            this.lang = "fr";
        }
    },
    computed: {
        parsedRightAnswers(){
            var result = "";
            for(var i = 0; i < this.rightAnswers.length; i++){
                result += this.rightAnswers[i] + " ";
            }
            result = result.slice(0, -1);

            return result;
        }
    },
    watch: {

    }
}

</script>