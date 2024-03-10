import { getMd5WithTimestamp } from "@/utils/getMd5";

import { ApiInterface } from "./ApiInterface";

export class Api {
  constructor(
    private _url: string,
    private _password: string,
  ) { }

  async action<K extends keyof ApiInterface>(
    action: K,
    ...args: ApiInterface[K]['params']
  ): Promise<ApiInterface[K]['result']> {
    // Ограничение отправки запросов
    // чтобы не уйти в бесконечный цикл
    let limit = 10;
    while ((limit--) > 0) {
      try {
        const response = await fetch(this._url, {
          method: 'POST',
          headers: {
            'X-Auth': getMd5WithTimestamp(this._password),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action, params: args[0] })
        });
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        return (data as ApiInterface[K]).result;
      } catch (err) {
        console.log(err);
      }
    }
    return new Promise(resolve => resolve([]));
  }
}
