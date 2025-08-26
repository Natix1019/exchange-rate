<template>
	<div class="page">
		<h1>Search rates by date</h1>
		<label>
			Date:
			<input type="date" v-model="date" />
		</label>
		<button @click="search">Load</button>
		<button @click="today">Today</button>
		<CurrencyTable :items="ratesStore.computedEffectiveRates" @edit="goEdit" />
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRatesStore } from '../stores/rates'
import CurrencyTable from '../components/CurrencyTable.vue'
import { useRouter } from 'vue-router'

const ratesStore = useRatesStore()
const router = useRouter()
const date = ref('')

const search = () => {
	if (!date.value) return
	ratesStore.fetchRatesByDate(date.value)
}

const today = () => {
	const t = new Date().toISOString().slice(0, 10)
	date.value = t
	ratesStore.fetchRatesByDate(t)
}

onMounted(() => today())

const goEdit = (cc) => router.push({ name: 'edit', params: { cc } })

</script>

<style scoped>
.page { padding: 16px; }
label { margin-right: 8px; }
button { margin-left: 8px; }
</style>

