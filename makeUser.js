const request = require("request");
const faker = require('faker')

for (let i=0; i< 1000; i++) {

  
  var options = { method: 'POST',
  url: 'http://127.0.0.1:3000/api/user',
  headers: { 'content-type': 'application/json' },
  body: { username: faker.internet.userName() },
  json: true };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    
    console.log(body);
  });
  
  
}