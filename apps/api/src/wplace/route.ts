import { GetPixelInfoResponse, HealthResponse, PixelInfoRequest } from "../types/wplace.js";
import { systemLogger } from "../libs/logger.js";

class WplaceAPI {
	public url: string;

	public constructor(url: string) {
		this.url = url;
	}

	public async getPixelInfo(options: PixelInfoRequest) {
		const response = await this.request(`/s${options.season}/pixel/${options.tile[0]}/${options.tile[1]}?x=${options.pixel[0]}&y=${options.pixel[1]}`);

		if (response) {
			if (response.status !== 200) {
				const text = response.text();
				systemLogger.error("Fetch failed:\n", text);
				return null;
			}
			else {
				const body = await response.json() as GetPixelInfoResponse;

				return body;
			}
		}

		return null;
	}

	public async health() {
		const response = await this.request("/heath");

		if (response) {
			return await response.json() as HealthResponse;
		}
		return null;
	}

	private async request(path: string, body?: RequestInit): Promise<Response | void> {
		try {
			const response = await fetch(`${this.url}${path}`, body);
		
			if (response.status === 429) {
				const retryAfter = response.headers.get("Retry-After");

				if (retryAfter) {
					systemLogger.warn(`You or someone in your network is making a lot of requests to the server. Try again later in ${retryAfter} seconds`);
					return;
				}

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