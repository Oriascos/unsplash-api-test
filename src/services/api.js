import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.unsplash.com/photos' 

});

export default api;