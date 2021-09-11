<template>
  <v-row no-gutters class="pt-3">
    <v-col cols="4">
    </v-col>

    <v-col cols="4">
      <v-card color="red" dark>
        <v-card-text>
          <v-text-field
            v-model="password"
            label="Password"
            outlined
            color="white"
            >
          </v-text-field>
          <v-btn @click="login">
            Login
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="4">
    </v-col>
</template>

<script>
import axios from 'axios';

export default {
  name: "Login"
  data() {
    return {
      password: null
    }
  },
  methods: {
    login(){
      axios.get(`${this.$store.state.appURL}login/${this.password}`).then(response => {
        if(response.data == true){
          this.$store.state.login == true;
          this.$router.push("overview");
        }else{
          this.$notify({
            type: 'error',
            duration: 3000,
            group: 'messages',
            title: 'Invalid Credentials',
            text: 'Invalid login credentials, please try again.'
          })
        }
      }
    }
  }
}
</script>

<style scoped>

</style>