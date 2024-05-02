<template>
  <div class="backdrop"></div>
  <div class="box">
    <div class="box-content">
      <p>This note will be gone forever, are you sure you want to delete it?</p>
    </div>
    <div class="box-footer">
      <button @click="closeModal" class="cancel">Cancel</button>
      <button @click="deleteNote" class="delete">Delete</button>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
.box {
  background: var(--dark);
  width: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 101;
  /* padding: 2px; */
}
.box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--dark);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.box-header h1 {
  color: var(--light);
}
.box-header button {
  background: none;
  border: none;
  color: var(--light);
  cursor: pointer;
}
.box-content {
  padding: 1rem;
}
.box-content p {
  color: var(--light);
  font-size: 1rem;
  font-weight: 200;
  font-family: "Poppins", sans-serif;
}
.box-footer {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  /* background: var(--dark); */
  /* border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px; */
}
.cancel {
  padding: 1.5rem;
  width: 47%;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  /* margin-left: 5px; */
  /* background: var(--dark); */
  background: #5c5b63;
  color: var(--light);
}
.delete {
  padding: 1.5rem;
  width: 47%;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  /* margin-right: 5px; */
  background: var(--dark-alt);
  color: var(--light);
}
</style>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    deleteNote() {
      this.$emit("delete-note");
      this.closeModal();
    },
  },
};
</script>
