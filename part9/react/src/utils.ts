export const assertNever = (value: never): never => {
  throw new Error(
    `unexpected endpoint reached handling: ${JSON.stringify(value)}`
  )
}