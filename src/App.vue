<template>
  <v-app>
    <v-content>
      <Search @update="searchResultsUpdate" />
      <SearchResults v-if="searchResults.length > 0" :results="searchResults" length="5" />
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
import Search from './components/Search';
import SearchResults from './components/SearchResults.vue';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default {
  name: 'App',
  components: {
    Search, SearchResults
  },
  data () {
    return {
      searchResults: {}
    }
  },
  methods: {
    searchResultsUpdate(obj) {
      this.searchResults = obj;
    }
  },
}
</script>
