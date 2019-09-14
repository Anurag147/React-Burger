import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-burger-project-22994.firebaseio.com/"
});

export default instance;