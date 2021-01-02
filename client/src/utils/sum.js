const sum = (arr, key) => arr.reduce((acc, next) => acc + next[key] , 0);

export default sum;