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
                    selectorDict : this.$teamSelectorDict
                }
                console.log(params);
                axios.post('/api/crawler', params, {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                })
                .then(response => {
                    this.$emit('update', response.data);
                })
                .catch(response => {
                    alert("문제가 발생했습니다.");
                    console.log(response);
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