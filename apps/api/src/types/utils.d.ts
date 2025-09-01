export interface ParsedTokenHeader {
	alg: string;
	typ: string;
}

export interface ParsedTokenPayload {
	userId: number;
	sessionId: string;
	iss: string;
	exp: number;
	iat: number;
}

export type ParsedTokenSignature = string;

export interface ParsedToken {
	header: ParsedTokenHeader,
	payload: ParsedTokenPayload,
	signature: ParsedTokenSignature;
}