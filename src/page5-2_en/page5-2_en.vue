<template>
    <div>
        <h1>In practice: Nishiime's LIA</h1>

        
        <p>Now that Nishiime has selected the right type of leave, it’s time to make sure the paperwork is correct!</p>

        <!-- [irl card] -->

        <h2>Hot tip</h2>
        <p>LIA documentation, such as a the <a href="https://intranet.canada.ca/wg-tg/tbsf-fsct/325-10-f-eng.pdf" target="_blank">Application for leave with income averaging form</a> and any other organization-specific forms should be submitted for processing at least 12 weeks in advance to ensure enough time for processing. A confirmation letter will be sent from compensation unit highlighting the LIA details.</p>

        <!-- [/hot tip card] -->


        <!-- [click and reveal] -->

        <h2>What do you think?</h2>

        <!-- [question 1] -->
        <p><strong>What do you think might happen if Nishiime’s LIA documentation is processed too late?</strong></p>
        <!-- [button] -->
        <p>Show me the answer</p>

        <!-- [reveal text] -->
        <!-- [Click and reveal answer] -->

        <p>Nishiime will see her pay deducted over a shorter period than the 12 months originally planned. Over this shorter period, there will be greater deductions on each pay. Avoiding delays will allow for your salary to be averaged more evenly, alleviating any possible concerns about finances, pension and benefits coverage.</p>

        <!-- [dyk] -->
        <p>On many government forms, there is a signature box is labeled “responsibility centre manager”. In most organizations, this is the same as the section 34 manager.</p>
        <!-- [/dyk] -->
    </div>
</template>

<style scoped lang="scss"></style>

<script type="text/javascript">

import interactiveVideo from "../components/interactive-video.vue";
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
        interactiveVideo,
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