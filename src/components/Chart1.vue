<template>
    <div>
        <apexchart  type="line" :options="options" :series="series"></apexchart>
        <v-btn color="error" @click="updateChart">updateData</v-btn>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

    export default {
        mounted() {
            var years = [];
                this.$years.forEach(element => {
                    years.push(element);
                });
                this.options.xaxis.categories = years;
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
                        id: 'vuechart-example',
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
                series: []
            }
        },
        methods: {
            updateChart() {
                var parsedData = [];
                
                for(var key in this.objects) {
                    var parsedEachData = [];
                    this.$years.forEach(year => {
                        parsedEachData.push(this.objects[key][year]['record']['타율']);
                    });
                    parsedData.push({
                        name: key,
                        data: parsedEachData
                    });
                }
                this.series = parsedData;
            }
        },
    }
</script>

<style scoped>

</style>