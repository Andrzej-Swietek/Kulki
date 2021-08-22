/**
 * Returns Random Value of Enum
 * @param anEnum - Enum we take random value from
 * @param exceptions - Values to exclude
 */
export function random<T>(anEnum: T, exceptions?: Array<any>): T[keyof T] {
    let enumValues = Object.keys(anEnum)
        .map(n => Number.parseInt(n))
        .filter(n => !Number.isNaN(n) ) as unknown as T[keyof T][]

    exceptions?.forEach( element => enumValues = enumValues.filter( i => i != element ) )
    let randomIndex : number = Math.floor(Math.random() * enumValues.length);

    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue;
}

/**
 * Returns Random Number from range <min,max>
 * @param min : number
 * @param max : number
 * @return {number}
 */
export function randomNumber(min: number, max: number): number {
    const r = Math.random()*(max-min) + min
    return Math.floor(r)
}
