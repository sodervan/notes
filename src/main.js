import { createApp } from "vue";
import { createStore } from "vuex";
import "./style.css";
import App from "./App.vue";
import router from "./Router";
import sideBar from "./Components/SideBar.vue";
// import Signup from "./Auth/Signup.vue";

const app = createApp(App);
const store = createStore({
  state() {
    return {
      //THE AUH SECTION
      userId: null,
      token: null,
      tokenExpiration: null,
      /////////////////
      logout: false,
      notes: [],
      favourites: [],
      theFilteredNotes: [],
      theFilteredFavourites: [],
      recentlyDeletedNotes: [],
      theFilteredDeleted: [],
      showModal: false,
      showPermanentDeleteModal: false,
      isSaved: true,
      isLoading: false,
    };
  },
  mutations: {
    //AUTH SECTION
    setUser(state, payload) {
      (state.userId = payload.userId),
        (state.token = payload.token),
        (state.tokenExpiration = payload.tokenExpiration);
      (state.notes = []), (state.favourites = []);
      (state.theFilteredNotes = []), (state.theFilteredFavourites = []);
      (state.recentlyDeletedNotes = []), (state.theFilteredDeleted = []);
    },
    //////////////
    setFilteredDeleted(state, notes) {
      state.theFilteredDeleted = notes;
    },
    addToDeleted(state, notes) {
      state.recentlyDeletedNotes = notes;
    },
    addFavourites(state, newFavourites) {
      state.favourites.push(newFavourites);
    },
    setFilteredFavourites(state, notes) {
      state.theFilteredFavourites = notes;
      console.log(state.theFilteredFavourites);
    },
    setFilteredNotes(state, notes) {
      state.theFilteredNotes = notes;
    },
    toggleModal(state) {
      state.showModal = !state.showModal;
    },
    togglePermanentDeleteModal(state) {
      state.showPermanentDeleteModal = !state.showPermanentDeleteModal;
    },
    addToNote(state, newNotes) {
      newNotes.forEach((newNote) => {
        const exists = state.notes.some((note) => note.id === newNote.id);
        if (!exists) {
          state.notes.push(newNote);
        }
      });
    },
    forDeleted(state, fornotes) {
      state.notes = fornotes;
    },
    updateContent(state, content) {
      state.theFilteredNotes.content = content;
      state.isSaved = false;
    },
    updateTitle(state, title) {
      state.theFilteredNotes.title = title;
    },
    updateIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    //SIGNUP AND LOGIN FUNCTIONALITY
    logout(context) {
      context.commit("setUser", {
        userId: null,
        token: null,
        tokenExpiration: null,
      });
      console.log(context.state.userId);
    },
    async Signup(context, payload) {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCemyESUcH3A1gwtjJjYcIRXj7-rVh2MjM",
        {
          method: "POST",
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        console.log(responseData);
        const error = new Error(
          responseData.message ||
            "Failed to authenticate. Check your login data."
        );
        throw error;
      }
      context.commit("setUser", {
        userId: responseData.localId,
        token: responseData.idToken,
        tokenExpiration: responseData.expiresIn,
      });
      console.log(context.state.userId);
    },

    async Login(context, payload) {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCemyESUcH3A1gwtjJjYcIRXj7-rVh2MjM",
        {
          method: "POST",
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        console.log(responseData);
        const error = new Error(
          responseData.message ||
            "Failed to authenticate. Check your login data."
        );
        throw error;
      }
      context.commit("setUser", {
        userId: responseData.localId,
        token: responseData.idToken,
        tokenExpiration: responseData.expiresIn,
      });
      console.log(context.state.userId);
    },

    fetch(context, payload) {
      fetch(
        `https://note-pad-100cc-default-rtdb.firebaseio.com/notes/${context.state.userId}.json?auth=` +
          context.state.token,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      ).then(() => {
        context.dispatch("getNotes");
      });
    },

    addToFavourites(context, payload) {
      const noteToUpdate = context.state.notes.find(
        (note) => note.id === payload
      );
      // console.log(noteToUpdate);
      console.log("Adding note to favourites...");
      fetch(
        `https://note-pad-100cc-default-rtdb.firebaseio.com/favourites/${context.state.userId}.json?auth=` +
          context.state.token,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noteToUpdate),
        }
      ).then(() => {
        context.dispatch("getFavourites", noteToUpdate);
      });
    },

    getFavourites(context, payload) {
      // context.commit("updateIsLoading", true);
      // console.log(context.state.isLoading);
      console.log("Fetching notes...");
      fetch(
        `https://note-pad-100cc-default-rtdb.firebaseio.com/favourites/${context.state.userId}.json?auth=` +
          context.state.token
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch notes.");
          }
          return response.json();
        })
        .then((data) => {
          // context.commit("updateIsLoading", false);
          const notes = [];
          for (let key in data) {
            if (data[key].id === payload.id) {
              return;
            } else {
              const note = {
                id: key,
                title: data[key].title,
                date: data[key].date,
                description: data[key].description,
                content: data[key].content,
                tags: data[key].tags,
              };
              notes.push(note);
            }
          }
          context.commit("addFavourites", notes);
          // console.log(context.state.isLoading);
          console.log(context.state.favourites);
        })
        .catch((error) => {
          console.error("Error fetching notes:", error);
        });
    },

    getNotes(context) {
      // context.commit("updateIsLoading", true);
      console.log(context.state.isLoading);
      console.log("Fetching notes...");
      fetch(
        `https://note-pad-100cc-default-rtdb.firebaseio.com/notes/${context.state.userId}.json?auth=` +
          context.state.token
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch notes.");
          }
          return response.json();
        })
        .then((data) => {
          // context.commit("updateIsLoading", false);
          const notes = [];
          for (let key in data) {
            const note = {
              id: key,
              title: data[key].title,
              date: data[key].date,
              description: data[key].description,
              content: data[key].content,
              tags: data[key].tags,
            };
            notes.push(note);
          }
          context.commit("addToNote", notes);
          // console.log(context.state.isLoading);
          // console.log(notes);
        })
        .catch((error) => {
          console.error("Error fetching notes:", error);
        });
    },

    getNotesForDeleted(context) {
      fetch(
        `https://note-pad-100cc-default-rtdb.firebaseio.com/notes/${context.state.userId}.json?auth=` +
          context.state.token
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch notes.");
          }
          return response.json();
        })
        .then((data) => {
          const notes = [];
          for (let key in data) {
            const note = {
              id: key,
              title: data[key].title,
              date: data[key].date,
              description: data[key].description,
              content: data[key].content,
              tags: data[key].tags,
            };
            notes.push(note);
          }
          context.commit("forDeleted", notes);
          console.log(notes);
        })
        .catch((error) => {
          console.error("Error fetching notes:", error);
        });
    },

    updateContentInDatabase(context, noteId) {
      const noteToUpdate = context.state.notes.find(
        (note) => note.id === noteId
      );

      if (noteToUpdate) {
        // Update content in the database
        fetch(
          `https://note-pad-100cc-default-rtdb.firebaseio.com/notes/${context.state.userId}/${noteId}.json?auth=` +
            context.state.token,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content: context.state.theFilteredNotes.content,
              title: context.state.theFilteredNotes.title,
            }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to update note content.");
            }
            console.log("Note content updated successfully in the database.");
            context.state.isSaved = true;
          })
          .catch((error) => {
            console.error("Error updating note content:", error);
            return;
          });
        // .then(() => {
        //   context.state.isSaved = true;
        // });
      } else {
        console.error("Note not found in store.");
      }
    },

    deleteNote(context, noteId) {
      fetch(
        `https://note-pad-100cc-default-rtdb.firebaseio.com/notes/${context.state.userId}/${noteId}.json?auth=` +
          context.state.token,
        {
          method: "DELETE",
        }
      )
        .then(() => {
          context.dispatch("getNotesForDeleted");
          context.dispatch("sendDeletedToDatabase", noteId);
          context.state.theFilteredNotes = [];
          // console.log(context.state.notes);
        })
        .catch((error) => {
          console.error("Error deleting note:", error);
        });
    },
    //FOR PERMANENT DELETING
    deleteNotePermanently(context, noteId) {
      fetch(
        `https://note-pad-100cc-default-rtdb.firebaseio.com/deleted/${context.state.userId}/${noteId}.json?auth=` +
          context.state.token,
        {
          method: "DELETE",
        }
      )
        .then(() => {
          // context.dispatch("getNotesForDeleted");
          context.dispatch("fetchDeleted");
          // context.dispatch("sendDeletedToDatabase", noteId);
          context.state.theFilteredDeleted = [];
          // console.log(context.state.notes);
        })
        .catch((error) => {
          console.error("Error deleting note:", error);
        });
    },
    ////////////////////////
    fetchDeleted(context) {
      fetch(
        `https://note-pad-100cc-default-rtdb.firebaseio.com/deleted/${context.state.userId}.json?auth=` +
          context.state.token
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch notes.");
          }
          return response.json();
        })
        .then((data) => {
          const notes = [];
          for (let key in data) {
            const note = {
              id: key,
              title: data[key].title,
              date: data[key].date,
              description: data[key].description,
              content: data[key].content,
              tags: data[key].tags,
            };
            notes.push(note);
          }
          context.commit("addToDeleted", notes);
          console.log(notes);
        })
        .catch((error) => {
          console.error("Error fetching notes:", error);
        });
    },

    sendDeletedToDatabase(context, noteId) {
      const noteToDelete = context.state.notes.find(
        (note) => note.id === noteId
      );
      if (noteToDelete) {
        fetch(
          `https://note-pad-100cc-default-rtdb.firebaseio.com/deleted/${context.state.userId}.json?auth=` +
            context.state.token,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(noteToDelete),
          }
        )
          .then(() => {
            context.dispatch("fetchDeleted");
            console.log("Note sent to deleted database.");
          })
          .catch((error) => {
            console.error("Error sending note to deleted database:", error);
          });
      } else {
        console.error("Note not found in store.");
      }
    },
    // filterNotes(context, tag) {
    //   const filteredNotes = context.state.notes.filter((note) =>
    //     note.tags.includes(tag)
    //   );
    //   context.commit("setFilteredNotes", filteredNotes);
    // },
  },
});
window.addEventListener("beforeunload", function (e) {
  // Check if isSaved is false
  if (!store.state.isSaved) {
    // Cancel the event to prevent the browser from closing immediately
    e.preventDefault();
    // Chrome requires the returnValue to be set
    e.returnValue = "";
    // Prompt the user
    return "You have unsaved changes. Are you sure you want to leave?";
  }
});
app.use(store);
app.component("side-bar", sideBar);
app.use(router);
app.mount("#app");
