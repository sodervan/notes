<template>
  <main>
    <confirm-delete v-if="$store.state.logout === true"></confirm-delete>
    <div class="app" v-if="$route.name !== 'signup' && $route.name !== 'login'">
      <side-bar />
      <div class="main-space">
        <new-note
          v-if="$store.state.showModal"
          :addNote="incluseTheNote"
        ></new-note>
        <div class="side left-side">
          <router-view />
        </div>
        <div class="side right-side">
          <notes-details v-if="$route.name === 'allnotes'" />
          <deleted-details v-if="$route.name === 'recentlydeleted'" />
        </div>
      </div>
    </div>
    <div>
      <router-view />
    </div>
  </main>
</template>

<!-----------SCRIPT--------------->

<script>
import Home from "./Pages/Home.vue";
import AllNotes from "./Pages/AllNotes.vue";
import NotesDetails from "./Components/NotesDetails.vue";
import NewNote from "./Components/NewNote.vue";
import DeletedDetails from "./Components/DeletedDetails.vue";
import ConfirmDelete from "./Components/ConfirmDelete.vue";
export default {
  data() {
    return {
      selectedNote: null,
    };
  },
  mounted() {
    this.$store.dispatch("getNotes");
    this.$store.dispatch("getFavourites");
    this.$store.dispatch("fetchDeleted");
  },
  components: {
    Home,
    AllNotes,
    NotesDetails,
    NewNote,
    DeletedDetails,
    ConfirmDelete,
  },
};
</script>

<!-----------STYLE--------------->

<style lang="scss">
@import url("https://cdn-uicons.flaticon.com/2.2.0/uicons-regular-rounded/css/uicons-regular-rounded.css");
:root {
  --primary: #242424;
  --grey: #64748b;
  --dark: #313036;
  --light: #f1f5f9;
  --sidebar-width: 300px;
  --dark-alt: #6b17fe;
  --dark-purple: #3d3c54;
  --grey-text: #d7d7d8;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;

  .main-space {
    display: flex;
    height: 100vh;
    width: 100%;

    .side {
      overflow-y: auto;
      border-right: 1px solid var(--dark);
      scrollbar-width: thin; /* "auto" or "thin" */
      scrollbar-color: var(--dark) var(--grey);
    }
    .left-side {
      width: 35%;
      padding: 2rem;
    }
    .right-side {
      flex: 1;
      padding: 2rem;
      overflow: hidden;
    }
  }

  main {
    flex: 1 1 0;
    // padding: 2rem;

    @media (max-width: 768px) {
      padding-left: 6rem;
    }
  }
}
</style>
