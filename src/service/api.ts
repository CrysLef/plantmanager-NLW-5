import axios from 'axios';

const api = axios.create({
    baseURL: 'https://my-json-server.typicode.com/CrysLef/plantmanager-NLW-5'
})

export default api;