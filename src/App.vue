<template>
  <v-app id="inspire">
    <v-app-bar
      app
      clipped-right
      flat
      height="75"
      v-if="isStream"
      >
      <v-spacer></v-spacer>
      <h1 class="pl-10">
        <div v-if="isOverview">
          Overview
        </div>
        <div v-else-if="isAssets">
          Assets
        </div>
      </h1>
      <v-spacer></v-spacer>
      <v-responsive max-width="156">
      </v-responsive>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      width="200">
      <v-sheet
        color="#363636"
        height="75"
        width="100%"
        >
        <div class="text-center pt-6">
          <h1 style="color: white">
            Controller
          </h1>
        </div>
      </v-sheet>

      <v-list
        class="pl-0"
        shaped
        >
        <router-link :class="{disabled: !isLogin}" class="routerLink" to="/overview" v-slot="{ href, isExactActive, navigate }">
          <v-list-item link :href="href" @click="navigate">
            <v-list-item-content>
              <v-list-item-title :class="{isActive:isExactActive}">Overview</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-list-item link :disabled="!isLogin">
          <v-list-item-content @click="newVideo">
            <v-list-item-title>New Stream</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <router-link :class="{disabled: !isLogin}" class="routerLink" to="/assets" v-slot="{ href, isExactActive, navigate }">
          <v-list-item link :href="href" @click="navigate">
            <v-list-item-content>
              <v-list-item-title :class="{isActive:isExactActive}">Assets</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer
      app
      color="transparent"
      height="72"
      inset
    >
    </v-footer>

    <notifications group="notifications" position="bottom right" />
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      drawer: null,
      sheet: false
    }
  },
  computed: {
    isLogin(){
      return this.$store.state.login;
    },
    isOverview(){
      return this.$route.path == "/overview";
    },
    isAssets(){
      return this.$route.path == "/assets";
    },
    isStream(){
      return !(this.$route.path == "/stream");
    }
  },
  methods: {
    getVideo(){
      axios.get(`${this.$store.state.appURL}list`).then(response => {
        this.$store.state.streams = response.data;
      });
    },
    getAssets(){
      axios.get(`${this.$store.state.appURL}listasset`).then(response => {
        this.$store.state.assets = response.data;
      });
    },
    newVideo(){
      this.$store.state.loading = true;
      axios.get(`${this.$store.state.appURL}create`).then(response => {
        this.$notify({
          type: 'success',
          duration: 30000,
          group: 'notifications',
          title: 'New Stream Created!',
          text: `Stream Key: ${response.data["stream_key"]} <br> Playback URL: https://stream.raajpatel.dev/${response.data["playback_ids"][0]["id"]}.m3u8`
        });
        this.getVideo();
      });
      this.$store.state.loading = false;
    },
    StreamButton(item, key){
      if(item.status == 'active'){
        this.$store.state.streamkey = item;
        this.$store.state.title = key;
        this.$router.push("stream");
      }else{
        this.$notify({
          type: 'error',
          duration: 5000,
          group: 'notifications',
          title: 'Error: No Stream.',
          text: 'The stream is not being used.'
        })
      }
    }
  },
  created(){
    axios.get(`${this.$store.state.appURL}list`).then(response => {
      this.$store.state.streams = response.data;
      this.$store.state.loading = false;
    });
    axios.get(`${this.$store.state.appURL}listasset`).then(response => {
      this.$store.state.assets = response.data;
    });
    this.$store.state.intervalvideo = setInterval(() => this.getVideo(), 5000);
    this.$store.state.intervalasset = setInterval(() => this.getAssets(), 15000);
  },

  beforeDestroy() {
    clearInterval(this.$store.state.intervalvideo);
    clearInterval(this.$store.state.intervalasset);
  }
};
</script>

<style>
.routerLink {
  text-decoration: none;
}

a.router-link-exact-active {
  color: #1DE9B6;
}

.isActive {
	color: #1DE9B6;
}

.disabled {
	opacity: 0.5;
  pointer-events: none;
}
</style>
