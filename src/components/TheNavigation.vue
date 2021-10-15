<template>
  <!-- <div id="nav">
    <router-link :to="{name: 'Home'}">Home</router-link> |
    <router-link :to="{name: 'About'}">About</router-link> |
    <router-link v-if="!islogin" :to="{name: 'Login'}">Login</router-link> 
    <router-link v-else :to="{name: 'Admin'}">Admin</router-link> 
  </div> -->
  <div id="nav">
    <v-bottom-navigation v-model="value" grow light >
      <v-btn value="recent" >
        <router-link :to="{name: 'Home'}">Home</router-link>
        <v-icon>mdi-home-circle</v-icon>
      </v-btn>

      <v-btn value="favorites">
        <router-link :to="{name: 'About'}">About</router-link>
        <v-icon>mdi-book-information-variant</v-icon>
      </v-btn>

      <v-btn value="nearby">
        <router-link v-if="!islogin" :to="{name: 'Login'}">Login</router-link> 
        <router-link v-else :to="{name: 'Admin'}">Admin</router-link>
        <v-icon>mdi-folder-star-multiple</v-icon>
      </v-btn>

      <v-btn value="inicionSesion">
        <router-link :to="{name: 'SignUp'}">Sign Up</router-link>
        <v-icon>mdi-book-information-variant</v-icon>
      </v-btn>

    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  name: "TheNavigation",
  data: () => ({ value: 'favorites' }),
  computed : {
      islogin(){
          return localStorage.getItem('token');
      }
  }
};
</script>

<style scoped>
#nav {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 20px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
