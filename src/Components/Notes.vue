<template>
  <main>
    <div class="loader" v-if="this.$store.state.isLoading === true">
      <hollow-dots-spinner
        :animation-duration="1000"
        :dot-size="15"
        :dots-num="3"
        color="#ff1d5e"
      />
      <!-- <radar-spinner :animation-duration="2000" :size="60" color="#ffffff" /> -->
      <!-- <p>Loading...</p> -->
    </div>
    <div :class="[{ notes: !isActive }, { active: isActive }]" v-else>
      <div class="notes-head">
        <div class="notes-date">
          <p class="date">{{ theNotes.date }}</p>
          <p class="time">{{ theNotes.time }}</p>
        </div>
        <div class="more-options">...</div>
      </div>
      <div class="real-content-details" @click="toggleActive(theNotes.id)">
        <h3 class="note-title">{{ theNotes.title }}</h3>
        <p class="note-content">{{ theNotes.description }}</p>
        <div class="the-tags">
          <div v-for="tags in theNotes.tags" :key="tags[0]" class="tag-box">
            <p class="tags">{{ tags }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<!----------SCRIPT------------->

<script>
// import { RadarSpinner } from "epic-spinners";
import { HollowDotsSpinner } from "epic-spinners";

export default {
  props: ["theNotes"],
  components: {
    // RadarSpinner,
    HollowDotsSpinner,
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleActive(id) {
      this.isActive = !this.isActive;
      this.$emit("filteredNote", id);
    },
  },
};
</script>

<!----------STYLE------------->

<style scoped>
* {
  box-sizing: border-box;
}
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader p {
  color: white;
  font-size: 2rem;
}
/* main {
  padding: 2rem;
} */
.real-content-details {
  cursor: pointer;
}
.notes-date {
  display: flex;
  justify-content: space-between;
}
.date,
.time {
  font-size: 12px;
  color: var(--grey);
}
.note-title {
  font-size: 1rem;
  color: white;
  font-weight: 500;
  margin: 10px 0;
}
.note-content {
  font-size: 0.9rem;
  color: var(--grey-text);
  margin-bottom: 10px;
}
.active {
  border: 1px solid var(--dark-alt);
  border-radius: 10px;
  background: none;
  padding: 12px;
  margin: 8px 0;
}
.notes {
  background: var(--dark);
  border-radius: 10px;
  padding: 12px;
  margin: 8px 0;
}
.notes-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tag-box {
  background: #3c3c63;
  padding: 5px 7px;
  border-radius: 8px;
  margin-right: 5px;
}
.tag-box p {
  font-size: 0.7rem;
  color: #9f99e2;
}
.the-tags {
  display: flex;
}
</style>
