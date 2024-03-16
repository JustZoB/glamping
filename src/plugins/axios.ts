import axios from 'axios';
import { useToast } from 'vue-toastification';
// import * as process from 'process';

export default (router: any) => {
    const toast = useToast();

    axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
    axios.defaults.withCredentials = false;
    axios.interceptors.request.use(
        (config: any) => {
            if (config) {
                const token = localStorage.getItem('token');
                if (token) {
                    if (config.headers) {
                        config.headers['Authorization'] = `Bearer ${token}`;
                    }
                }
                return config;
            }
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (response) => response,
        async function (error) {
            console.log(error);

            if (error) {
                const response = error.response.data;

                if (response.messages && Object.keys(response.messages).length) {
                    Object.keys(response.messages).forEach((key: string) => {
                        response.messages[key].forEach((message: string) => {
                            toast.error(message);
                        });
                    });
                } else if (response.message) {
                    toast.error(response.message);
                }

                if (error.code == 'ERR_NETWORK') {
                    throw new Error(error.message);
                }
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    localStorage.removeItem('token');
                    await router.push('/login');
                }
            }

            throw error;
        }
    );

    return axios;
};
