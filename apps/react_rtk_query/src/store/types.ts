export interface LoginResponse {
	accessToken: string
}

export type RefreshResponse = LoginResponse

export interface AuthState {
	accessToken: string | null
}

export interface Data {
	message: string
}
