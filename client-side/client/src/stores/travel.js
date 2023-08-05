// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
const baseUrl = 'http://localhost:3000'
import axios from "axios";
import firebaseConfig from "../firebaseConfig";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
firebaseConfig;
const providerGithub = new GithubAuthProvider();
const auth = getAuth();

export const useTravelStore = defineStore('travel', {
    state: () => ({
        travel: [],
        favorite: [],
        detailTravel: []
    }),
    actions: {
        logout() {
            localStorage.clear()
            // this.isLogged = false
            this.router.push('/login')
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Thanks for login',
                showConfirmButton: false,
                timer: 1500
            })
        },

        async handleRegister(username, email, password) {
            // console.log(username, '>>>>>>>>>>>>>>>>>>>');
            try {
                const { data } = await axios({
                    method: 'POST',
                    url: `${baseUrl}/register`,
                    data: {
                        username: username,
                        email: email,
                        password: password
                    }
                })
                this.router.push('/login')
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Success register',
                    showConfirmButton: false,
                    timer: 1500
                })
            } catch (err) {
                console.log(err);
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'please register again',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        },

        async handleLogin(email, password) {
            try {
                const { data } = await axios({
                    method: 'POST',
                    url: `${baseUrl}/login`,
                    data: {
                        email: email,
                        password: password
                    }
                })
                localStorage.setItem("access_token", data.token)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Success to login',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.router.push('/')
            } catch (err) {
                console.log(err);
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Please check your input',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        },

        async readTravel() {
            try {
                const { data } = await axios({
                    method: 'GET',
                    url: `${baseUrl}/travels`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    }
                })
                this.travel = data.message.data
            } catch (err) {
                console.log(err);
            }
        },

        async readFavorite() {
            try {
                // console.log('>>>>>');
                const { data } = await axios({
                    method: 'GET',
                    url: `${baseUrl}/favorites`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    }
                })
                this.favorite = data.data
            } catch (err) {
                console.log(err);
            }
        },

        async handleAddFavorite(id, name, image, street, address) {
            try {
                const { data } = await axios({
                    method: 'POST',
                    url: `${baseUrl}/travels/${id}`,
                    data: {
                        name: name,
                        image: image,
                        street: street,
                        address: address
                    },
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    },
                })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Success add',
                    showConfirmButton: false,
                    timer: 1500
                })
            } catch (err) {
                console.log(err);
            }
        },

        async handleDelete(id) {
            // console.log(id, "lwdmwlmd");
            try {
                const { data } = await axios({
                    method: 'DELETE',
                    url: `${baseUrl}/travels/${id}`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    },
                })
                this.readFavorite()
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Success delete',
                    showConfirmButton: false,
                    timer: 1500
                })
            } catch (err) {
                console.log(err);
            }
        },

        async handleEditStatus() {
            try {
                const { data } = await axios({
                    method: 'PATCH',
                    url: `${baseUrl}/subscribe`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    },
                })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Success subkreb',
                    showConfirmButton: false,
                    timer: 1500
                })
            } catch (err) {
                console.log(err);
            }
        },

        async subscribe() {
            try {
                const { data } = await axios({
                    method: 'GET',
                    url: `${baseUrl}/midtrans`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    },
                });
                console.log(data.token);
                const here = this;
                window.snap.pay(data.token, {
                    onSuccess: async function (result) {
                        /* You may add your own implementation here */
                        // alert("payment success!");
                        // console.log(result);
                        const { data } = await axios({
                            method: 'PATCH',
                            url: `${baseUrl}/subscribe`,
                            headers: {
                                access_token: localStorage.getItem("access_token")
                            },
                        })
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Success subkreb',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    },
                    onPending: function (result) {
                        /* You may add your own implementation here */
                        alert("wating your payment!");

                        // console.log(result);
                    },
                    onError: function (result) {
                        /* You may add your own implementation here */
                        alert("payment failed!");
                        // Swal.fire("payment failed (400)");
                        // console.log(result);
                    },
                    onClose: function () {
                        /* You may add your own implementation here */
                        alert("you closed the popup without finishing the payment");
                    },
                });
            } catch (err) {
                console.log(err);
            }
        },

        async handleGithub() {
            try {
                const result = await signInWithPopup(auth, providerGithub);
                const credential = GithubAuthProvider.credentialFromResult(result);
                const user = result.user;
                const email = user.email;
                const displayName = user.displayName;
                const { data } = await axios({
                    method: 'POST',
                    url: `${baseUrl}/githubLogin`,
                    data: { email, displayName }
                })
                // console.log(data.token);
                localStorage.setItem("access_token", data.token)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Success to login',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.router.push('/')
            } catch (err) {
                console.log(err);
            }
        }
    }
})
