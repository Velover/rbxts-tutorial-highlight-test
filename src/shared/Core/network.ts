/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Networking } from "@flamework/networking";
import { RunService } from "@rbxts/services";

interface ClientToServerEvents {}

interface ServerToClientEvents {}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
const GlobalFunctions = Networking.createFunction<
	ClientToServerFunctions,
	ServerToClientFunctions
>();

export const ClientEvents = RunService.IsClient() ? GlobalEvents.createClient({}) : undefined!;
export const ClientFunctions = RunService.IsClient()
	? GlobalFunctions.createClient({})
	: undefined!;

export const ServerEvents = RunService.IsServer() ? GlobalEvents.createServer({}) : undefined!;
export const ServerFunctions = RunService.IsServer()
	? GlobalFunctions.createServer({})
	: undefined!;
