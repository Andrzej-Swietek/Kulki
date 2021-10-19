export const Required = (target, key, index) => {
    const tableIndex = `${key}_arguments`
    if (Array.isArray(target[tableIndex])) {
        target[tableIndex].push(index);
    } else {
        target[tableIndex] = [index];
    }

}
// say(@Required text) {
// }
