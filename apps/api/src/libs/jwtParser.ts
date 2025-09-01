import type { ParsedTokenHeader, ParsedToken, ParsedTokenPayload } from "../types/utils.js";

function base64Decode(str: string) {
	return Buffer.from(str, "base64").toString("utf-8");
}

export function jwtToken(token: string): ParsedToken {
	const [headerB64, payloadB64, signature] = token.split(".");

	const header = JSON.parse(base64Decode(headerB64)) as ParsedTokenHeader; 
	const payload = JSON.parse(base64Decode(payloadB64)) as ParsedTokenPayload;

	return {
		header,
		payload, 
		signature
	}
}