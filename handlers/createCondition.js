const uuid = require('uuid');
const { dynamoDb, TABLE_NAME } = require('../utils/constants');

module.exports.createCondition = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    const test_func = (test_func, test2, test3, test4) => {
        console.log("adfadfadfadf !!!!!!!!!!!!!!!!");
        return true;
        
    }
  
    const params = {
      TableName: TABLE_NAME,
      Item: {
        ID: data.ID || uuid.v1(),
        Title: data.Title || '',
        Date: timestamp,
        Desciption: data.Desciption || '',
        Count: data.Count || 0,
        Number: data.Number
      },
      ExpressionAttributeNames: {"#num": "Number"},
    //   ExpressionAttributeValues: {":number": "2"},
      ConditionExpression: "attribute_not_exists(#num)"
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