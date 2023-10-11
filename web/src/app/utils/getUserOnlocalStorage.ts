import { User } from "src/types/User";
import { UserLocalStorageData } from "src/types/UserLocaStorage";

export function getUserDataFromLocalStorage(): User | null {
  const userDataString = localStorage.getItem('user');

  if (userDataString) {
    const userData: UserLocalStorageData = JSON.parse(userDataString);
    return userData.user;
  }

  return null;
}
