const uuid = require('uuid');
const { dynamoDb, TABLE_NAME } = require('../utils/constants');

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
  
    const params = {
      TableName: TABLE_NAME,
      Item: {
        ID: data.ID || uuid.v1(),
        Title: data.Title || '',
        Date: timestamp,
        Desciption: data.Desciption || '',
        Count: data.Count || 0,
        NumberOf: data.NumberOf || 0
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