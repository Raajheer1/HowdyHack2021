<template>
  <div>
    <video ref="videoPlayer" class="video-js">
      <source :src="`https://stream.raajpatel.dev/${store.state.streamkey['playback_ids'][0]['id']}.m3u8`" type="application/x-mpegURL">
    </video>
  </div>
</template>

<script>
import videojs from 'video.js';
// import 'videojs/dist/video-js.css';

export default {
  name: "VideoPlayer",
  data() {
    return {
      player: null
    }
  },
  mounted(){
    this.player = videojs(this.$refs.videoPlayer, {autoplay: 'muted', controls: true, fluid: true}, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
  },
  created(){
    if(!this.$store.state.login){
      this.$router.push("/");
    }
  },
  beforeDestroy() {
    if(this.player){
      this.player.dispose();
    }
  }
}
</script>

<style scoped>

</style>