<template>
  <main>
    <fulfilling-square-spinner
      :animation-duration="1500"
      :size="50"
      color="#ffffff"
      v-if="isLoading"
    />
    <div class="container" v-if="!isLoading">
      <div class="form-container">
        <h1>Log in</h1>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <div class="action-buttons">
            <div class="signup">
              <button type="submit">Login</button>
            </div>
            <div class="login">
              <router-link to="/signup">or Signup</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { FulfillingSquareSpinner } from "epic-spinners";
export default {
  components: {
    FulfillingSquareSpinner,
  },
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
    };
  },
  methods: {
    async login() {
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      try {
        await this.$store.dispatch("Login", {
          email: this.email,
          password: this.password,
        });
        this.$router.replace("/allnotes");
        this.$store.dispatch("fetch");
        this.$store.dispatch("fetchDeleted");
      } catch (error) {
        console.error(error);
      }
      this.isLoading = false;
    },
  },
};
</script>
<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
body {
  background: rgba(0, 0, 0, 0.5);
}
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
h1 {
  color: white;
}
.container {
  width: 100%;
  max-width: 400px;
  padding: 1rem;
}

.form-container {
  background-color: var(--dark);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  /* font-weight: bold; */
  color: white;
}

input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid rgb(78, 78, 78);
  border-radius: 5px;
  background: none;
  color: white;
}
input:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(107, 23, 254, 0.5);
}
.action-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.signup {
  width: 47%;
  background: var(--dark-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: pointer;
  border-radius: 15px;
  color: white;
}
.login {
  width: 47%;
  background: #5c5b63;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 15px;
  color: white;
}
.login a {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
}
button {
  color: white;
}
</style>
