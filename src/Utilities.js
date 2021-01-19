function escapeRegExp(str){
    return str.replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g, "\\$&")
}

export function fuzzyComparison(str, mask){
    const regex = '^' + escapeRegExp(mask) + '$'
    const r = new RegExp(regex)
    return r.test(str)
}