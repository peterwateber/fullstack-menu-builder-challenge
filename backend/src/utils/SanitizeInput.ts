interface TypeObj {
    [key: string]: any
}

export const sanitizeInput = (obj: TypeObj) => {
    let flag = false, errors = ''
    if (!Boolean(Object.values(obj).length)) throw "Request body could not be empty."
    Object.keys(obj).forEach((input: string) => {
        const _value = (obj[input] || "").toString().trim()
        if (!Boolean(_value)) {
            flag = true
            errors += `Field '${input}' cannot be empty.<br/>`
        }
        obj[input] = _value
    })
    if (flag) {
        throw {
            code: 403,
            message: errors.trim()
        }
    }
    return obj
}
