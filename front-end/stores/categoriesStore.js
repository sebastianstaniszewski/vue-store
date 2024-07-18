import {defineStore} from "pinia";
import axios from "axios";

export const useCategoriesStore = defineStore('categories', {
    state: () => ({
        categories: []
    }),
    actions: {
        async fetchCategories() {
            try {
                const res = await axios.get('/api/categories');
                if (!res.data || !Array.isArray(res.data)) {
                    throw new Error('Invalid server response');
                }
                this.categories = res.data;

            } catch(err) {
                console.error('Error:', err.message);
            }
        }
    },
})