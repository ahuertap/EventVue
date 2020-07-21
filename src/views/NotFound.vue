<template>
  <div>
    <h1>Oops!</h1>
    <h1>The {{ resource }} you're looking for is not here.</h1>
    <router-link :to="{ name: 'event-list' }"
      >Back to the home page
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  props: {
    resource: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped></style>
