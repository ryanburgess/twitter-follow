const fs = require('fs');
const prompt = require('prompt');
const list = fs.readFileSync('./list.json');
const fullList = JSON.parse(list);

// start prompt
prompt.start();

// prompt questions
prompt.get(['name', 'twitter', 'category'], function (err, result) {
  const obj = {'name': result.name.trim(), 'twitter': result.twitter.trim(), 'cat': result.category.trim()};
  fullList.push(obj);
  fs.writeFileSync('./list.json', JSON.stringify(fullList, null, 4));
  console.log('New Twitter follower added!');
});
