export type Assert<T> = (arg: unknown) => asserts arg is T

export const assertString : Assert<string> = (arg) => {
  if (typeof arg !== 'string') throw new Error(`arg is not string. ${typeof arg} ${arg}`)
}
export const assertStringOrNull : Assert<string|null> = (arg) => {
  if (typeof arg !== 'string' && arg !== null)
    throw new Error(`arg is not string. ${typeof arg} ${arg}`)
}

export const assertNumber : Assert<number> = (arg) => {
  if (typeof arg !== 'number') throw new Error(`arg is not number. ${typeof arg} ${arg}`)
}

export const assertNumberOrNull : Assert<number|null> = (arg) => {
  if (typeof arg !== 'number' && arg != null)
    throw new Error(`arg is not number or null. ${typeof arg} ${arg}`)
}

export type AssertRecord<T> = Assert<Record<string, T>>

export const assertRecord : AssertRecord<unknown> = (arg) => {
  if (typeof arg !== 'object') throw new Error('arg is not object')
  if (arg === null) throw new Error('arg is null')
}

export const assertStringRecord : AssertRecord<string> = (arg) => {
  assertRecord(arg)
  Object.values(arg).forEach((a) => { assertString(a) })
}

export const assertNumberRecord : AssertRecord<number> = (arg) => {
  assertRecord(arg)
  Object.values(arg).forEach((a) => { assertNumber(a) })
}

export type AssertArray<T> = Assert<T[]>

export const assertArray : AssertArray<unknown> = (arg) => {
  if (!Array.isArray(arg)) throw new Error('arg is not array')
}

export const assertStringArray : AssertArray<string> = (arg) => {
  assertArray(arg)
  arg.forEach((a) => { assertString(a) })
}
