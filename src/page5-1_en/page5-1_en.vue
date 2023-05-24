<template>
    <div>
        <h1>Scenario 5: Nishiime’s Story</h1>


        <img src="../assets/images/Persona_Nishiime_Whiteduck.png" alt="Nishiime, with dark hair, dark skin, earrings and a necklace.">

        <p>Nishiime Whiteduck is an indeterminate employee at the IT-03 group and level. She loves her job in information technology (IT) but would like to take a leave of absence to pursue an opportunity to explore her love of cooking. She would like to take five weeks’ leave from work. She has already submitted her vacation leave for the year but is concerned about her finances, pension and benefits coverage.</p>


        <!-- [dyk] -->
        <h2>Did you know?</h2>
        <p>There are a number of collective agreements that apply to federal government employees. For indeterminate employees such as Nishiime who are classified in the information technology (IT) occupational group, the <a href="https://www.tbs-sct.canada.ca/agreements-conventions/view-visualiser-eng.aspx?id=1#toc27586227592" target="_blank">Computer Systems (CS)</a> collective agreement is a necessary resource. </p>

        <!-- [/jumbotron] -->


        <p>Can you help Nishiime figure out the appropriate type of leave?</p>
        <p>The video below shows a conversation between Nishiime and her supervisor.</p>

        <!-- [Draft video of the content below: https://gcxgce.sharepoint.com/:v:/r/teams/1000591/Shared%20Documents/2.%20FON308/Design/7.%20Scenario%205%20Nishiime/Video/Draft-Nishiime%20chat.avi?csf=1&web=1&e=0Kco19] -->

        <p>[Nishiime:]I just got accepted for a 5-week culinary adventure program in France. Is this something I’d be able to take time off work for? It starts in 13 weeks.</p>
        <p>[Supervisor] What an amazing opportunity! I will need to look into our operational requirements for that time. I will get back to you shortly.</p>
        <p>[Nishiime] Thanks! I’m excited about it, but I’m concerned about my finances, pension, and vacation balances. I wanted to save my vacation leave for a trip planned in the summer with my family.</p>
        <p>[Supervisor] I looked into it, and we should be fine to let you go for 5 weeks.</p>
        <p>[Supervisor] If you’re worried about finances, take a look at the Directive on Leave and Special Working Arrangements as well as your collective agreement. They should give you information about the types of leave available to you. Let me know if you have any questions!</p>
        <p>[end chat]</p>

        <p>Since she’s saving her vacation leave for the summer, upon reviewing the Directive on Leave and Special Working Arrangements and her collective agreement, Nishiime determined that there are two options available to her. Lets take a closer look at these options.</p>


        <!-- [Side by side panels or flipcards] -->

        <!-- [panel 1] -->
        <h2>Leave with income averaging (LIA)</h2>
        <p>A type of leave without pay where the employee will continue to get paid regularly, but their total salary is reduced to reflect a period of leave without pay. This reduced salary is averaged over a 12-month period. Pension and benefits contributions continue at the regular rate. LIA requires a minimum leave period of 5 weeks, up to a maximum of 3 months.</p>
        <p>Check out the <a href="https://www.tpsgc-pwgsc.gc.ca/remuneration-compensation/services-paye-pay-services/paye-information-pay/vie-life/vie-conge-life-leave/cer-lia-eng.html" target="_blank">Leave with income averaging</a> webpage for more details.</p>

        <!-- [panel 2] -->
        <h2>Leave without pay (LWOP) for personal needs</h2>
        <p>A type of LWOP, subject to entitlements in the employee’s collective agreement and Terms and Conditions of employment. During this type of leave, the employee does not receive any salary, nor do they pay into their pension and benefits.</p>

        <p>Check out the <a href="https://www.tpsgc-pwgsc.gc.ca/remuneration-compensation/services-paye-pay-services/paye-information-pay/vie-life/vie-conge-life-leave/pers-eng.html" target="_blank">Leave without pay for personal needs</a> webpage for more details.</p>

        <!-- [/panels] -->


        <!-- [this or that] -->

        <p>Which of these options is most appropriate for Nishiime’s needs? Remember that she is concerned about her finances, pension and benefits.</p>

        <!-- [option 1] -->
        <p><strong>Leave with income averaging (LIA)</strong></p>
        <!-- [feedback 1] -->
        <p>That’s right! Since Nishiime is looking for five weeks of leave and wants to continue her pension and benefits coverage, this is her best option. While her pay will be reduced over a period of 12 months, it will not be stopped entirely.</p>

        <!-- [option 2] -->
        <p><strong>LWOP for personal needs </strong></p>
        <!-- [feedback 2] -->
        <p>That’s not it. LWOP for personal needs is a type of leave without pay (LWOP) up to 3 months that can be used once in your career as a federal public servant. This wouldn’t meet Nishiime’s needs as it would stop her pension and benefits coverage as well as her pay for the period of her leave.</p>

        <p>Instead, she should consider leave with income averaging (LIA).</p>
        <p>The <a href="https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=15774" target="_blank">Directive on Leave and Special Working Arrangements</a> gives the following information:</p>
            <!-- [indent] -->
            <p>Leave with income averaging is an arrangement whereby eligible persons reduce the number of weeks worked in a specific 12-month period by taking leave without pay for a period of between a minimum of 5 weeks and a maximum of 3 months.</p>
            <p>Pay for the participating person would be reduced and averaged out over the 12-month period to reflect the reduced time at work; however, his or her pension and benefits coverage, as well as premiums and contributions, would continue at the pre-arrangement levels. </p>
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