<template>
    <div>
        <h1>Page 5-5</h1>
    </div>
</template>

<style scoped lang="scss"></style>

<script type="text/javascript">

import modal from "../components/modal.vue";
import accordion from "../components/accordion.vue";
import accordionContainer from "../components/accordion-container.vue";

import questionSet from "../components/question-set/question-set.vue";
import radioQuestion from "../components/question-set/question-types/radio-question.vue";
import checkboxQuestion from "../components/question-set/question-types/checkbox-question.vue";
import dropdownQuestion from "../components/question-set/question-types/dropdown-question.vue";
import shortTextQuestion from "../components/question-set/question-types/short-text-question.vue";
import videoRatingQuestion from "../components/question-set/question-types/video-rating-question.vue";
import textSelectQuestion from "../components/question-set/question-types/text-select-question.vue";

export default {
    components: {
        modal,
        accordion,
        accordionContainer,

        questionSet,
        radioQuestion,
        checkboxQuestion,
        dropdownQuestion,
        shortTextQuestion,
        videoRatingQuestion,
        textSelectQuestion
    },
    props: {

    },
    data() {
        return {
            lang: "en",

            //Each array in the main array is a paragraph, each object in those arrays is a dropdown with the text before and after it.
            q3Content:[
                [{
                    textBefore: "This is a test sentence with a select tag: ",
                    options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
                    textAfter: " is an option. "
                },
                {
                    textBefore: "This is a test sentence with a select tag: ",
                    options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
                    textAfter: " is an option. "
                }],
                [{
                    textBefore: "This is a test sentence with a select tag:",
                    options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
                    textAfter: " is an option. "
                }]
            ],
            q4Content:[
                [{
                    textBefore: "<strong>This is a question?</strong><br>",
                    options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
                    textAfter: "",
                    questionStyle: true
                }],
                [{
                    textBefore: "<strong>This is a question?</strong><br>",
                    options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
                    textAfter: "",
                    questionStyle: true
                }]
            ],

            //Each array in the main array is a paragraph, each string in those arrays is a sentence that is selectable.
            q7Content: [
                [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
                    "Mauris massa tellus, condimentum et nisl ultrices, lobortis consequat nulla. ",
                    "Nullam aliquam malesuada ipsum, vel rutrum elit scelerisque id. ",
                    "Etiam rutrum, massa eget ornare sollicitudin, erat tortor sodales orci, a ultrices lectus risus eu ligula. ",
                    "Donec ultricies nisi dictum libero eleifend sollicitudin. Aliquam porta mi ut imperdiet cursus. "
                ],
                [
                    "In a condimentum libero. ",
                    "Etiam consectetur feugiat justo vitae dignissim. ",
                    "Donec pulvinar eleifend augue, in dapibus tellus ornare sed. ",
                    "Mauris maximus rhoncus erat ac fermentum. ",
                ]
            ]
        }
    },
    methods: {

    },
    mounted() {
        if ($("html").attr("lang") == "fr") {
            this.lang = "fr";
        }
    },
    computed: {

    },
    watch: {

    }
}

</script>