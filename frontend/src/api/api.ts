import axios from 'axios';
import { environment } from 'src/environments/environment';

const api = axios.create({
  baseURL: environment.api_url
})

export default api;