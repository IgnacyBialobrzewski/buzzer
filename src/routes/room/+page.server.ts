import { rooms, type Client } from "$lib/rooms"
import { WebSocketServer } from "ws"

const wss = new WebSocketServer({ port: 5174 })

wss.on("connection", (socket, request) => {
	if (!request.url) {
		return
	}

	const url = new URL(request.url, "ws://localhost")
	const roomName = url.searchParams.get("name")
	const userName = url.searchParams.get("user")

	if (!roomName || !userName) {
		return
	}

	const room = rooms.get(roomName)

	if (!room) {
		socket.close(1000, `room ${roomName} doesn't exist`)
		return console.log(`room not found`)
	}

	if (room.size === room.clients.size) {
		socket.close(1000, `${roomName} is full`)
		return console.log(`${roomName} is full`)
	}

	const clients = room.clients
	clients.add({
		socket,
		name: userName
	})

	rooms.set(roomName, {
		...room,
		clients
	})

	socket.ping()
	console.log(rooms)

	socket.on("close", () => {
		const room = rooms.get(roomName)

		if (room) {
			const clients = room.clients
			const newClients = new Set<Client>()

			for (const v of clients) {
				if (v.name !== userName && v.socket !== socket) {
					newClients.add(v)
				}
			}

			rooms.set(roomName, {
				...room,
				clients: newClients
			})
		}

		console.log(rooms)
	})
})
