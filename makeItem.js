const request = require("request");
const faker = require('faker')

for (let i=0; i< 1000; i++) {

  
  var options = { method: 'POST',
  url: 'http://127.0.0.1:3000/api/item',
  headers: { 'content-type': 'application/json' },
  body: { 
    itemType: 'note',
    content: faker.lorem.paragraph(),
    creator: 'ff15f544-ecd3-406c-8fc3-6e765228a202' },
  json: true };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    
    console.log(body);
  });
  
  
}