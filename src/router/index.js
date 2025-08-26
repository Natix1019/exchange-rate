import { createRouter, createWebHashHistory } from 'vue-router'

const HomePage = () => import('../views/HomePage.vue')
const SearchPage = () => import('../views/SearchPage.vue')
const ChangedPage = () => import('../views/ChangedPage.vue')
const EditCurrencyPage = () => import('../views/EditCurrencyPage.vue')

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{ path: '/', name: 'home', component: HomePage },
		{ path: '/search', name: 'search', component: SearchPage },
		{ path: '/changed', name: 'changed', component: ChangedPage },
		{ path: '/edit/:cc', name: 'edit', component: EditCurrencyPage, props: true }
	]
})

export default router

