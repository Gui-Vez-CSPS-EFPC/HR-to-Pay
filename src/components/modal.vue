<template>
    <div class="modal fade video-modal" :id="modalID" role="dialog" :aria-labelledby="modalID + 'ModalTitle'" aria-hidden="true" tabindex="-1">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title" :id="modalID + 'ModalTitle'"><slot name="heading" /></h2>
                    <button type="button" class="close" data-dismiss="modal" :aria-label="lang == 'fr' ? 'Fermer' : 'Close'"> <span aria-hidden="true">×</span> </button>
                </div>
                <div class="modal-body">
                    <slot name="content" />
                </div>
                <div class="modal-footer"><button type="button" class="btn btn-secondary exit-modal-btn" data-dismiss="modal">{{ lang == "fr" ? "Fermer" : "Close" }}</button></div>
            </div>
        </div>
    </div>
</template>
  
<script type="text/javascript">


export default {
    components: {
        
    },
    props: {
        modalID: { type: String, required: true }
    },
    data() {
        return {
            lang: "en"
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
        
    },
}

</script>
  
<style scoped lang="scss">



</style>