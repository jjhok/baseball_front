<template>
    <div>
        {{ results }}
        <v-list two-line>
            <template v-for="item in data">
                <v-list-tile
                    :key="item.name"
                    avatar
                    @click="goTo(item.key)"
                    >
                    <v-list-tile-avatar>
                        <img :src="item.avatar">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title v-html="item.name"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="item.master"></v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </div>
</template>

<script>
    export default {
        props: {
            results: {
                type: Array,
                default: []
            },
        },
        computed: {
            count() {
                return this.results[0].name.length; 
            },
            data() {
                var data = [];
                for (let index = 0; index < this.results[0].name.length; index++) {
                    const element = {
                        name: this.results[0].name[index].split("|")[0],
                        avatar: this.results[0].avatar[index],
                        master: this.results[0].master[index].split("|")[0],
                        key: this.results[0].link[index].split("=")[1]
                    };
                    data.push(element);
                    
                }
                return data;
            }
        },
        methods: {
            goTo(key) {
                console.log(key);
                // this.$router.push({path: "/report/" + key })
                this.$router.push({name: "report", params: { teamKey: key }})
            }
        },
    }
</script>

<style scoped>

</style>