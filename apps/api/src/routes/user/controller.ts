import { FastifyReply, FastifyRequest } from "fastify";

import type { APINewUser } from "@wplace-bot/types";

export async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
}

export async function getUserByID(request: FastifyRequest<{ Params: { userID: string } }>, reply: FastifyReply) {
}

export async function createNewUser(request: FastifyRequest<{ Body: APINewUser }>, reply: FastifyReply) {
}

export async function deleteUserByID(request: FastifyRequest<{ Params: { userID: string } }>, reply: FastifyReply) {
}