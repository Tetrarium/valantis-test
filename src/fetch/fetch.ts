import { ActionType } from "@/types/actionType";
import { getMd5WithTimestamp } from "@/utils/getMd5";

const PASSWORD = 'Valantis';
const URL = 'http://api.valantis.store:40000/';

interface Result {
  ok: boolean,
  data: { result: any; } | null,
  error: Error | null,
}

export async function fetchData(action: ActionType, params?: object) {
  let result: Result = {
    ok: false,
    data: null,
    error: null,
  };

  try {
    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify({ action, params }),
      headers: {
        'X-Auth': getMd5WithTimestamp(PASSWORD),
        'Content-Type': 'application/json',
      }
    });
    result = {
      ...result,
      ok: true,
      data: await response.json(),
    };
  }
  catch (e) {
    if (e instanceof Error) {
      result = {
        ...result,
        error: e,
      };
    }
  }
  finally {
    return result;
  }
}