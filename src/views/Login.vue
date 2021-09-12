<template>
  <v-row no-gutters class="pt-3">
    <v-overlay
        :value=trans
        :opacity=1
    >
      <v-col cols="12">
        <v-card color="#1a1a1a" dark width="450px" class="pa-4">
          <v-card-text class="text-center">
            <h1>HowdyHack2021</h1>
            <v-text-field
              v-model="password"
              label="Password"
              outlined
              color="white"
              class="pt-3"
              >
            </v-text-field>
            <v-btn @click="login">
              Login
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-overlay>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  name: "Login",
  data() {
    return {
      password: null,
      trans: true
    }
  },
  methods: {
    login(){
      this.trans = !this.trans;
      axios.get(`${this.$store.state.appURL}login/${this.password}`).then(response => {
        if(response.data == true){
          this.$store.state.login = true;
          this.$router.push("overview");
          this.$notify({
            type: 'success',
            duration: 3000,
            group: 'notifications',
            title: 'Welcome Back!',
            text: 'Welcome back to the dashboard, we missed you!.'
          })
        }else{
          this.$notify({
            type: 'error',
            duration: 3000,
            group: 'notifications',
            title: 'Invalid Credentials',
            text: 'Invalid login credentials, please try again.'
          })
        }
      })
    }
  }
}
</script>