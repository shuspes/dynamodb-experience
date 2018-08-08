const { dynamoDb, TABLE_NAME } = require('../utils/constants');
const { getDateInFormat } = require('../utils/formatter');

module.exports.list = (event, context, callback) => {
    const timestamp = getDateInFormat(new Date('12-2-2013'));

    const params = {
        TableName: TABLE_NAME,
        IndexName: 'dynamo-experience-byDate',
        KeyConditionExpression: 'ID = :id AND #D > :date',
        ExpressionAttributeValues: {
            ':id': '7ebd8d00-995d-11e8-9b0a-07fa8e1fa110',
            ':date': timestamp
        },
        ExpressionAttributeNames: {"#D": "Date"},
        // // ProjectionExpression: "ID, Title, #num",
        // ExpressionAttributeValues: {":current": "Alex"},
        // ScanIndexForward: false,
        // KeyConditionExpression: "#date = :current"
        // // Limit: 1,
    };
  
    dynamoDb.query(params).promise()
        .then(data => data.Items)
        .catch(err => err)
        .then(responseMessage => {
            const response = {
                statusCode: 200,
                body: JSON.stringify(responseMessage),
            };
            callback(null, response);
        }); 
};