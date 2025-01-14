const dateParser = (date) => {
    if (date.includes('-')) {
        const [day, month, year] = date.split('-');
        parsedDate = new Date(year, month - 1, day);

        return parsedDate;

    } else {

        parsedDate = new Date(date);
        return parsedDate;
    }
}

module.exports = dateParser;