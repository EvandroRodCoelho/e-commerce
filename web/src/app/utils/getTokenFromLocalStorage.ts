import { UserLocalStorageData } from "src/types/UserLocaStorage";

export function getTokenFromLocalStorage(): string | null {
  const userDataString = localStorage.getItem('user');

  if (userDataString) {
    const userData: UserLocalStorageData = JSON.parse(userDataString);
    return userData.token;
  }

  return null;
}
