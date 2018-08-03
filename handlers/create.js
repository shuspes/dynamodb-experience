const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:3001'
});

const TABLE_NAME = 'dynamo-experience';

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
  
    const params = {
      TableName: TABLE_NAME,
      Item: {
        ID: uuid.v1(),
        Title: data.Title || '',
        Date: timestamp,
        Desciption: data.Desciption || '',
        Count: data.Count || 0,
        Number: data.Number || 0
      }
    };
    
    dynamoDb.put(params).promise()
        .then(data => data)
        .catch(err => err)
        .then(responseMessage => {
            const response = {
                statusCode: 200,
                body: JSON.stringify(responseMessage),
            };
            callback(null, response);
        });
  };