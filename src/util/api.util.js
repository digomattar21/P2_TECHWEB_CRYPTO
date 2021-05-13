import axios from "axios";
import { auth } from "../firebase";

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://rbcrypto.herokuapp.com'
    });

    this.api.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        config.headers ={
          Authorization: `Bearer ${token}`
        };
        return config;
    });

    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          throw JSON.stringify(error.response.data.message);
        }
      }
    );
  }

  async SignupWithEmail(payload){
    try {
      let req = this.api.post('/private/user/signupwithemail', payload);
      return req
    } catch (error) {
      throw error
    }
  }

  async SignupWithGoogle(payload){
    try {
      let req = await this.api.post('/private/user/signupwithgoogle', payload);
      return req
    } catch (error) {
      throw error
    }
  }

  async handleAddToWatchlistClick(payload){
    try{
      let req = await this.api.post('/private/user/addtowatchlist',payload);
      return req
    }catch(err){
      throw err
    }
  }

  async GetWatchlistInfo(payload){
    try {
      let req = await this.api.post('/private/user/getwatchlistinfo', payload);
      return req
    } catch (error) {
      throw error
    }
  }

  async RemoveTickerFromWatchlist(payload){
    try {
      let req = await this.api.post("/private/user/removetickerfromwatchlist", payload)
      return req
    } catch (error) {
      throw error
    }
  }


}

export default new Api()

