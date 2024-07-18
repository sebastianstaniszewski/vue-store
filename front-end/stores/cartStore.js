import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "./userStore";

const CART_STORAGE_KEY = 'cart';
const CHECKOUT_STORAGE_KEY = 'checkoutState';

export const useCartStore = defineStore('cart', {
    state: () => {
        return {
            cart: [],
            checkoutState: [],
        };
    },

    getters: {
        getTotalPrice: (state) => {
            const items = state.cart;
            if (!Array.isArray(items)) return "0.00";
            const totalPrice = items.reduce((sum, product) => sum + product.price * product.amount, 0);
            return totalPrice.toFixed(2);
        },

        getTotalCart: (state) => {
            return state.cart.reduce((sum, product) => sum + product.amount, 0);
        },

        getCheckoutTotalPrice: (state) => {
            const items = state.checkoutState;
            if (!Array.isArray(items)) return "0.00";
            const totalPrice = items.reduce((sum, product) => sum + product.price * product.amount, 0);
            return totalPrice.toFixed(2);
        },
    },

    actions: {
        async getUserId() {
            const userStore = useUserStore();
            if (!userStore.user) {
                await userStore.fetchUser();
            }
            if (userStore.user) {
                return userStore.user.uid;
            }
            throw new Error("User is not authenticated");
        },

        saveCartToLocalStorage() {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart));
        },

        loadCartFromLocalStorage() {
            const storedCart = localStorage.getItem(CART_STORAGE_KEY);
            if (storedCart) {
                try {
                    this.cart = JSON.parse(storedCart);
                } catch (error) {
                    console.error('Error parsing stored cart:', error.message);
                }
            }
        },

        saveCheckoutToLocalStorage() {
            localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(this.checkoutState));
        },

        loadCheckoutFromLocalStorage() {
            const storedCheckoutState = localStorage.getItem(CHECKOUT_STORAGE_KEY);
            if (storedCheckoutState) {
                try {
                    this.checkoutState = JSON.parse(storedCheckoutState);
                } catch (error) {
                    console.error('Error parsing stored checkout state:', error.message);
                }
            }
        },

        clearLocalStorage() {
            localStorage.removeItem(CART_STORAGE_KEY);
            localStorage.removeItem(CHECKOUT_STORAGE_KEY);
        },

        async fetchCart() {
            const userId = await this.getUserId();

            if (!userId) {
                console.error('Invalid user ID');
                return;
            }

            try {
                const res = await axios.get(`/api/users/${userId}/cart`);

                if (!res.data || !Array.isArray(res.data)) {
                    throw new Error('Invalid server response');
                }
                this.cart = res.data;
                this.saveCartToLocalStorage();
            } catch (err) {
                console.error('Error:', err.message);
            }
        },

        async addToCart(productId) {
            const userId = await this.getUserId();

            if (typeof productId !== 'string' || productId.trim() === '') {
                console.error('Invalid ID');
                return;
            }

            try {
                const product = this.cart.find(item => item.id === productId);
                if (product) {
                    product.amount++;
                } else {
                    this.cart.push({ id: productId, amount: 1 });
                }
                await axios.post(`/api/users/${userId}/cart`, { id: productId });
                this.saveCartToLocalStorage();
            } catch (error) {
                console.error('Error:', error.message);
            }
        },

        async removeFromCart(productId) {
            const userId = await this.getUserId();

            if (typeof productId !== 'string' || productId.trim() === '') {
                console.error('Invalid product ID');
                return;
            }
            try {
                const productIndex = this.cart.findIndex(item => item.id === productId);
                if (productIndex !== -1) {
                    this.cart.splice(productIndex, 1);
                }
                await axios.delete(`/api/users/${userId}/cart/${productId}`);
                this.saveCartToLocalStorage();
            } catch (error) {
                console.error('Error:', error.message);
            }
        },

        async updateStock() {
            try {
                const updates = this.cart.map(product => {
                    if (typeof product.id !== 'string' || product.id.trim() === '') {
                        throw new Error('Invalid product ID');
                    }
                    return axios.post(`/api/products/${product.id}`, { stock: product.stock - product.amount });
                });
                await Promise.all(updates);
            } catch (error) {
                console.error('Error:', error.message);
            }
        },

        async flushCart() {
            const userId = await this.getUserId();

            try {
                await axios.delete(`/api/users/${userId}/cart`);
                this.cart = [];
                this.saveCartToLocalStorage();
            } catch (error) {
                console.error('Error:', error.message);
            }
        },

        async cartSummary() {
            this.checkoutState = [...this.cart];
            this.saveCheckoutToLocalStorage();
        },

        async updateProductAmount(productId, amount) {
            const userId = await this.getUserId();

            if (typeof productId !== 'string' || productId.trim() === '') {
                console.error('Invalid ID');
                return;
            }

            try {
                const product = this.cart.find(item => item.id === productId);
                if (product) {
                    product.amount = amount;
                }
                await axios.put(`/api/users/${userId}/cart/${productId}`, { amount });
                this.saveCartToLocalStorage();
            } catch (error) {
                console.error('Error:', error.message);
            }
        },
    },
});
