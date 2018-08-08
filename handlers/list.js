const { dynamoDb, TABLE_NAME } = require('../utils/constants');
const { getDateInFormat } = require('../utils/formatter');

const listDate = (event, context, callback) => {    
    const { 
        from: dateFromParam, 
        to: dateToParam = Date.now() 
    } = event.pathParameters;
    
    const dateTo = getDateInFormat(new Date(dateToParam));
    const dateFrom = getDateInFormat(new Date(dateFromParam));

    const params = {
        TableName: TABLE_NAME,
        IndexName: 'dynamo-experience-byDate',
        KeyConditionExpression: 'ID = :id AND #D BETWEEN :dateFrom AND :dateTo',
        ExpressionAttributeValues: {
            ':id': '7ebd8d00-995d-11e8-9b0a-07fa8e1fa110',
            ':dateTo': dateTo,
            ':dateFrom': dateFrom
        },
        ExpressionAttributeNames: {"#D": "Date"},
        ScanIndexForward: false,
        // Limit: 1,
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

const list = (event, context, callback) => {
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

module.exports.listDate = listDate;
module.exports.list = list;