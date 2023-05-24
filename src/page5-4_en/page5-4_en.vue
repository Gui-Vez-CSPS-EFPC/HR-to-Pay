<template>
    <div>
        <h1>In practice: Nishiime's transfer-out</h1>


        <p>Nishiime has been offered a promotion at another organization within the core federal public service.</p>

        <p>When an employee leaves an organization for another within the core federal public service, it is called a “<strong>transfer-out</strong>.”</p>

        <p>If you transfer-out to a different organization within the core federal public service, there are several tasks that will need to be completed to have your file transferred in a timely manner.</p>


        <!-- [callout box] -->
        <h2>To transfer-out</h2>
        <ul>
            <li>Your supervisor or section 34 manager is responsible for informing you of any organization-specific processes and procedures that will need to be followed.</li>
            <li>You will need to complete all hiring paperwork for your new organization and provide a copy to your current supervisor for processing your departure.</li>
            <li>You will be provided with an organizational departure form or checklist that you’ll need to fill out. Your section 34 manager is responsible for sending this to your compensation and HR teams.</li>
            <li>Ensure that all of your leave and overtime is entered and that your section 34 manager has approved them in the HR and/or pay systems. When your section 34 manager performs their duties in a timely manner, it will help prevent delays in the transfer process.</li>
        </ul>
        <!-- [/callout box] -->

        <p>If the departure actions are not completed, the transfer-out will be delayed, and the transfer-in will not be able to be processed.</p>
        <p>This could result in an overpayment (for example, if leave without pay wasn’t yet approved and Nishiime receives payment for hours not worked) or under-payment (for example, a promotion or acting assignment cannot be fully processed during the pending transfer period).</p>


        <!-- [hot tip card] -->
        <h2>Hot tip!</h2>

        <p>When transferring out, it’s a good idea to take a screen shot of your leave balances and history in the appropriate system before you leave your organization. Save a copy for yourself and provide a copy to your supervisor at your new organization.</p>
        <p>This is done to ensure that leave balances are appropriately tracked during the pending transfer period, and to determine eligibility for certain leave requests.</p>
        <!-- [/hot tip] -->
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