/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import IHttpClient from "../IHttpClient";

export default class AxiosAdapter implements IHttpClient {
  async get(url: string): Promise<any> {
    const response = await axios.get(url);

    return response.data;
  }
  async post(url: string, body: any): Promise<any> {
    const response = await axios.post(url, body);

    return response.data;
  }
  async put(url: string, body: any): Promise<any> {
    const response = await axios.put(url, body);

    return response.data;
  }
  async patch(url: string, body: any): Promise<any> {
    const response = await axios.patch(url, body);

    return response.data;
  }
  async delete(url: string): Promise<any> {
    const response = await axios.delete(url);

    return response.data;
  }
}
