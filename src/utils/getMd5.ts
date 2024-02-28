import md5 from 'crypto-js/md5';
import getTimestamp from './getTimestamp';

export function getMd5(password: string, timestamp: string): string {
  const value = `${password}_${timestamp}`;
  return md5(value).toString();
};

export function getMd5WithTimestamp(password: string): string {
  const timestamp = getTimestamp();

  return getMd5(password, timestamp);
}
