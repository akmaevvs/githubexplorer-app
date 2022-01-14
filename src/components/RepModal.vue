<template>
  <div class="modal-inner" @click.self="Close">
    <div class="rep-card">
      <!-- <img :src="rep.owner.avatar_url" alt="" srcset=""> -->
      <div class="rep-card__name-link">
        <span class="rep-card__name">
          {{ rep.name }}
        </span>
        <a class="rep-card__link" :href="rep.html_url" target="_blank"
          >Open in GitHub</a
        >
      </div>
      <div class="rep-info">
        <p class="rep-info__data" v-if="rep.description">
          Description:
          <span class="rep-info__data--info">{{ rep.description }}</span>
        </p>
        <p class="rep-info__data">
          Created at:
          <span class="rep-info__data--info"
            >{{ new Date(rep.created_at).toLocaleDateString() }}
            {{ new Date(rep.created_at).toLocaleTimeString() }}</span
          >
        </p>
        <p class="rep-info__data" v-if="rep.language">
          Language: <span class="rep-info__data--info">{{ rep.language }}</span>
        </p>
        <p class="rep-info__data">ReadMe file:</p>
        <div class="rep-info__readme" v-html="readMe"></div>
        <button class="rep-info__unfold" @click="Close">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { markdown } from "markdown";

export default {
  name: "rep-modal",
  data() {
    return {
      readMe: "",
    };
  },
  methods: {
    Close() {
      this.$emit("close-modal");
    },
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
};
</script>

<style lang="scss" scoped>
.modal-inner {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* align-content: center; */
  z-index: 10;
  background: #0000009c;
  padding: 0px 10px;
}
.rep-card {
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  max-height: 600px;
  height: auto;
  overflow: hidden;
  max-width: 700px;
  width: 100%;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 5px;
  box-shadow: 2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
    100px 100px 80px rgba(0, 0, 0, 0.07);
  color: #c9d1d9;
  &__name-link {
    display: flex;
    padding: 15px;
    justify-content: space-between;
    border-bottom: 1px solid #30363d;
    background-color: #161b22;
    align-items: center;
  }
  &__name {
    font-weight: bold;
    color: #58a6ff;
    font-size: 18px;
  }
  &__link {
    font-size: 14px;
  }
  & .rep-info {
    padding: 25px;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    
    &__data {
      font-weight: bold;
      &--info {
        font-weight: normal;
      }
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
      overflow-y: scroll;
      padding: 0px 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-height: 330px;
      // box-shadow: 0px 21px 9px -20px #58a6ff;
      transition: box-shadow 0.2s ease-in-out;

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
