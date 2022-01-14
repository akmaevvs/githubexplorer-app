<template>
  <form @submit.prevent="GetRepos">
    <input type="text" v-model="userName" placeholder="Input user name">
    <button type="submit">Find repositories</button>
  </form>
</template>

<script>
export default {
  name: "form-component",
  data() {
    return {
      userName: null,
    }
  },
  methods: {
    GetRepos() {
      this.$emit("get-repos", this.userName)
    }
  }
}
</script>

<style>

</style>