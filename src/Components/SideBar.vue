<template>
  <aside :class="`${isExpanded && 'is-expanded'}`">
    <div class="the-head">
      <div class="logo">
        <h1>N.X</h1>
      </div>
      <div class="menu-toggle-wrap">
        <button class="menu-toggle" @click="ToggleMenu">
          <span class="material-symbols-outlined"
            >keyboard_double_arrow_right</span
          >
        </button>
      </div>
    </div>

    <!-- <h3>Menu</h3> -->
    <div class="menu">
      <router-link class="button" to="/allnotes">
        <i class="fi fi-rr-note"></i>
        <span class="text"
          >All Notes
          <span class="number-of-content" v-if="isExpanded">{{
            this.$store.state.notes.length
          }}</span></span
        >
      </router-link>

      <router-link class="button" to="/mynotes">
        <i class="fi fi-rr-note"></i>
        <span class="text"
          >Slides
          <span class="number-of-content" v-if="isExpanded">0</span></span
        >
      </router-link>

      <router-link class="button" to="/todolist">
        <i class="fi fi-rr-check"></i>
        <span class="text"
          >To-do List
          <span class="number-of-content" v-if="isExpanded">0</span></span
        >
      </router-link>
      <router-link class="button" to="/projects">
        <i class="fi fi-rr-workflow"></i>
        <span class="text"
          >Projects
          <span class="number-of-content" v-if="isExpanded">0</span></span
        >
      </router-link>

      <router-link class="button" to="/favourites">
        <i class="fi fi-rr-star"></i>
        <span class="text"
          >Favourites
          <span class="number-of-content" v-if="isExpanded">{{
            this.$store.state.favourites.length
          }}</span></span
        >
      </router-link>

      <router-link class="button" to="/recentlydeleted">
        <i class="fi fi-rr-trash-xmark"></i>
        <span class="text"
          >Recently Deleted
          <span class="number-of-content" v-if="isExpanded">{{
            this.$store.state.recentlyDeletedNotes.length
          }}</span></span
        >
      </router-link>

      <router-link class="button new-list" to="/newlist">
        <span class="text">+ New List</span>
      </router-link>
    </div>

    <div class="flex"></div>

    <div class="menu settings">
      <div class="button" @click="logout">
        <i class="fi fi-rr-gears"></i>
        <span class="text">Logout</span>
      </div>
      <!-- <div>
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
      </div> -->
    </div>
  </aside>
</template>

<!-------------SCRIPT-------------->

<script>
export default {
  data() {
    return {
      isExpanded: true,
    };
  },
  methods: {
    ToggleMenu() {
      this.isExpanded = !this.isExpanded;
    },
    logout() {
      this.$store.state.logout = true;
      // this.$store.dispatch("logout");
    },
  },
};
</script>

<!-------------STYLE-------------->

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}
aside {
  display: flex;
  flex-direction: column;
  width: calc(2rem + 32px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;

  background-color: var(--dark);
  color: var(--light);

  transition: 0.2s ease-out;

  .flex {
    flex: 1 1 0;
  }
  .button {
    cursor: pointer;
  }
  .logo {
    margin-bottom: 1rem;

    h1 {
      width: 2rem;
      font-family: "Poppins", sans-serif;
    }
  }
  .menu-toggle-wrap {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 0;
    position: relative;
    top: 0;
    transition: 0.2s ease-out;

    .menu-toggle {
      transition: 0.2s ease-out;
      background: none;
      border: none;

      .material-symbols-outlined {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-symbols-outlined {
          color: var(--dark-alt);
          transform: translateX(0.5rem);
          cursor: pointer;
        }
      }
    }
  }
  h3,
  .button .text {
    opacity: 0;
    transition: 0.3 ease-out;
  }
  .settings {
    display: flex;
    align-items: center;
    justify-content: space-between;

    input:checked + .slider {
      background-color: #2196f3;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px #2196f3;
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }
      .slider.round {
        border-radius: 34px;
      }

      .slider.round:before {
        border-radius: 50%;
      }
    }

    /* Hide default HTML checkbox */
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  }
  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      padding: 0.8rem 1rem;
      transition: 0.2s ease-out;
      width: 95%;
      margin: auto;
      border-radius: 9px;

      i {
        font-size: 1rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      .text {
        color: var(--light);
        transition: 0.2s ease-out;
        font-size: 0.85rem;
        font-family: "Poppins", sans-serif;
      }
      &:hover {
        background-color: var(--primary);
      }
      &.router-link-exact-active {
        background-color: var(--dark-alt);

        .number-of-content {
          background: white;
          color: var(--dark-alt);
        }

        i,
        .text {
          color: var(--light);
        }
      }
      // &.router-link-exact-active {
      //   border-right: 5px solid var(--primary);
      // }
    }
  }

  &.is-expanded {
    width: 280px;

    .menu-toggle-wrap {
      top: -3rem;
      .menu-toggle {
        transform: rotate(-180deg);
      }
    }
    h3,
    .button .text {
      opacity: 1;
    }
    .button .number-of-content {
      background: var(--dark-purple);
      padding: 5px;
      border-radius: 5px;
      font-size: 10px;
      margin-left: 5px;
    }
    h3 {
      color: var(--grey);
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
    }
    .button {
      i {
        margin-right: 1rem;
      }
    }
  }
  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
}
</style>
