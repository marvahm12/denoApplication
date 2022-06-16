export type RegistrationFormKeys =
  | 'firstName'
  | 'lastName'
  | 'birthday'
  | 'phoneNumber'
  | 'confirmPassword'
  | 'password'
  | 'email'
  | 'username'

export interface User {
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
  phoneNumber: string
  birthday: string
}

export interface UserResponse {
  user: User
  token: string
}

export interface LoginRequest {
  username: string
  password: string
}

export type RegisterRequest = {
  [key in RegistrationFormKeys]: string | Date
}

export type PasswordFieldKeys = 'showPassword' | 'showConfirmPassword'
