<template>
  <div>
    <video ref="videoPlayer" class="video-js">
      <source :src="`https://stream.raajpatel.dev/${options['playback_ids'][0]['id']}.m3u8`" type="application/x-mpegURL">
    </video>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default {
  name: "AssetPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      player: null
    }
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, {autoplay: false, controls: true, fluid: true}, function onPlayerReady() {
      console.log('onPlayerReady', this);
    })
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>

<style scoped>

</style>