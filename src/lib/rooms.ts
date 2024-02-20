import type { WebSocket } from "ws"

export type Client = {
	name: string
	socket: WebSocket
}

export type Room = {
	size: number
	clients: Set<Client>
}

export const rooms = new Map<string, Room>()
