import type { Actions } from "@sveltejs/kit"
import { z } from "zod"
import { randomUUID } from "crypto"
import { rooms } from "$lib/rooms"

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData()
		const roomSize = z.number({ coerce: true }).positive().parse(formData.get("roomSize"))
		const [roomName] = randomUUID().toUpperCase().split("-")

		console.log(`room created: ${roomName}`)

		rooms.set(roomName, {
			size: roomSize,
			clients: new Set([])
		})

		rooms.delete(event.cookies.get("roomOwner")!)

		event.cookies.set("roomOwner", roomName, { path: "/" })

		return roomName
	}
}
