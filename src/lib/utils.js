/**
 * Merges class names. Accepts strings and conditional objects.
 * @param {...(string|undefined|null|false)} inputs
 * @returns {string}
 */
export function cn(...inputs) {
    return inputs
        .flat()
        .filter(Boolean)
        .join(" ")
        .trim() || undefined
}
