import axios from 'axios';
import { AsyncStorage } from 'react-native';

const baseUrl = "https://sihelty.exaditama.id/jastip"
const auth = await AsyncStorage.getItem("auth");

const api = axios.create({
    baseURL : baseUrl,
    headers : {
        Authentication : auth
    }
})

export default api;