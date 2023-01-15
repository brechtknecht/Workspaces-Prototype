<template>
    <div v-html="html"></div>
</template>

<script>
    export default {
        data() {
            return {
                html: ''
            }
        },
        mounted() {
            axios.get(this.$route.params.url)
                .then(response => {
                    this.html = response.data;
                })
        }
    }
</script>

<style>

</style>