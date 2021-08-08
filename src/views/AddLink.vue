<template>
  <div class="card">
    <router-link class="return-link" to="/">← Return to List</router-link>
    <h1>Add New Link</h1>
    <form>
      <div class="form-item">
        <label>Link Name</label>
        <input
          v-model="form.linkName"
          ref="linkName"
          type="text"
          placeholder="e.g. Alphabet"
          class="textbox  link-name"
          :class="{ error: $v.form.linkName.$error }"
          @keyup.enter="addLink"
        />
        <div
          class="error-item"
          v-if="$v.form.linkName.$error && !$v.form.linkName.required"
        >
          Link Name is required.
        </div>
      </div>
      <div class="form-item">
        <label>Link URL</label>
        <input
          v-model="form.linkUrl"
          type="text"
          placeholder="http://abc.xyz"
          class="textbox link-url"
          :class="{ error: $v.form.linkUrl.$error }"
          @keyup.enter="addLink"
        />
        <div
          class="error-item"
          v-if="$v.form.linkUrl.$error && !$v.form.linkUrl.required"
        >
          Link Url is required.
        </div>
        <div
          class="error-item"
          v-if="$v.form.linkUrl.$error && !$v.form.linkUrl.isUrl"
        >
          Url is not valid.
        </div>
      </div>
      <div class="form-item button">
        <button @click="addLink" type="button" class="save">
          Add
        </button>
      </div>
    </form>
    <SnackBar ref="snackbar"> <span>Link Name </span> added. </SnackBar>
  </div>
</template>

<script>
import SnackBar from "@/components/SnackBar";
import { required } from "vuelidate/lib/validators";
const isUrl = (value) => {
  const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const regex = new RegExp(expression);
  return regex.test(value);
};

var dayjs = require("dayjs");

export default {
  name: "AddLink",
  components: {
    SnackBar,
  },
  data() {
    return {
      form: {
        linkName: "",
        linkUrl: "",
      },
      linkList: [],
    };
  },
  validations: {
    form: {
      linkName: {
        required,
      },
      linkUrl: {
        required,
        isUrl,
      },
    },
  },
  methods: {
    addLink() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (!localStorage.getItem("link-list")) {
          localStorage.setItem("link-list", "[]");
        }

        this.linkList = JSON.parse(localStorage.getItem("link-list"));
        const linkItem = { ...this.form, time: dayjs().unix(), point: 0 };
        this.linkList.push(linkItem);
        localStorage.setItem("link-list", JSON.stringify(this.linkList));

        this.form.linkName = "";
        this.form.linkUrl = "";
        this.$refs.linkName.focus();
        this.$v.$reset();
        this.$refs.snackbar.isShow = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 26px;
  font-weight: bold;
}
.return-link {
  color: #000000;
  text-decoration: none;
  margin-bottom: 20px;
  display: inline-block;
}

form {
  margin-top: 40px;
  .form-item {
    margin-bottom: 30px;
    label {
      font-size: 18px;
      margin-bottom: 10px;
      display: inline-block;
    }
    &.button {
      display: flex;
      justify-content: flex-end;
    }
    .textbox {
      width: 100%;
      height: 60px;
      border-radius: 15px;
      border: 2px solid #000000;
      outline: none;
      font-size: 18px;
      padding-left: 20px;
      &.error {
        border-color: red;
      }
    }
    .save {
      height: 60px;
      border: 2px solid #000000;
      padding: 0 40px;
      font-size: 24px;
      font-weight: bold;
      border-radius: 15px;
      background-color: #ffffff;
      cursor: pointer;
      transition: all 0.2s linear;
      &:hover {
        background-color: #000000;
        color: #ffffff;
      }
    }
    .error-item {
      color: red;
      font-size: 12px;
      margin: 3px 0;
    }
  }
}
</style>
