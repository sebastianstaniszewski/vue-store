import {defineStore} from "pinia";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: null,
        }
    },

    actions: {
        async fetchUser() {
            const auth = getAuth();
            return new Promise((resolve, reject) => {
                onAuthStateChanged(auth, user => {
                    if (user) {
                        this.user = user;
                    } else {
                        this.user = null;
                    }
                }, reject);
            });
        }
    }
})