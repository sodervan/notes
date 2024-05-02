<template>
  <main>
    <div class="add-new-note">
      <p @click="toggleTheModal">+ New note</p>
    </div>
    <h2>This week</h2>
    <notes
      v-for="note in this.$store.state.favourites"
      :key="note.id"
      :theNotes="note"
      @filteredNote="filteredNote"
    ></notes>
  </main>
</template>

<!-------------SCRIPT------------------>

<script>
import Notes from "../Components/Notes.vue";
export default {
  methods: {
    filteredNote(id) {
      this.selectedNote = this.$store.state.favourites.find(
        (note) => note.id === id
      );
      this.$store.commit("setFilteredFavourites", this.selectedNote);
    },
    toggleTheModal() {
      this.$store.commit("toggleModal");
    },
  },

  components: {
    Notes,
  },
};
</script>

<!-------------STYLE-------------->

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

.add-new-note {
  background: #313036;
  border-radius: 10px;
  /* margin-bottom: 10px; */
}
.add-new-note p {
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  padding: 1rem;
  cursor: pointer;
}
</style>
