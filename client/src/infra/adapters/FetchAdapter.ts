/* eslint-disable @typescript-eslint/no-explicit-any */
import IHttpClient from "../IHttpClient";

export default class FetchAdapter implements IHttpClient {
  async get(url: string): Promise<any> {
    const response = await fetch(url);

    const data = await response.json();

    return data;
  }
  async post(url: string, body: any): Promise<any> {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return data;
  }
  async put(url: string, body: any): Promise<any> {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return data;
  }
  async patch(url: string, body: any): Promise<any> {
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return data;
  }
  async delete(url: string): Promise<any> {
    const response = await fetch(url, {
      method: "DELETE",
    });

    const data = await response.json();

    return data;
  }
}
