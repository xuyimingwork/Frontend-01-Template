function useGenerator() {
  function* main() {
    while (true) {
      green()
      yield sleep(DURATION_GREEN)
      yellow()
      yield sleep(DURATION_YELLOW)
      red()
      yield sleep(DURATION_RED)
    }
  }

  function co(generator) {
    function run(iterator) {
      const { value: promise, done } = iterator.next()
      if (done || !(promise instanceof Promise)) return
      promise.then(() => run(iterator))
    }

    return run(generator())
  }

  co(main)
}