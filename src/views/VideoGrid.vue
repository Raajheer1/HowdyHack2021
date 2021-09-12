<template>
    <v-container>
    <v-row v-for="column, value in columns" :key="column.id" class="v-row__border">
      <v-col v-for="item, key in column" :key="item.id" class="v-col__border">
        <v-card elevation="15" class="pa-4">
          <div v-if="item.status == 'active'">
            <VideoPlayer :options="item" />
            <v-row class="text-center">
              <v-col cols="12" class="mt-3">
                <v-btn
                  class="ma-1"
                  color="success"
                  plain
                  @click="copyURL(item)"
                  >
                  PlaybackURL
                </v-btn>
                <v-btn
                    class="ma-1"
                    color="error"
                    plain
                    @click="delVideo(item)"
                >
                  Delete
                </v-btn>
                <v-btn
                    class="ma-1"
                    color="success"
                    plain
                    @click="copy(item)"
                >
                  Streamkey
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <div v-else class="text-center">
            {{ item.status[0].toUpperCase() + item.status.substring(1) }} Stream {{ value * 3 + key + 1}}
            <v-spacer></v-spacer>
            <v-btn
                class="ma-1"
                color="success"
                plain
                @click="copyURL(item)"
            >
              PlaybackURL
            </v-btn>
            <v-btn
                class="ma-1"
                color="error"
                plain
                @click="delVideo(item)"
            >
              Delete
            </v-btn>
            <v-btn
                class="ma-1"
                color="success"
                plain
                @click="copy(item)"
            >
              Streamkey
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer';
import axios from 'axios';

export default {
  name: "VideoGrid",
  data() {
    return {
      stuff: null,
      cols: 3,
      deleting: false,
      dialog: false,
    }
  },
  components: { VideoPlayer },
  computed: {
    columns() {
      let columns = [];
      columns.push([]);
      this.$store.state.streams.forEach((item, key) => {
        columns[Math.floor(key/this.cols)].push(item);
        if(key%3 == 2){
          columns.push([]);
        }
      });
      return columns;
    }
  },
  methods: {
    delVideo(item){
      axios.get(`${this.$store.state.appURL}del/${item.id}`).then(() => {
        this.$notify({
          type: 'error',
          duration: 10000,
          group: 'notifications',
          title: 'Stream Deleted!',
          text: "The stream has successfully been deleted."
        });
      });
    },
    copy(item){
      this.$copyText(item["stream_key"]).then(() => {
        this.$notify({
          type: 'success',
          duration: 3000,
          group: 'notifications',
          title: 'Copied Streamkey!',
          text: 'The Streamkey has been copied to your clipboard.'
        });
      }), () => {
        this.$notify({
          type: 'error',
          duration: 3000,
          group: 'notifications',
          title: 'Streamkey copy error!',
          text: 'There was an error copying the Streamkey to your clipboard.'
        });
      }
    },
    copyURL(item) {
      this.$copyText(`https://stream.raajpatel.dev/${item['playback_ids'][0]['id']}.m3u8`).then(() => {
        this.$notify({
          type: 'success',
          duration: 3000,
          group: 'notifications',
          title: 'Copied PlaybackURL!',
          text: 'The PlaybackURL has been copied to your clipboard.'
        });
      }), () => {
        this.$notify({
          type: 'error',
          duration: 3000,
          group: 'notifications',
          title: 'PlaybackURL copy error!',
          text: 'There was an error copying the PlaybackURL to your clipboard.'
        });
      }
    }
  },
  created() {
    if(!this.$store.state.login){
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>