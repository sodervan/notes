<template>
  <main>
    <div
      v-if="this.$store.state.recentlyDeletedNotes.length === 0"
      class="no_deleted_notes"
    >
      <img src="../Video/Animation - 1714236482800.gif" alt="#" />
      <p>There are no deleted notes</p>
    </div>
    <div v-else>
      <div class="deleted_functions">
        <div class="restorer">
          <p @click="toggleTheModal">
            <span class="restore"><i class="fi fi-rr-time-past"></i></span
            >RESTORE ALL
          </p>
        </div>
        <div class="add-new-note">
          <p @click="toggleTheModal">
            <span class="restore"><i class="fi fi-rr-trash-xmark"></i></span
            >DELETE ALL
          </p>
        </div>
      </div>
      <!-- <h2>This week</h2> -->
      <notes
        v-for="note in this.$store.state.recentlyDeletedNotes"
        :key="note.id"
        :theNotes="note"
        @filteredNote="filteredNote"
      ></notes>
    </div>
  </main>
</template>

<script>
import Notes from "../Components/Notes.vue";
export default {
  methods: {
    filteredNote(id) {
      this.selectedNote = this.$store.state.recentlyDeletedNotes.find(
        (note) => note.id === id
      );
      this.$store.commit("setFilteredDeleted", this.selectedNote);
    },
    toggleTheModal() {
      this.$store.commit("showPermanentDeleteModal");
    },
  },

  components: {
    Notes,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

@import url("https://cdn-uicons.flaticon.com/2.2.0/uicons-regular-straight/css/uicons-regular-straight.css");
* {
  font-family: "Poppins", sans-serif;
  color: white;
}
h2 {
  font-family: "Poppins", sans-serif;
  color: white;
  font-weight: 300;
  font-size: 1.3rem;
  margin: 10px 0;
}
.deleted_functions {
  display: flex;
  justify-content: space-between;
  /* margin: 10px 0; */
}
.restorer {
  background: var(--dark-alt);
  border-radius: 10px;
}
.restorer p {
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  padding: 1rem;
  cursor: pointer;
}
.add-new-note {
  background: #313036;
  border-radius: 10px;
  /* margin-bottom: 10px; */
}
.restore {
  margin-right: 10px;
}
.add-new-note p {
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  padding: 1rem;
  cursor: pointer;
}
.no_deleted_notes {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
}
</style>
