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
                for (let index = 0; index < response.data[0].name.length; index++) {
                    this.records.push({
                        name: response.data[0].name[index],
                        code: response.data[0].code[index].split("=")[1]
                    }) 
                }
            })
            .catch(response => {
                alert("문제가 발생했습니다.");
                console.log(response.data);
            })

        },
        data() {
            return {
                records: []
            }
        },
    }
</script>

<style scoped>

</style>