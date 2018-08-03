const AWS = require('aws-sdk');

const TABLE_NAME = 'dynamo-experience';
const dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:3001'
});

module.exports.list = (event, context, callback) => {
    const params = {
        TableName: TABLE_NAME
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