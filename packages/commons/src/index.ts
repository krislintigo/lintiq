export type KeyValueCallback<T> = (value: any, key: string) => T

// Removes all leading and trailing slashes from a path
export const stripSlashes = (value: string): string => {
  return value.replace(/^(\/+)|(\/+)$/g, '')
}

export const isPlainObject = (item: any): item is Record<string, unknown> => {
  return typeof item === 'object' && !Array.isArray(item) && item !== null
}

export const pick = <T extends Record<keyof T, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> => {
  const result = {} as Pick<T, K>

  for (const key in obj) {
    // @ts-expect-error - wrong ts
    if (Object.prototype.hasOwnProperty.call(obj, key) && keys.includes(key)) {
      // @ts-expect-error - wrong ts
      result[key] = obj[key]
    }
  }

  return result
}

export const omit = <T extends Record<keyof T, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => {
  const result = {} as Omit<T, K>

  for (const key in obj) {
    // @ts-expect-error - wrong ts
    if (Object.prototype.hasOwnProperty.call(obj, key) && !keys.includes(key)) {
      // @ts-expect-error - wrong ts
      result[key] = obj[key]
    }
  }

  return result
}

export const merge = (target: any, source: any) => {
  if (!isPlainObject(target) || !isPlainObject(source)) {
    return target
  }

  Object.keys(source).forEach((key) => {
    if (isPlainObject(source[key])) {
      if (!target[key]) {
        Object.assign(target, { [key]: {} })
      }

      merge(target[key], source[key])
    } else {
      Object.assign(target, { [key]: source[key] })
    }
  })
}
