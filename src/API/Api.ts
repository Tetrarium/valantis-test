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
    let limit = 10;
    console.log(limit);
    while ((limit--) > 0) {
      console.log(limit);
      try {
        const response = await fetch(this._url, {
          method: 'POST',
          headers: {
            'X-Auth': getMd5WithTimestamp(this._password),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action, params: args[0] })
        });
        const data = await response.json();
        return (data as ApiInterface[K]).result;
      } catch (err) {
        console.log(err);
      }
    }
    return new Promise(resolve => resolve([]));
  }
}
