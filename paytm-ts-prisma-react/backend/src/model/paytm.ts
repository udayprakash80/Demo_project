export interface User {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  account: Account;
}

export interface Account {
  id: number;
  balance: number;
  userId: number;
}
