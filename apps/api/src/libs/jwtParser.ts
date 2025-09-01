import type { ParsedTokenHeader, WplaceJWTTokenParsed, ParsedTokenPayload } from "../types/utils.js";

function base64Decode(str: string) {
	str = str.replace(/-/g, "+").replace(/_/g, "/");

	while (str.length % 4) {
		str += "=";
	}

	return Buffer.from(str, "base64");
}

export function jwtToken(token: string): WplaceJWTTokenParsed {
	const [headerB64, payloadB64, signature] = token.split(".");

	const header = JSON.parse(base64Decode(headerB64).toString("utf-8")) as ParsedTokenHeader; 
	const payload = JSON.parse(base64Decode(payloadB64).toString("utf-8")) as ParsedTokenPayload;

	return {
		header,
		payload, 
		signature
	}
}