export function isAuth(): boolean {
  const token = localStorage.getItem("token")
  return !!token?.length;
}

export function getToken(): string {
  const token = localStorage.getItem("token") || ''
  return token;
}

export function removeToken() {
  localStorage.removeItem("token")
}
// export const token = localStorage.getItem("token");
