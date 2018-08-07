const { dynamoDb, TABLE_NAME } = require('../utils/constants');
const { getDateInFormat } = require('../utils/formatter');

module.exports.list = (event, context, callback) => {
    const timestamp = getDateInFormat(new Date());

    const params = {
        TableName: TABLE_NAME,
        IndexName: 'dynamo-experience-byDate',
        ExpressionAttributeNames: {"#date": "Date"},
        // // ProjectionExpression: "ID, Title, #num",
        ExpressionAttributeValues: {":current": timestamp},
        // ScanIndexForward: false,
        KeyConditionExpression: "#date <= :current"
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