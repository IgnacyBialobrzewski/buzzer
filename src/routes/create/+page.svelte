<script lang="ts">
	import { page } from "$app/stores"
	import { onMount } from "svelte"

	let roomName: string

	onMount(() => {
		const newRoomName: string | undefined = $page.form

		if (newRoomName) {
			roomName = newRoomName
		}
	})
</script>

<main class="flex h-screen flex-col items-center justify-center">
	{#if roomName}
		<p class="mb-2 text-2xl font-bold">Room ID:</p>
		<h1 class="rounded-md bg-blue-500 px-2 py-1 text-3xl font-bold text-white">{roomName}</h1>
	{:else}
		<h1 class="text-3xl font-bold">Create room</h1>
		<form class="mt-3 flex flex-col gap-2" method="post">
			<input
				type="number"
				name="roomSize"
				value="1"
				min="1"
				placeholder="Room size"
				class="rounded-md border-2 bg-slate-100 px-2 py-1 text-center font-medium"
			/>
			<button
				class="rounded-md border-2 border-solid border-blue-500 bg-blue-500 px-2 py-1 font-medium text-white hover:bg-white hover:text-blue-500"
				>Create</button
			>
		</form>
	{/if}
	<a href="/" class="mt-3 hover:underline">Back</a>
</main>
