import axios from 'axios';

export default axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    'Accept':'application/json',
    'Content-Type':'multipart/form-data',
}
})