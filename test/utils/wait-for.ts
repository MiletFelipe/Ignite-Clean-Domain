/**
 *This function loops throug a function rerunning all assertions
 inside of it until it gets a truthy result.

 If the maximum duration ir reached, it then rejects.

 * @param expectations A function containing all tests assertions
 * @param maxDuration Maximun wait time before rejecting
 */
export async function waitFor(
  assertions: () => void,
  maxDuration = 1000,
): Promise<void> {
  return new Promise((resolve, reject) => {
    let elapsedtime = 0

    const interval = setInterval(() => {
      elapsedtime += 10

      try {
        assertions()
        clearInterval(interval)
        resolve()
      } catch (err) {
        if (elapsedtime >= maxDuration) {
          reject(err)
        }
      }
    }, 10)
  })
}
