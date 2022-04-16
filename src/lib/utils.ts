import router from 'next/router';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

export function generateRandomString(len = 10): string {
  return new Array(len)
    .fill(0)
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join('')
}

export function isServerSide(): boolean {
  return typeof window === 'undefined';
}

export function uppercase(t: string): string {
  return `${t.charAt(0).toUpperCase()}${t.slice(1)}`;
}

export function redirect(path: string, res: any): void {
  if (res) {
    res.writeHead(302, { Location: path });
    res.end();
  } else {
    router.push(path);
  }
}