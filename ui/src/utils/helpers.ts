export const parseIntOrUndefined = (input: string | undefined): number | undefined => {
  if (!input) return undefined

  try {
    return parseInt(input, 10)
  } catch {
    return undefined
  }
}
