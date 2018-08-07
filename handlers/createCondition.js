const uuid = require('uuid');
const { dynamoDb, TABLE_NAME } = require('../utils/constants');

const dynogels = require('dynogels');
const Joi = require('joi');

dynogels.AWS.config.update({region: "eu-central-1"});

const Item = dynogels.define('Item', {
    hashKey : 'ID', 
    rangeKey : 'Title', 
    schema : {
      ID: dynogels.types.uuid(),
      Title: Joi.string(),
      Date: Joi.string(),
      Desciption: Joi.string(),
      Count: Joi.number(),
      Number: Joi.number()
    },
    tableName: TABLE_NAME
  });

module.exports.createCondition = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    // dynogels.createTables(function(err) {
    //     if (err) {
    //       console.log('Error creating tables: ', err);
    //     } else {
    //       console.log('Tables have been created');
    //     }
    //   });


    let params = {};
    params.ConditionExpression = 'attribute_not_exists(#num)';
    params.ExpressionAttributeNames = {'#num' : 'Number'};
    // params.ExpressionAttributeValues = {':x' : 123};

    const item = {
        ID: data.ID || uuid.v1(),
        Title: data.Title || '',
        Date: timestamp.toString(),
        Desciption: data.Desciption || '',
        Count: data.Count || 0,
        Number: data.Number
    }
  
    Item.create(item, params, function (error, acc) {
        let result = ''
        if(error) {
            console.log('error');
            
            result = error;
        } else {
            console.log('result');
            
            result = acc;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(result),
        };
        callback(null, response);
    });





  
    // const params = {
    //   TableName: TABLE_NAME,
    //   Item: {
    //     ID: data.ID || uuid.v1(),
    //     Title: data.Title || '',
    //     Date: timestamp,
    //     Desciption: data.Desciption || '',
    //     Count: data.Count || 0,
    //     Number: data.Number
    //   },
    //   ExpressionAttributeNames: {"#num": "Number"},
    // //   ExpressionAttributeValues: {":number": "2"},
    //   ConditionExpression: "attribute_not_exists(#num)"
    // };
    
    // dynamoDb.put(params).promise()
    //     .then(data => data)
    //     .catch(err => err)
    //     .then(responseMessage => {
    //         const response = {
    //             statusCode: 200,
    //             body: JSON.stringify(responseMessage),
    //         };
    //         callback(null, response);
    //     });
  };