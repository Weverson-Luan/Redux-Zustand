import { Axios } from "../../libs/axios";

export const api = Axios.create({
  baseURL: "http://localhost:3000",
});
