<template>
  <div class="inner">
    <form-component @get-repos="GetRepos" />
    <div class="repos-inner" v-if="repos && repos.length > 0">
      <transition-group name="list">
        <repos-component v-for="rep in repos" :key="rep.id" :rep="rep" />
      </transition-group>
    </div>
    <div v-else class="status-block">
      {{ status }}
      <span v-html="smile"></span>
    </div>
    <bot-footer />
  </div>
</template>

<script>
import FormComponent from "@/components/FormComponent.vue";
import ReposComponent from "@/components/ReposComponent.vue";
import BotFooter from "@/components/BotFooter.vue";

export default {
  name: "App",
  components: {
    FormComponent,
    ReposComponent,
    BotFooter,
  },
  data() {
    return {
      repos: null,
      status: "Input user name to view repositories.",
      smile: "&#128515;",
    };
  },
  methods: {
    async GetRepos(userName) {
      console.log(userName);
      await this.$axios
        .get(`https://api.github.com/users/${userName}/repos`)
        .then((result) => {
          this.repos = result.data;

          if (this.repos.length === 0) {
            this.status = `${userName} has not added any repository yet.`;
            this.smile = "&#128528;";
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log("err");
            console.log(error.response.status);

            if (error.response.status === 404) {
              this.status = `${userName} cannot be found.`;
              this.smile = "&#128542;";
            }
          }
        });

      console.log(this.repos);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/css/reset";

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

:root {
  color-scheme: dark;
}
body {
  background: #0d1117;
  margin-bottom: 70px;
  // scrollbar-color: #6969dd #e0e0e0;
  // &::-webkit-scrollbar {
  //   width: 15px;
  // }

  // &::-webkit-scrollbar-track {
  //   background-color: #424242;
  // }

  // &::-webkit-scrollbar-thumb {
  //   background-color: #686868;
  //   // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  // }
  // &::-webkit-scrollbar-button:single-button {
  //   // background-color: #bbbbbb;
  //   display: block;
  //   border-style: solid;
  //   height: 16px;
  //   width: 16px;
  // }
  // /* Up */
  // &::-webkit-scrollbar-button:single-button:vertical:decrement {
  //   border-width: 0 8px 8px 8px;
  //   border-color: transparent transparent #555555 transparent;
  // }

  // &::-webkit-scrollbar-button:single-button:vertical:decrement:hover {
  //   border-color: transparent transparent #777777 transparent;
  // }
  // /* Down */
  // &::-webkit-scrollbar-button:single-button:vertical:increment {
  //   border-width: 8px 8px 0 8px;
  //   border-color: #555555 transparent transparent transparent;
  // }

  // &::-webkit-scrollbar-button:vertical:single-button:increment:hover {
  //   border-color: #777777 transparent transparent transparent;
  // }
}

.inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}

.repos-inner {
  display: flex;
  // flex-wrap: wrap;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  margin: 0px 10px;
}

.status-block {
  color: #c9d1d9;
}

button,
input {
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
  outline: none;
}

button {
  transition: all .1s ease-in-out;
  &:hover {
    background-color: #30363d;
    border-color: #444a50;
  }
  &:active {
    background-color: #0d419d;
    border-color: #2453a7;
    color: #f0f6fc;
  }
}

input {
  background-color: #0d1117;
  cursor: initial;
  transition: border-color .1s ease-in-out;
  &:focus {
    border-color: #1f6feb;
  }
}

form {
  position: sticky;
  top: 0;
  z-index: 9;
  background: #161b22;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  gap: 20px;
  flex-wrap: wrap;
  border-bottom: 1px solid #30363d;
}
a {
  color: #58a6ff;
}
</style>
