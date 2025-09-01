interface User {
	username: string;
	totalDroplet: number;
	totalCharges: number;
	availableCharges: number;
	countryCode: string;
	lastFetch: number;
}

export type APIListAllUsers = User[];

export interface APINewUser {
	jwtToken: string;
}

