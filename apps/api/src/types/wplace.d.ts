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

export interface PixelInfoRequest {
	season: number;
	tile: [number, number];
	pixel: [number, number];
}

export interface GetPixelInfoResponse {
	paintedBy: {
		id: number;
		name: string;
		allianceId: number;
		allianceName: string;
		equippedFlag: number;
	},
	region: {
		id: number;
		cityId: number;
		name: string;
		number: number;
		countryId: number;
	}
}

export interface HealthResponse {
	database: boolean;
	up: boolean;
	uptime: string;
}