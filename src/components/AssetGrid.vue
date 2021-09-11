<template>
  <v-container>
    <v-row v-for="column, value in columns" :key="column.id" class="v-row__border">
  </v-container>
</template>

<script>
export default {
  name: "assetGrid"
}
</script>

<style scoped>

</style>