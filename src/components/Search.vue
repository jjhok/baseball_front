<template>
  <v-app>
    <v-content>
      <SearchInput @update="searchResultsUpdate" />
      <SearchResults v-if="searchResults.length > 0" :results="searchResults" length="5" />
    </v-content>
  </v-app>
</template>

<script>
import SearchInput from './SearchInput.vue';
import SearchResults from './SearchResults.vue';

export default {
  name: 'Search',
  components: {
    SearchInput, SearchResults
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
