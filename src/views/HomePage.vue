<template>
	<div class="page">
		<h1>NBU exchange rates — Today</h1>
		{{ rates  }}
		<CurrencyTable :items="store.computedEffectiveRates" @edit="goEdit" />
	</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRatesStore } from '../stores/rates'
import CurrencyTable from '../components/CurrencyTable.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useRatesStore()

onMounted(() => store.fetchRatesForToday())

const goEdit = (cc) => 
	router.push({ name: 'edit', params: { cc } })
</script>

<style scoped>
.page { padding: 16px; }
</style>

