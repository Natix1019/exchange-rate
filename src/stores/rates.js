import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { NBU_API_BASE, NBU_RATES_PATH } from '../env'

const STORAGE_KEY = 'nbu-edited-rates'

const normalizeRates = (list) => {
	return list.map(item => {
		const cc = String(item.cc || item.ccy || item.code || '').toUpperCase()
		const txt = String(item.txt || item.currency || item.name || '').trim()
		const rawRate = item.rate ?? item.cur ?? item.mid ?? 0
		const rate = Number(rawRate)
		return { cc, txt, rate, date: item.exchangedate || item.date || '' }
	})
}

export const useRatesStore = defineStore('rates', () => {
	const rates = ref([])
	const edited = ref(loadEdited())

	function loadEdited() {
		try {
			return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
		} catch {
			return {}
		}
	}

	const persist = () => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(edited.value))
	}

	const fetchRatesByDate = async (dateStr) => {
		const d = dateStr.replaceAll('-', '')
		const url = `${NBU_API_BASE}${NBU_RATES_PATH}?date=${d}&json`
		const res = await fetch(url)
		const data = await res.json()
		rates.value = normalizeRates(data)
	}

	const fetchRatesForToday = async () => {
		const today = new Date().toISOString().slice(0, 10)
		await fetchRatesByDate(today)
	}

	const computedEffectiveRates = computed(() => {
		return rates.value.map(base => {
			const override = edited.value[base.cc]
			return { ...base, rate: override != null ? Number(override) : base.rate }
		})
	})

	const changedRates = computed(() => {
		return rates.value
			.filter(base => edited.value[base.cc] != null && Number(edited.value[base.cc]) !== Number(base.rate))
			.map(base => ({ ...base, rate: Number(edited.value[base.cc]) }))
	})

	const findRateByCode = (code) => {
		return computedEffectiveRates.value.find(r => r.cc === code)
	}

	const saveEditedRate = (code, newRate) => {
		edited.value[code] = Number(newRate)
		persist()
	}

	return {
		rates,
		edited,
		computedEffectiveRates,
		changedRates,
		fetchRatesForToday,
		fetchRatesByDate,
		findRateByCode,
		saveEditedRate
	}
})

