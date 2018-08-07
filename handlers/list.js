const { dynamoDb, TABLE_NAME } = require('../utils/constants');

module.exports.list = (event, context, callback) => {
    const params = {
        TableName: TABLE_NAME,
        // ExpressionAttributeNames: {"#num": "Number"},
        // // ProjectionExpression: "ID, Title, #num",
        // ExpressionAttributeValues: {":number": "1"},
        // ScanIndexForward: false,
        // KeyConditionExpression: "begins_with(#num, :number)"
        // // Limit: 1,
    };
  
    dynamoDb.scan(params).promise()
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