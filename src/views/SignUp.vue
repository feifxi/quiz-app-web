<script setup>
import Button from '@/components/Button.vue';
import { reactive } from 'vue';

const API_ROOT = import.meta.env.VITE_API_ROOT

const userData = reactive({
  email: '',
  userName: '',
  password: '',
})

const signUp = async (e) => {
  try {
    e.preventDefault()
    if (!userData.email || !userData.userName || !userData.password) {
      return alert('fill all input')
    }

    const res = await fetch(`${API_ROOT}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (res.ok) {
      alert('Create Account Success!')
    }
    console.log(await res.json())

  } catch (error) {
    console.log(error);
    alert('Something went wrong...')
  }
 
}
</script>

<template>
  <section class="max-w-xl mx-auto bg-white p-3 mt-5 rounded-xl shadow">
    <h1 class="text-3xl font-bold text-center">Sign Up</h1>
    <div class="max-w-3xl p-3">
      <form @submit="signUp" class="flex flex-col gap-3">
        <div class="flex flex-col">
          <label class="text-gray-900 font-bold">User Name</label>
          <input type="text" class="input" v-model="userData.userName" />
        </div>

        <div class="flex flex-col">
          <label class="text-gray-900 font-bold">Email</label>
          <input type="text" class="input" v-model="userData.email" />
        </div>

        <div class="flex flex-col">
          <label class="text-gray-900 font-bold">Password</label>
          <input type="password" class="input" v-model="userData.password" />
        </div>

        <Button :click="signUp">Create Account</Button>
      </form>
    </div>
  </section>
</template>

<style scoped></style>