<script setup>
import { reactive, onMounted } from 'vue';
import { useAuthStore } from '@/stores/user';
import { updateUser } from '@/api/usersAPI';
import { useRouter } from "vue-router";
import Button from '@/components/Button.vue';

const router = useRouter();
const authStore = useAuthStore();

const userData = reactive({
  userName: '',
  profileImg: '',
});

const updateProfile = async () => {
  try {
    // await updateUser(userData.id, userData);
    // authStore.authUser = { ...userData };
    alert('Profile updated successfully!');
    router.push('/profile');
  } catch (error) {
    console.error('Update failed:', error);
    alert('Failed to update profile.');
  }
};

onMounted(() => {
  
});
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow-lg border border-gray-200 rounded-2xl mt-[3%] ">
    <h2 class="text-3xl font-semibold text-center mb-4">Update Profile</h2>
    <form @submit.prevent="updateProfile" class="space-y-4 mb-[5%]">
      <div class="flex justify-center">
        <img :src="userData.profileImg || 'https://img.myloview.com/posters/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg'" 
          class="size-30 rounded-full border-2 border-black"  
          alt="">
      </div>

      <div>
        <label class="block text-2sm font-medium">Profile Picture URL:</label>
        <input v-model="userData.profileImg" type="text" class="w-full px-3 py-2 border rounded-lg" />
      </div>

      <div>
        <label class="block text-2sm font-medium">Email:</label>
        <input v-model="userData.email" type="text" disabled class="w-full px-3 py-2 border rounded-lg" />
      </div>

      <div>
        <label class="block text-2sm font-medium">Username:</label>
        <input v-model="userData.userName" type="text" required class="w-full px-3 py-2 border rounded-lg" />
      </div>

      <div class="mt-2 text-center">
        <Button type="submit" :label="'Delete'">
          Update Profile
        </Button>
      </div>
    </form>
  </div>
</template>
