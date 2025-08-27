export async function sleep(duration: number) {
	return new Promise<void>((resolve, reject) => {
		setTimeout(resolve, duration);
	});
}