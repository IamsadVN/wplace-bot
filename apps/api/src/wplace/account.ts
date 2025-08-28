import { systemLogger } from "../libs/logger.js";
import { PaintPixel, PaintRequest } from "../types/paint.js";
import { UserDataResponse } from "../types/wplace.js";

const WPLACE_BACKEND_URL = "https://backend.wplace.live" as const;

export class WplaceAccount {
	public lastFetch: number;

	public constructor(public data: UserDataResponse) {
		this.lastFetch = Date.now();
	}

	public get username() {
		return this.data.name;
	}
	
	public get totalDroplet() {
		return this.data.droplets;
	}

	public get totalCharges() {
		return this.data.charges.max;
	}

	public get availableCharges() {
		return this.data.charges.count;
	}

	public get countryCode() {
		return this.data.country;
	}

	public async fetchUser(): Promise<UserDataResponse | null> {
		const response = await this.request("/me", {
			credentials: "include"
		});

		if (response && response.status === 200) {
			const body = await response.json() as UserDataResponse;

			this.data = body;
			this.lastFetch = Date.now();

			return body;
		}

		return null;
	}

	public async paint(pixels: PaintPixel[], turnstileToken: string) {
		const pixelGroups = this.groupBy<PaintPixel>(
			pixels,
			(pixel) => `t=(${pixel.tile[0]},${pixel.tile[1]}),s=${pixel.season}`
		);

		const requests = Object.values(pixelGroups).map(group => {
			const [tileX, tileY] = group[0].tile;
			const season = group[0].season;

			const requestBody: PaintRequest = {
				colors: group.map(pixel => pixel.colorIdx),
				coords: group.flatMap(pixel => pixel.pixel),
				t: turnstileToken
			};

			return this.request(`/s${season}/pixel/${tileX}/${tileY}`, {
				method: "POST",
				body: JSON.stringify(requestBody),
				credentials: "include"
			});
		});

		const responses = await Promise.all(requests);
		const failedResponses = responses.filter(response => {
			if (!response)
				return false;

			return response.status !== 200;
		}) as Response[];

		if (failedResponses.length > 0) {
			systemLogger.warn(`Got ${failedResponses.length} failed request`);
		}
	}

	private groupBy<Type>(items: Type[], keyFn: (item: Type) => string): Record<string, Type[]> {
		const groups: Record<string, Type[]> = {};

		for (const item of items) {
			const key = keyFn(item);

			if (groups[key]) {
				groups[key].push(item);
			}
			else {
				groups[key] = [item];
			}
		}

		return groups;
	}

	private async request(path: string, body?: RequestInit): Promise<Response | null> {
		try {
			const response = await fetch(`${WPLACE_BACKEND_URL}${path}`, body);
		
			if (response.status === 429) {
				systemLogger.warn("You or someone in your network is making a lot of requests to the server. Try again later.");
				return null;
			}

			return response;
		}
		catch (err) {
			systemLogger.error("Fetch error:\n", err);
			return null;
		}
	}
}