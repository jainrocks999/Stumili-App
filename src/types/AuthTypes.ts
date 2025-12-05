export interface UserType {
  _id: string;
  name: string;
  email: string;
  birthDate?: string;
  weight?: number;
  height?: number;
  age?: number;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  token: string;
  user: UserType;
}
