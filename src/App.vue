<template>
  <v-app>
    <v-content>
      <router-link to="/search">Go to Foo</router-link>
      <router-link to="/report/123123">Go to Foo</router-link>
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
import Search from './components/Search';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default {
  name: 'App',
  components: {
    Search, 
  },
}
</script>
