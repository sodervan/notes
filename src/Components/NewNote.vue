<template>
  <div class="backdrop" @click="closeModal"></div>
  <div class="modal">
    <div class="tag-head">
      <div class="tag-head-left">
        <div class="add-tag-text">
          <p>Add Tags:</p>
        </div>
        <div
          class="the-tags"
          @mouseenter="toggleTagHovered"
          @mouseleave="toggleTagHovered"
        >
          <div
            v-for="tags in theTags"
            :key="tags[0]"
            class="tag-box"
            @click="addTags(tags)"
          >
            <div>
              <p ref="tag" class="tags">{{ tags }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="tag-head-right">
        <div class="create-tag">
          <p>+</p>
        </div>
      </div>
    </div>

    <div class="new-note-header">
      <div class="title">
        <h1>Add new note</h1>
      </div>
      <div class="close-btn" @click="closeModal">
        <button>X</button>
      </div>
    </div>
    <form @submit.prevent="pushNote">
      <div>
        <div>
          <div>
            <label for="title">Title</label>
            <input type="text" name="title" id="title" v-model="title" />
          </div>
          <div>
            <label for="date">Date/Time</label>
            <!-- <input type="text" name="date" id="date" :value="date" disabled /> -->
            <input type="text" name="time" id="time" :value="date" disabled />
          </div>
        </div>
        <div>
          <label for="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows="5"
            placeholder="Describe your note"
            v-model="description"
          ></textarea>
        </div>
        <div class="bottom">
          <div>
            <button class="add-note">Add note</button>
          </div>
          <div class="error-message" v-if="error">
            <p>MAKE SURE ALL FIELDS ARE FILLED</p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<!---------------SCRIPT--------------->

<script>
export default {
  data() {
    return {
      theTags: ["school", "work", "study", "sleep", "workout"],
      error: false,
      title: "",
      // date: this.formatDate(new Date()),
      date: this.formatDateTime(new Date()),
      description: "",
      tags: [],
      tagHovered: false,
    };
  },
  methods: {
    toggleTagHovered() {
      this.tagHovered = !this.tagHovered;
    },
    formatDateTime(date) {
      const options = {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      const timeString = date.toLocaleTimeString("en-US", options);
      const dateString = date.toDateString(); // Format the date part as needed
      return `${dateString} (${timeString})`;
    },

    //DATE FORMATING

    // formatDate(date) {
    //   const options = {
    //     weekday: "short",
    //     day: "2-digit",
    //     month: "short",
    //     year: "numeric",
    //   };
    //   return date.toLocaleDateString("en-US", options);
    // },
    closeModal() {
      this.$store.commit("toggleModal");
    },
    addTags(value) {
      console.log(value);
      this.tags.push(value);
    },
    pushNote() {
      if (this.title.length > 0 && this.description.length > 0) {
        this.$store.dispatch("fetch", {
          title: this.title,
          date: this.date,
          description: this.description,
          tags: this.tags,
          content: "",
        });
        this.$store.dispatch("getNotes");
        // console.log(this.$store.state.notes);
        this.$store.commit("toggleModal");
      } else {
        this.error = true;
      }
    },
  },
};
</script>

<!---------------STYLE--------------->

<style scoped>
* {
  font-family: "Poppins", sans-serif;
  box-sizing: border-box;
  color: white;
}
.create-tag {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #272b2c;
  cursor: pointer;
}
.add-tag-text {
  margin-right: 10px;
}
.tag-head {
  display: flex;
  width: 100%;
  border: 1px solid rgb(78, 78, 78);
  padding: 10px;
  border-radius: 30px;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
}
.tag-head-left {
  display: flex;
}
.the-tags {
  display: flex;
}
.error-message p {
  color: red;
  font-size: 1rem;
}
.tag-box {
  background: #3c3c63;
  padding: 5px 7px;
  border-radius: 8px;
  margin-right: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tag-box .tags {
  font-size: 0.7rem;
  color: #9f99e2;
  margin-right: 5px;
}
.add-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  padding: 10px;
  height: 15px;
  border-radius: 50%;
  background: #272b2c;
  transition: 2s ease-out;
  /* transform: rotateX('angle'); */
}
.add-button p {
  font-size: 0.7rem;
}
.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
input {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  border: 1px solid rgb(78, 78, 78);
  background: none;
  color: white;
}

textarea {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  /* border: 1px solid var(--grey); */
  border: 1px solid rgb(78, 78, 78);
  background: none;
  color: white;
}
input:focus,
textarea:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(107, 23, 254, 0.5);
}
.close-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #272b2c;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.close-btn button {
  color: white;
  font-size: 0.7rem;
  font-family: "Poppins", sans-serif;
}
.new-note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title h1 {
  font-size: 1.5rem;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
}
.modal {
  background: #313036;
  width: 45%;
  /* max-width: 400px; Optional: Set a maximum width */
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 101;
}
.backdrop {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
}
.add-note {
  background: #6b17fe;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
</style>
