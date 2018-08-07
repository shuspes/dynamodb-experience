const getDateInFormat = date => {
    return date instanceof Date
        ? `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
        : '';
};

module.exports.getDateInFormat = getDateInFormat;