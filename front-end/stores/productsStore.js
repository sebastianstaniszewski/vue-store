import {defineStore} from "pinia";
import axios from "axios";


export const useProductsStore = defineStore('products', {
    state: () => {
        return {
            products: [],
            actualProduct: [],
        }
    },

    actions: {
        async fetchProducts() {
            try {
                const res = await axios.get('/products');
                if (!res.data || !Array.isArray(res.data)) {
                    throw new Error('Invalid server response');
                }
                this.products = res.data;
            } catch(err) {
                console.error('Error:', err.message);
            }
        },

        async fetchCategoryProducts(category) {
            if (typeof category !== 'string' || category.trim() === '') {
                console.error('Invalid category name');
                return;
            }
            try {
                const res = await axios.get(`/api/categories/${category}/products`);
                if (!res.data || !Array.isArray(res.data)) {
                    throw new Error('Invalid server response');
                }
                this.products = res.data;
            } catch(err) {
                console.error('Error:', err.message);
            }
        },

        async getActualProduct(productID) {
            if (typeof productID !== 'string' || productID.trim() === '') {
                console.error('Invalid product ID');
                return;
            }
            try {
                const res = await axios.get(`/api/products/${productID}`);
                this.actualProduct = res.data;
            } catch(err) {
                console.error(err);
            }
        }
    },
})