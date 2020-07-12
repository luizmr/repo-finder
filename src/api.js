// yarn add axios

import axios from 'axios';

// cria um axios com uma url de base que será usada para fazer as requisiçoes da api
const api = axios.create({
	baseURL: 'https://api.github.com',
});

export default api;
