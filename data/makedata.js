// creates mockdata as a json file in data.json
// run with node makedata.js
const fs = require('fs');
const { random } = require('lodash');
const uuid = require('uuid');

// creating an array of 30 objects of type Payment
data = [];
for (let i = 0; i < 30; i++) {
  const uid = uuid.v4();
  const payment = {
    id: uid,
    amount: random(100, 1000) + random(0, 99) / 100,
    status: ['pending', 'processing', 'success', 'failed'].sort(
      () => random() - 0.5,
    )[0],
    email: `${uid}@example.com`,
  };
  data.push(payment);
}

const json = JSON.stringify(data);

fs.writeFile('data.json', json, 'utf8', () => {
  console.log('data.json written');
});
