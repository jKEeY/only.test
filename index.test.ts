interface ITransformKeysObject<T> {
  [key: string]: T[]
}

function groupBy<T>(array: T[], callbackKeyGroup: (el: T) => void): ITransformKeysObject<T>  {

  const keys = array.map((el) => { 
    const key = callbackKeyGroup(el)
    return { [String(key)]: el }
  })

  const uniqueKeys = new Set(keys.map(key => Object.keys(key)[0]))
  const transformKeysObject: ITransformKeysObject<T> = {}
  for (let uniqKey of uniqueKeys) {
    keys.forEach(obj => {
      for (let [key, value] of Object.entries(obj)) {
        if (key === uniqKey) {
            if (uniqKey in transformKeysObject) {
                transformKeysObject[uniqKey].push(value)
            } else {
              transformKeysObject[uniqKey] = [value]
            }
        }
      }
    })
  }

  return transformKeysObject
}

describe('Index.ts', () => {
  it('One test', () => {
    const COMPARISON_OBJECT = {
      "3": ["one", "two"],
      "5": ["three"],
    };

    const result = groupBy(["one", "two", "three"], (el) => el.length);

    expect(result).toEqual(COMPARISON_OBJECT)
  })

  it('Two test', () => {
    const COMPARISON_OBJECT = {
      "0": [0.4],
      "1": [1.2, 1.1],
      "2": [2.3]
    };

    const result = groupBy([1.2, 1.1, 2.3, 0.4], Math.floor)

    expect(result).toEqual(COMPARISON_OBJECT)
  })

  it('Three test', () => {
    enum Gender {
      Male,
      Female,
    }
    const COMPARISON_OBJECT = {
      [Gender.Male]: [{ g: Gender.Male, n: "A" }],
      [Gender.Female]: [
        { g: Gender.Female, n: "B" },
        { g: Gender.Female, n: "C" },
      ],
    };

    const result = groupBy([
      { g: Gender.Male, n: "A" },
      { g: Gender.Female, n: "B" },
      { g: Gender.Female, n: "C" },
    ],
    (el) => el.g)

    expect(result).toEqual(COMPARISON_OBJECT)
  })
})
