<template>
	<div class="page" v-if="item">
		<h1>Edit: {{ item.cc }} — {{ item.txt }}</h1>
		<label>Rate: <input type="number" step="0.0001" v-model.number="rate" /></label>
		<button @click="save">Save</button>
	</div>
	<div v-else class="page">Currency not found.</div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRatesStore } from '../stores/rates'

const route = useRoute()
const router = useRouter()
const store = useRatesStore()

const cc = route.params.cc
const item = computed(() => store.findRateByCode(String(cc)))
const rate = ref(item.value?.rate ?? 0)

const save = () => {
	if (!item.value) return
	store.saveEditedRate(item.value.cc, rate.value)
	router.push({ name: 'changed' })
}
</script>

<style scoped>
.page { padding: 16px; display: grid; gap: 12px; }
input { padding: 6px 10px; }
button { padding: 8px 12px; }
</style>

