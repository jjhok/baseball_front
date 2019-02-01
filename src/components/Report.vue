<template>
    <div>
        HELLO REPORT<br>
        {{ this.$route.params.teamKey }}<br>
        {{ records }}
        <v-btn color="success" @click="test">text</v-btn>
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
                    var code = response.data[0].code[index].split("=")[1];
                    var name = response.data[0].name[index];

                    this.$years.forEach(year => {
                        var personalUrl = 'http://www.gameone.kr/locker/record/sum?group_code=' + code + '&season=' + year;

                        // 초기화
                        this.records[name] = {};
                        this.records[name][year] = {};

                        var params2 = {
                            method: 'bs4',
                            pageUrls: [personalUrl],
                            selectorDict: this.$recordDict
                        };

                        axios.post('/api/crawler', params2)
                        .then(response2 => {
                            let responseRecord = response2.data[0];
                            var record = {};

                            this.$labels.forEach(label => {
                                record[label] = responseRecord[label][0];
                            });
                            var name = response.data[0].name[index]
                            
                            this.records[name][year] = {record};
                        }) 
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
                labels: this.$recordLabels,
                records: {}
            }
        },
        methods: {
            test() {
                alert(Object.keys(this.records).length);
            }
        },
    }
</script>

<style scoped>

</style>