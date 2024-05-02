<template>
  <confirm
    v-if="confirmDelete"
    @close-modal="toNotDelete"
    @delete-note="deleteNote"
    @deleteNote-permanently="deletePermanently"
  />
  <div
    v-if="this.$store.state.theFilteredNotes.length === 0"
    class="no_note_details"
  >
    <img src="../Video/Animation - 1714317409182.gif" alt="#" />
    <div>
      <p>Note you select will show here</p>
    </div>
  </div>
  <div v-if="this.$store.state.theFilteredNotes.id">
    <div class="top-head">
      <div class="only-and-add">
        <!-- <div class="only-for-me">
          <p>Only for Me</p>
        </div> -->
        <div class="add-user" @click="clearFilteredNotes">
          <p>Close</p>
        </div>
      </div>

      <div class="left-icons">
        <div
          :class="{
            saved: this.$store.state.isSaved,
            notSaved: !this.$store.state.isSaved,
          }"
          @click="saveNote"
        >
          <p>
            <i class="fi fi-rr-check" v-if="this.$store.state.isSaved"></i
            ><span v-text="this.$store.state.isSaved ? 'Saved' : 'Save'"></span>
          </p>
        </div>
        <div class="function-icons">
          <div v-if="!addedToFavorites" @click="isAddedToFavourites">
            <i class="fi fi-rr-star"></i>
          </div>
          <div v-if="addedToFavorites" @click="isAddedToFavourites">
            <img
              src="../Video/Animation - 1712422047836.gif"
              alt="Animated GIF"
            />
          </div>
          <div><i class="fi fi-rr-bell"></i></div>
          <div><i class="fi fi-rr-share"></i></div>
          <div @click="toConfirmDelete">
            <i class="fi fi-rr-trash-xmark"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="header">
      <input
        class="title"
        :value="$store.state.theFilteredNotes.title"
        @input="$store.commit('updateTitle', $event.target.value)"
        spellcheck="false"
      />
      <div class="the-clm">
        <div class="clm">
          <div>
            <p class="created">Created</p>
          </div>
          <div>
            <p class="created-date">{{ $store.state.theFilteredNotes.date }}</p>
          </div>
        </div>
        <div class="clm">
          <div>
            <p class="last-modified">Last modified</p>
          </div>
          <div>
            <p class="last-modified-date">
              {{ $store.state.theFilteredNotes.date }}
            </p>
          </div>
        </div>
      </div>

      <div class="the-tags">
        <!-- <div v-for="tags in $store.theFilteredNotes.tags" :key="tags" class="tag-box">
        <p class="tags">{{ tags }}</p>
      </div> -->
      </div>

      <!-- <p>{{ $store.state.theFilteredNotes.content }}</p> -->
    </div>

    <div class="functions"></div>

    <div class="content">
      <div
        class="nothing-here"
        @click="typeNote"
        v-if="
          !this.$store.state.theFilteredNotes.content ||
          this.$store.state.theFilteredNotes.content.length === 0
        "
      >
        <img src="../Video/Animation - 1712258630851.gif" alt="Animated GIF" />
        <h1>NOTHING HERE. TAP TO ADD</h1>
      </div>

      <textarea
        v-else
        class="the-content"
        :value="this.$store.state.theFilteredNotes.content"
        @input="$store.commit('updateContent', $event.target.value)"
        spellcheck="false"
      ></textarea>
    </div>
  </div>
</template>

<!-----------SCRIPT--------------->
<script>
import Confirm from "./Confirm.vue";

export default {
  data() {
    return {
      content: this.$store.state.theFilteredNotes.content,
      confirmDelete: false,
      addedToFavorites: false,
    };
  },
  components: {
    Confirm,
  },
  methods: {
    clearFilteredNotes() {
      this.$store.state.theFilteredNotes = [];
    },
    isAddedToFavourites() {
      this.addedToFavorites = !this.addedToFavorites;
      this.$store.dispatch(
        "addToFavourites",
        this.$store.state.theFilteredNotes.id
      );
    },
    toConfirmDelete() {
      this.confirmDelete = true;
    },
    toNotDelete() {
      this.confirmDelete = false;
    },
    deleteNote() {
      console.log(this.$store.state.theFilteredNotes.id);
      this.$store.dispatch("deleteNote", this.$store.state.theFilteredNotes.id);
    },
    deletePermanently() {
      console.log(this.$store.state.theFilteredDeleted.id);
      cosole.log("hi");
      this.$store.dispatch(
        "deleteNotePermanently",
        this.$store.state.theFilteredDeleted.id
      );
    },
    typeNote() {
      this.$store.state.theFilteredNotes.content = "-";
      this.saveNote();
    },
    saveNote() {
      // this.$store.commit("updateContent", this.content);
      this.$store.dispatch(
        "updateContentInDatabase",
        this.$store.state.theFilteredNotes.id
      );
      // console.log(this.$store.state.theFilteredNotes.content);
    },
    theContent(e) {
      this.content = e.target.value;
      console.log(this.content);
    },
  },
};
</script>

<!-----------STYLE--------------->

<style scoped>
@import url("https://cdn-uicons.flaticon.com/2.2.0/uicons-regular-rounded/css/uicons-regular-rounded.css");
* {
  font-family: "Poppins", sans-serif;
}
.no_note_details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
}
.add-user {
  cursor: pointer;
}
.no_note_details p {
  color: white;
  font-size: 0.8rem;
  margin-top: 20px;
}
.notSaved {
  background: var(--dark);
  color: white;
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
}
.title {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--light);
  background: none;
  border: none;
  color: white;
}
.title:focus {
  outline: none;
}
.nothing-here {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  /* margin: 0px auto; */
  /* object-fit: cover; */
}
.nothing-here h1 {
  font-size: 1rem;
  font-weight: 400;
  color: var(--light);
  margin-top: 20px;
}
.all-tags {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
i {
  font-size: 0.8rem;
  /* margin-right: 20px; */
}
.only-for-me {
  font-size: 1rem;
  margin-right: 10px;
}
.saved {
  background: var(--light);
  color: black;
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
}
.saved p {
  font-size: 0.8rem;
}
.function-icons {
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
}
.function-icons div {
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s ease-out;
}
.function-icons div:hover {
  background: #5c5b63;
}
.function-icons img {
  width: 35px;
  height: 35px;
}
.left-icons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add-user {
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--light);
  align-items: center;
  padding: 10px;
  height: 35px;
  border-radius: 8px;
}
.add-user p {
  font-size: 0.8rem;
}
.fi-rr-user-add {
  font-size: 1rem;
}
.only-and-add {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.top-head {
  display: flex;
  justify-content: space-between;
  color: var(--light);
  margin-bottom: 40px;
}
.header {
  overflow: hidden;
}
.created-date,
.last-modified-date {
  font-size: 0.9rem;
  color: var(--light);
  font-family: "Poppins", sans-serif;
}
.created,
.last-modified {
  font-size: 0.9rem;
  color: var(--grey);
  font-family: "Poppins", sans-serif;
}
.the-clm {
  width: 50%;
  overflow: hidden;
}
.clm {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.title {
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--light);
  margin-bottom: 1rem;
  font-family: "Poppins", sans-serif;
}
.content {
  overflow-y: auto;
}
.the-content {
  font-size: 1rem;
  color: var(--light);
  font-family: "Poppins", sans-serif;
}
textarea {
  width: 100%;
  height: 500px;
  padding: 0.5rem;
  margin: 0.5rem 0;
  scrollbar-width: thin; /* "auto" or "thin" */
  scrollbar-color: var(--dark) var(--grey);
  background: none;
  color: white;
  border: none;
}
textarea:focus {
  outline: none;
  /* box-shadow: 0 0 10px rgba(107, 23, 254, 0.5); */
}
</style>
