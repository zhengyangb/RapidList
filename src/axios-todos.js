import axios from 'axios';

const instance = axios.create({
    baseURL: "https://rapid-list.firebaseio.com/",
});

export default instance;