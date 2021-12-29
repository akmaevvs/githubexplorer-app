<template>
  <div class="rep-card">
    <!-- <img :src="rep.owner.avatar_url" alt="" srcset=""> -->
    <p class="rep-card__name">
      {{ rep.name }}
    </p>
    <div class="rep-info">
      <p class="rep-info__data">
        {{ rep.description }}
      </p>
      <p class="rep-info__data">
        {{ new Date(rep.created_at).toLocaleDateString() }}
        {{ new Date(rep.created_at).toLocaleTimeString() }}
      </p>
      <p class="rep-info__data">
        {{ rep.language }}
      </p>
      <p class="rep-info__data">ReadMe file:</p>
      <div class="rep-info__readme" v-html="readMe"></div>
      <button class="rep-info__unfold" @click="UnFoldReadMe">Unfold</button>
      <a :href="rep.html_url" target="_blank">Open in GitHub</a>
    </div>
  </div>
</template>

<script>
import { markdown } from "markdown";

export default {
  name: "repos-component",
  data() {
    return {
      readMe: "",
    };
  },
  props: {
    rep: {
      type: Object,
      default: () => {
        return {};
        // name: "",
        // description: "",
        // createDate: "",
        // link: "",
        // language: "",
        // readme: "",
      },
    },
  },
  methods: {
    UnFoldReadMe(event) {
      event.target.innerText =
        event.target.innerText === "Unfold" ? "Fold" : "Unfold";
      console.log(event.target.innerText);
      const readMeBlock = event.target.previousSibling;
      readMeBlock.classList.toggle("rep-info__readme--active");
      console.log(event.target.previousSibling);
    },
    async GetReadMe() {
      await this.$axios
        .get(
          `https://raw.githubusercontent.com/${this.rep.full_name}/${this.rep.default_branch}/README.md`
        )
        .then((result) => (this.readMe = markdown.toHTML(result.data)))
        .catch((error) => {
          this.readMe = "Файл ReadMe.md не найден";
          console.log(error);
        });

      console.log(this.readMe);
    },
  },
  async mounted() {
    await this.GetReadMe();
  },
};
</script>

<style lang="scss" scoped>
.rep-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  // max-width: 400px;

  width: 600px;
  background: #0d1117;
  border: 1px solid #30363d;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
    100px 100px 80px rgba(0, 0, 0, 0.07);
  color: #c9d1d9;
  &__name {
    font-weight: bold;
    color: #58a6ff;
    font-size: 18px;
    padding: 15px;
    background-color: #161b22;
    border-bottom: 1px solid #30363d;
  }
  & .rep-info {
    padding: 15px;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    &__data {
      font-weight: bold;
    }
    // &__unfold {
    //   // width: max-content;
    //   background: #21262d;
    //   // align-self: center;
    //   color: #c9d1d9;

    //   position: relative;
    //   padding: 5px 16px;
    //   font-size: 14px;
    //   font-weight: 500;
    //   line-height: 20px;
    //   white-space: nowrap;
    //   vertical-align: middle;
    //   cursor: pointer;
    //   user-select: none;
    //   border-radius: 6px;
    //   appearance: none;
    // }
    &__readme {
      padding: 0px 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-height: 300px;
      overflow-y: hidden;
      box-shadow: 0px 21px 9px -20px #58a6ff;
      transition: box-shadow .2s ease-in-out;

      &--active {
        max-height: inherit;
        height: auto;
        box-shadow: 0px 21px 9px -20px #58a6ff00;

      }

      &::v-deep(h1) {
        font-size: 20px;
        padding: 10px 0px;
        font-weight: bold;
        border-bottom: 1px solid grey;
      }

      &::v-deep(h2) {
        font-size: 16px;
        padding: 10px 0px;
        font-weight: bold;
        border-bottom: 1px solid grey;
      }

      &::v-deep(h3) {
        font-size: 16px;
        padding: 10px 0px;
        font-weight: bold;
        border-bottom: 1px solid grey;
      }

      &::v-deep(p) {
        padding: 10px;
        background-color: #161b22;
        border-radius: 5px;
        & code {
          font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
            Liberation Mono, monospace;
        }
      }
    }
  }
}
</style>
