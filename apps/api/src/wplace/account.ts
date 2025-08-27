import { systemLogger } from "../libs/logger.js";
import { AccountData } from "../types/data.js";
import { UserDataResponse } from "../types/wplace.js";

class WplaceAccount {
	public totalCharge: number;
	public availableCharge: number;

	public userName: string;
	public totalDroplet: number;
	public country: string;
	public lastFetch: number;

	private url = "https://backend.wplace.live";

	public constructor(data: AccountData) {
		this.totalCharge = data.totalCharge;
		this.availableCharge = data.availableCharge;

		this.userName = data.userName;
		this.country = data.countryCode;
		this.totalDroplet = data.totalDroplet;

		this.lastFetch = Date.now();
	}

	public async fetchUser(): Promise<UserDataResponse | null> {
		const response = await this.request("/me", {
			credentials: "include"
		});

		if (response && response.status === 200) {
			const body = await response.json() as UserDataResponse;

			this.totalCharge = body.charges.max;
			this.availableCharge = body.charges.count;

			this.totalDroplet = body.droplets;
			this.country = body.country;
			this.userName = body.name;

			return await response.json() as UserDataResponse;
		}

		return null;
	}

	public async paint() {

	}

	//public async profilePictures() {
	//	const response = await this.request("/me/profile-pictures", {
	//		credentials: "include"
	//	});

	//	if (response && response.status !== 200) {
	//		systemLogger.error("Unexpected Wplace server error. Try again later.");
	//	}
	//}

	private async request(path: string, body?: RequestInit): Promise<Response | void> {
		try {
			const response = await fetch(`${this.url}${path}`, body);
		
			if (response.status === 429) {
				systemLogger.warn("You or someone in your network is making a lot of requests to the server. Try again later.");
				return;
			}

			return response;
		}
		catch (err) {
			systemLogger.error("Fetch error:\n", err);
			return;
		}
	}
}