import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:2004",
});

export default instance;
