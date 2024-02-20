<script lang="ts">
	import { onMount } from "svelte"

	let statusMessage: string | undefined
	let buzzEnabled = false
	let roomName: string | null

	onMount(() => {
		const url = new URL(location.href)
		const userNameParam = url.searchParams.get("user")
		const roomNameParam = url.searchParams.get("name")
		const protocol = url.protocol === "https" ? "wss" : "ws"

		const ws = new WebSocket(
			`${protocol}://${location.hostname}:5174?name=${roomNameParam}&user=${userNameParam}`
		)

		roomName = roomNameParam
		ws.onclose = (ev) => {
			statusMessage = ev.reason
			roomName = "Connection closed"
		}
	})
</script>

<main class="flex h-screen flex-col items-center justify-center">
	{#if !statusMessage}
		<h1 class="text-3xl font-bold">{`Room: ${roomName}`}</h1>
		<button
			disabled={!buzzEnabled}
			class="my-3 rounded-md border-2 border-solid border-blue-500 bg-blue-500 p-40 font-medium text-white hover:bg-white hover:text-blue-500 disabled:border-slate-300 disabled:bg-slate-200 disabled:text-slate-700"
			>Buzz</button
		>
	{:else}
		<h1 class="text-3xl font-bold">{statusMessage}</h1>
	{/if}

	<a href="/" class="hover:underline">Back</a>
</main>
