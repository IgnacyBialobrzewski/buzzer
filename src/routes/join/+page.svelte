<script lang="ts">
	import { goto } from "$app/navigation"

	let nickname: string
	let roomName: string

	function redirect() {
		goto(`/room?name=${roomName}&user=${nickname}`)
	}
</script>

<main class="flex h-screen flex-col items-center justify-center">
	<h1 class="text-3xl font-bold">Join room</h1>
	<div class="my-3 flex flex-col gap-2">
		<input
			bind:value={roomName}
			type="text"
			name="room_id"
			placeholder="Room id"
			class="rounded-md border-2 bg-slate-100 px-2 py-1 text-center font-medium"
		/>
		<input
			bind:value={nickname}
			type="text"
			name="nickname"
			placeholder="Nickname"
			class="rounded-md border-2 bg-slate-100 px-2 py-1 text-center font-medium"
		/>
		<button
			on:click={redirect}
			class="rounded-md border-2 border-solid border-blue-500 bg-blue-500 px-2 py-1 font-medium text-white hover:bg-white hover:text-blue-500"
			>Join</button
		>
	</div>
	<a href="/" class="hover:underline">Back</a>
</main>
