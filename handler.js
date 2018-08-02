const serverless = require('serverless-http');
const express = require('express');
const AWS = require('aws-sdk');
const uuid = require('uuid');


const TABLE_NAME = 'dynamo-experience';

const dynamoDBApp = express();

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000'
});

dynamoDBApp.get('/getAll', (req, res) => {
  const params = {
    TableName: TABLE_NAME
  }
  
  dynamoDb.scan(params).promise()
    .then(data => data.Items)
    .catch(err => err)
    .then(responseMessage => {
      res.json(responseMessage);
    });
});

dynamoDBApp.post('/createNew', (req, res) => {
  // const params = {
  //   TableName: TABLE_NAME,
  //   Item: {
  //     ID: uuid.v1(),
  //     Title: 'new item',
  //     Date: Date.now(),
  //     Desciption: 'new description',
  //     Count: 1,
  //     Number: 2
  //   }
  // };
  console.log("req", req);

  console.log("req body", req.body);
  

  res.json({body: req.body, test: 'some test data'});

  // dynamoDb.put(params).promise()
  //   .then(data => data)
  //   .catch(err => err)
  //   .then(responseMessage => {
  //     res.json(responseMessage);
  //   });
});

module.exports.dynamoHandler = serverless(dynamoDBApp);
