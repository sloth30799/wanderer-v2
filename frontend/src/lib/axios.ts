import axios from "axios"

const api = axios.create({
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
})

export { api }
