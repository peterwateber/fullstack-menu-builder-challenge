let hasOwnProperty = Object.prototype.hasOwnProperty

export const isEmpty = (obj: any): boolean => {
    if (obj == null) return true

    if (obj.length > 0) return false
    if (obj.length === 0) return true

    if (typeof obj !== "object") return true

    for (let key in obj) {
        if (hasOwnProperty.call(obj, key) && Boolean(obj[key])) return false
    }

    return true
}
