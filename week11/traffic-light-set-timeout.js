function useSetTimeout() {
  green()
  setTimeout(yellow, DURATION_GREEN)
  setTimeout(red, DURATION_GREEN + DURATION_YELLOW)
  setTimeout(useSetTimeout, DURATION_GREEN + DURATION_YELLOW + DURATION_RED)
}