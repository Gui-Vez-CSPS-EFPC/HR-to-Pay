<template>
    <div class="card">
        <div class="card-header">
            <component :is="headingLvl" class="card-title"><slot name="title" /></component>
        </div>
        <div class="collapse">
            <div class="card-body">
                <slot name="content" />
            </div>
        </div>
    </div>
</template>
  
<script type="text/javascript">



export default {
    components: {
        
    },
    props: {
        headingLvl: { type: String, required: true }
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    mounted() {
        if($(".templates-script").length == 0){
            $("body").append('<script class="templates-script" src="https://app.csps-efpc.gc.ca/shared/LCS_HTML_Templates/CSPS_Template_2021/_assets/js/scripts.min.js">');
        }
    },
    computed: {
        
    },
    watch: {
        
    },
}

</script>
  
<style lang="scss" scoped>

    

</style>