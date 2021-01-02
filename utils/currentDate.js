module.exports = () => {
    // get current date
    let date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    date = `${year}-${month}-${day}`;

    return date;
}