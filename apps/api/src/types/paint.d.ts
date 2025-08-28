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

export interface PaintPixel {
  tile: [number, number];
  season: number;
  pixel: [number, number];
  colorIdx: number;
}

export interface PaintRequest {
  colors: number[];
  coords: number[];
  t: string; // turnstile token
}