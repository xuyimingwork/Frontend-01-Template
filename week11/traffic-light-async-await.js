async function useAsyncAwait() {
  while(true) {
    green()
    await sleep(DURATION_GREEN)
    yellow()
    await sleep(DURATION_YELLOW)
    red()
    await sleep(DURATION_RED)
  }
}