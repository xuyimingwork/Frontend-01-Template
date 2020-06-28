function usePromise() {
  green()
  sleep(DURATION_GREEN)
    .then(() => {
      yellow()
      return sleep(DURATION_YELLOW)
    })
    .then(() => {
      red()
      return sleep(DURATION_RED)
    })
    .then(usePromise)
}