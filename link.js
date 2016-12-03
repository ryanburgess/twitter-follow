const fs = require('fs');
const prompt = require('prompt');
const list = fs.readFileSync('./list.json');
const fullList = JSON.parse(list);

// prompt schema
const schema = {
  properties: {
    name: {
      description: 'Name',
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Name must be only letters, spaces, or dashes',
      required: true
    },
    twitter: {
      description: 'Twitter handle',
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Must be a valid URL',
      required: true
    },
    category: {
      description: 'Category (engineer, company, conference)',
      pattern: /^(engineer|company|conference)/,
      message: 'Must be of the valid categories',
      required: true
    }
  }
};

// start prompt
prompt.start();

// prompt questions
prompt.get(schema, function (err, result) {
  const obj = {'name': result.name.trim(), 'twitter': result.twitter.trim().replace('@', ''), 'cat': result.category.trim().toLowerCase()};
  fullList.push(obj);
  fs.writeFileSync('./list.json', JSON.stringify(fullList, null, 4));
  console.log('New Twitter follower added!');
});
