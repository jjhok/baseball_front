<template>
    <div>
        <div class="display-3 " text-xs-center>SEARCH TEAM</div>
        <v-layout row wrap justify-space-around>
            <v-flex xs8>
            <v-text-field
                name="searchField"
                label="팀을 검색하세요."
                id="id"
                append-icon="search"
                v-model="searchKey"
            ></v-text-field>
                
            </v-flex>
            <v-btn color="success" @click="search()" :loading="isLoading">GO!</v-btn>
        </v-layout>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        data() {
            return {
                isLoading: false,
                searchKey: "",
            }
        },
        methods: {
            search() {
                this.isLoading = true;

                var params = {
                    method: 'bs4',
                    pageUrls : ['http://www.gameone.kr/search/team?club_name=' + this.searchKey],
                    selectorDict : [
                        
                        {
                        index: "avatar",
                        selector : "#con_tabs01 > div > a > div.search_photo_img > img",
                        startAt: 0,
                        attr : "src",
                        limit : -1,
                        },
                        {
                        index: "name",
                        selector : "#con_tabs01 > div > a > div.search_contents > div",
                        startAt: 0,
                        attr : "text",
                        limit : -1,
                        },
                        {
                        index: "master",
                        selector : "#con_tabs01 > div > a > div.search_contents > ul > li:nth-child(1)",
                        startAt: 0,
                        attr : "text",
                        limit : -1,
                        },
                    ]
                }
                axios.post('/api/crawler', params)
                .then(response => {
                    this.$emit('update', response.data);
                })
                .catch(response => {
                    console.log(response.data);
                })
                .then(() => {
                    this.isLoading = false;
                })
            }
        },
    }
</script>

<style scoped>

</style>