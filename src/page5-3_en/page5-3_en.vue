<template>
    <div>
        <h1>Nishiime’s Thanksgiving</h1>


        <p>Nishiime has so much to be thankful for this year! She enjoyed her leave and is excited to return to work on Tuesday. There’s one more thing she hopes to be thankful for: getting paid for the Thanksgiving holiday. There are certain HR-to-pay considerations that need to be kept in mind when an employee is on leave without pay before and after a federal statutory holiday.</p>

        <p>Let’s see if Nishiime is entitled to pay for that holiday Monday.</p>
        <p>The following is a table clarifying her schedule.</p>

        <table>
            <tr>
                <td>Friday</td>
                <td>Saturday</td>
                <td>Sunday</td>
                <td>Monday</td>
                <td>Tuesday</td>
            </tr>
            <tr>
                <td>Leave without pay</td>
                <td>Not working</td>
                <td>Not working</td>
                <td>Statutory holiday</td>
                <td>Working</td>
            </tr>
        </table>


        <h2>What do you think?</h2>

        <p>Is Nishiime entitled to pay for that Monday, which is a designated paid holiday?</p>
        <p>Select an answer to see the feedback.</p>

        <!-- [option 1] -->
        <p>Yes</p>
        <!-- [feedback 1] -->
        <p>You've got it!</p>

        <!-- [option 2] -->
        <p>No</p>
        <!-- [feedback 2] -->
        <p>Sorry, that's not it.</p>

        <!-- [feedback for both correct and incorrect] -->
        <p>Because she is working on Tuesday, the day after the designated paid holiday, Nishiime is entitled to pay for Thanksgiving. From the <a href="https://www.tbs-sct.canada.ca/agreements-conventions/view-visualiser-eng.aspx?id=1#toc27586227592" target="_blank">Computer Systems (CS) collective agreement</a>:</p>

        <!-- [indent] -->
        <p>12.02 An employee absent without pay on both his full working day immediately preceding and his full working day immediately following a designated paid holiday is not entitled to pay for the holiday, except in the case of an employee who is granted leave without pay under the provisions of Article 29: leave for staff relations matters.</p>

        <p>In other words, if Nishiime is on LWOP <strong>before and after</strong> the designated holiday, she will not get paid for it. However, if she works one day next to the designated holiday (either before or after), she will be paid for it.</p>
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