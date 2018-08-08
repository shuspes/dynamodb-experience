const getDateInFormat = date => {
    return date instanceof Date
        // ? `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
        ? date.toISOString()
        : '';
};

module.exports.getDateInFormat = getDateInFormat;