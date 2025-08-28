export interface UserDataResponse {
	allianceId: number;
	allianceRole: string;
	charges: {
		cooldownMs: number;
		count: number;
		max: number;
	};
	country: string;
	discord: string;
	droplets: number;
	equippedFlag: number;
	extraColorsBitmap: number;
	favoriteLocations: any[];
	flagsBitmap: string;
	id: number;
	isCustomer: boolean;
	level: number;
	maxFavoriteLocations: number;
	name: string;
	needsPhoneVerification: boolean;
	picture: string;
	pixelsPainted: number;
	showLastPixel: boolean;
}

export interface HealthResponse {
	database: boolean;
	up: boolean;
	uptime: string;
}