import axios from "axios";

export const tmbdbApi = axios.create({
  baseURL: "/api",
  params: {
    language: "es",
  },
});
