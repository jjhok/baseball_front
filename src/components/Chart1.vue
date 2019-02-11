<template>
    <div>
        <v-layout row wrap>
            <div v-for="member in members" :key="member">
                <v-checkbox :label="member" v-model="selectedMembers" :value="member"></v-checkbox>
            </div>
        </v-layout>
        <apexchart  type="line" :options="options" :series="series"></apexchart>
        <v-btn color="error" @click="parseData">updateData</v-btn>
    </div>
</template>

<script>

    export default {
        mounted() {
            var years = [];
            this.$years.forEach(element => {
                years.push(element);
            });
            this.options.xaxis.categories = years;
            this.parseData();
        },
        props: {
            objects: {
                type: Object | String,
                default: {}
            },
        },
        data() {
            return {
                options: {
                    chart: {
                        id: 'vchart1',
                    },
                    xaxis: {
                        categories: this.$years,
                    },
                    yaxis: {
                        shows: true,
                        min: 0,
                        max: 1,
                        tickAmount: 5
                    },
                    
                },
                series: [],
                members: [],
                parsedData: {},
                selectedMembers: [],
            }
        },
        methods: {
            parseData() {
                this.parsedData = {};

                for(var key in this.objects) {
                    var parsedEachData = [];
                    this.$years.forEach(year => {
                        parsedEachData.push(parseFloat(parseFloat(this.objects[key][year]['record']['타율']).toFixed(3)));
                    });
                    this.parsedData[key] = parsedEachData;
                    // this.parsedData.push({
                    //     name: key,
                    //     data: parsedEachData
                    // });
                    this.members.push(key);
                }

            },
        },
        watch: {
            selectedMembers(newValue, oldValue) {
                if (newValue.length > oldValue.length) {
                    var member = newValue.filter((item) => {
                        return oldValue.indexOf(item) < 0
                    });
                    this.series.push( {
                        name: member,
                        data: this.parsedData[member]
                    });
                } else {
                    var member = oldValue.filter((item) => {
                        return newValue.indexOf(item) < 0
                    });
                    this.series.pop(member);

                }
            }
        },
    }
</script>

<style scoped>

</style>