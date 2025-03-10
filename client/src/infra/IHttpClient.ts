/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IHttpClient {
  get(url: string): Promise<any>;
  post(url: string, body: any): Promise<any>;
  put(url: string, body: any): Promise<any>;
  patch(url: string, body: any): Promise<any>;
  delete(url: string): Promise<any>;
}
