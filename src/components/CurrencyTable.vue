<template>
	<div class="card">
		<div class="toolbar">
			<input v-model="query" placeholder="Search by name or code" />
		</div>
		<table class="table">
			<thead>
				<tr>
					<th>Code</th>
					<th>Name</th>
					<th>Rate</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="row in paged" :key="row.cc">
					<td>{{ row.cc }}</td>
					<td>{{ row.txt }}</td>
					<td>{{ row.rate }}</td>
					<td><button @click="$emit('edit', row.cc)">Edit</button></td>
				</tr>
			</tbody>
		</table>
		<div class="pagination">
			<button :disabled="isAtFirstPage" @click="prevPage">Prev</button>
			<span>{{ page }} / {{ totalPages }}</span>
			<button :disabled="isAtLastPage" @click="nextPage">Next</button>
		</div>
	</div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({ items: { type: Array, required: true } })
const emit = defineEmits(['edit'])

const query = ref('')
const page = ref(1)
const pageSize = 10

const filtered = computed(() => {
	const q = query.value.trim().toLowerCase()
	const src = Array.isArray(props.items) ? props.items : []
	if (!q) return src
	return src.filter(item => {
		const name = String(item?.txt ?? '').toLowerCase()
		const code = String(item?.cc ?? '').toLowerCase()
		return name.includes(q) || code.includes(q)
	})
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const paged = computed(() => {
	const start = (page.value - 1) * pageSize
	return filtered.value.slice(start, start + pageSize)
})

watch([filtered], () => { page.value = 1 })

const isAtFirstPage = computed(() => page.value <= 1)
const isAtLastPage = computed(() => page.value >= totalPages.value)

function prevPage() {
	if (isAtFirstPage.value) return
	page.value -= 1
}

function nextPage() {
	if (isAtLastPage.value) return
	page.value += 1
}
</script>

<style scoped>
.toolbar { margin-bottom: 12px; }
input { width: 100%; max-width: 420px; }
.table { width: 100%; }
.pagination { display: flex; gap: 12px; align-items: center; margin-top: 12px; }
.pagination button:disabled { opacity: .5; cursor: not-allowed; }
</style>

