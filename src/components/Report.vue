<template>
    <div>
        HELLO REPORT
        {{ this.$route.params.teamKey }}
    </div>
</template>

<script>
import axios from "axios";
    export default {
        created() {
        
            const teamUrl = this.$teamLink + this.$route.params.teamKey
            console.log(teamUrl);
            var params = {
                method: 'bs4',
                pageUrls : [teamUrl],
                selectorDict: this.$memberSelectorDict
            }
            axios.post('/api/crawler', params)
            .then(response => {
                console.log(response.data); <-- 여기까지 완료. -->
                // this.$emit('update', response.data);
            })
            .catch(response => {
                alert("문제가 발생했습니다.");
                console.log(response.data);
            })

        },
    }
</script>

<style scoped>

</style>