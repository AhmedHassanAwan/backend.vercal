

export const mrnumberGenerate = (prefix = "GEN") => {
    const mrnumber = Math.floor(10 * Math.random()*900);
    return `${prefix}-${mrnumber}`
}