<template>
    <div id="report">
        {{ this.$route.params.teamKey }}<br>
        {{ memberCount }} 명중 {{ parseInt(loadedCount / this.$years.length) }} 불러옴.<br>
        <Chart1 :objects="records" />
        <span v-text="records"></span><br>
        <v-btn color="success" @click="test" :loading="!isLoaded">TEST</v-btn>
    </div>
</template>

<script>
import axios from "axios";
import { timeout } from 'q';
import Chart1 from './Chart1.vue';

    export default {
        components: {
            Chart1,
        },
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
                this.memberCount = response.data[0].name.length;
                for (let index = 0; index < this.memberCount; index++) {
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
                            this.loadedCount += 1;
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
                teamKey: this.$route.params.teamKey,
                memberCount: 0,
                loadedCount: 0,
                isLoaded: false,
                labels: this.$recordLabels,
                records: {},
            }
        },
        watch: {
            loadedCount(newValue, oldValue) {
                if (this.memberCount > 0 && (this.memberCount * this.$years.length) === this.loadedCount) {
                    this.isLoaded = true;
                }
            }
        },
        methods: {
            
            test() {
                // alert(JSON.stringify(this.records));
                alert(this.memberCount);
            }
        },
    }
</script>

<style scoped>

</style>