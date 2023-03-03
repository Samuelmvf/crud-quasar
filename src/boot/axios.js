import axios from "axios"

export const mirageApi = axios.create({
  baseURL: process.env.MIRAGE_API
});