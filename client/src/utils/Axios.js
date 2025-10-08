import axios from 'axios';
import {baseURL} from '../Common/SummaryAPI.js'

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials  : true
});

export default Axios;
