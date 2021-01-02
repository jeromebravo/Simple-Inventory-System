module.exports = (arr, key) => {
    return arr.reduce((acc, next) => acc + next[key], 0);
}