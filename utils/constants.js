const AWS = require('aws-sdk');

const TABLE_NAME = 'dynamo-experience';

const dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:3002'
});

module.exports.dynamoDb = dynamoDb;
module.exports.TABLE_NAME = TABLE_NAME;
