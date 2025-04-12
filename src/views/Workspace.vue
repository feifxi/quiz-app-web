<script setup>
import QuizCard from '@/components/QuizCard.vue';
import Button from '@/components/Button.vue';
import { getAllQuizs, getQuizById } from '@/api/quizsAPI';
import { useAuthStore } from '@/stores/user';
import { ref, onMounted, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const quizs = ref([])
const isLoading = ref(false)
const selectedTab = ref('workspace')
const isAdmin = authStore.authUser.role === 'admin'

const fetchQuizs = async () => {
  isLoading.value = true;
  const res = isAdmin 
    ? await getAllQuizs([{ key: 'status', value: 'publish' }]) 
    : await getAllQuizs([{ key: 'id', value: authStore.authUser.id }]);
  quizs.value = res.data
  isLoading.value = false;
}

const fetchPendingQuizs = async () => {
  isLoading.value = true;
  const res = await getAllQuizs([{ key: 'status', value: 'pending' }]);
  quizs.value = res.data
  isLoading.value = false;
}


onMounted(async () => {
  // navigate to selected tab
  const { tab } = route.query
  if (!tab || tab === 'workspace') {
    selectedTab.value = 'workspace'
  } else if (tab === 'admin-review') {
    selectedTab.value = 'admin-review'
  }

  // Fetch Quizs
  await fetchQuizs()
});

watch(selectedTab, async () => {
  if (selectedTab.value === 'workspace') {
    await fetchQuizs()
    router.push({ name: 'workspace', query: { tab: "workspace" } })
  }
  else if (selectedTab.value === 'admin-review') {
   await fetchPendingQuizs()
   router.push({ name: 'workspace', query: { tab: "admin-review" } })
  }
})

</script>

<template>
  <section v-if="isLoading">
    Loading...
  </section>

  <section v-else>
    <div class="flex gap-3 text-3xl font-bold py-3 px-6 bg-white shadow">
      <button 
        :class="['cursor-pointer', { 'border-green-500 border-b-3 text-green-600' : selectedTab === 'workspace' && isAdmin}]"
        @click="selectedTab = 'workspace'">
        WorkSpace
      </button>
      <button v-if="isAdmin" 
        :class="['cursor-pointer', { 'border-green-500 border-b-3 text-green-600' : selectedTab === 'admin-review' && isAdmin}]"
        @click="selectedTab = 'admin-review'">
        AdminReview
      </button>

      <RouterLink to="/create" class="ml-auto">
        <Button>
          Create
        </Button>
      </RouterLink>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-3">
      <QuizCard v-for="quiz of quizs" 
        :quiz="quiz" 
        :is-edit-mode="true"
        :is-admin="isAdmin && selectedTab === 'admin-review'"  
      />
    </div>

    <!-- No Quiz -->
    <div v-if="quizs.length === 0" class="text-3xl font-bold text-neutral-400 text-center mt-10">
      There is no quizs
    </div>
  </section>
</template>
<style scoped></style>
