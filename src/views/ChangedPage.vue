<template>
	<div class="page">
		<h1>Changed rates</h1>
		<CurrencyTable :items="changed" @edit="goEdit" />
	</div>
</template>

<script setup>
import CurrencyTable from '../components/CurrencyTable.vue'
import { useRatesStore } from '../stores/rates'
import { useRouter } from 'vue-router'

const store = useRatesStore()
const router = useRouter()
const changed = store.changedRates

const goEdit = (cc) => 
	router.push({ name: 'edit', params: { cc } })	
</script>

<style scoped>
.page { padding: 16px; }
</style>

