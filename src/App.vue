<template>
  <div class="inner">
    <form-component @get-repos="GetRepos" />
    <div class="repos-inner">
      <repos-component v-for="rep in repos" :key="rep.id" :rep="rep" />

    </div>
  </div>
</template>

<script>
import FormComponent from "@/components/FormComponent.vue";
import ReposComponent from "@/components/ReposComponent.vue";

export default {
  name: "App",
  components: {
    FormComponent,
    ReposComponent,
  },
  data() {
    return {
      repos: null,
    };
  },
  methods: {
    async GetRepos(userName) {
      console.log(userName);
      await this.$axios
        .get(`https://api.github.com/users/${userName}/repos`)
        .then((result) => (this.repos = result.data));

      console.log(this.repos);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/css/reset";

body {
  background: #0d1117;
}

.inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.repos-inner {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

button, input {
      background: #21262d;
    color: #c9d1d9;
    position: relative;
    padding: 5px 16px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border: 1px solid #30363d;
    border-radius: 6px;
    appearance: none;
}

input {
  background-color: #0d1117;
}

form {
      background: #161b22;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px;
    gap: 20px;
}
</style>
