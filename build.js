'use strict';
const fs = require('fs');
const obj = require('./list.json');
const engineer = [];
const company = [];
const conference = [];

let content = '# People to follow on Twitter \n A list of resources/people to follow on Twitter.';

// create list of people to follow
for (const resource of obj) {
  const name = resource.name;
  const twitter = resource.twitter;
  const cat = resource.cat;

  if(cat === 'engineer') {
    engineer.push({'name': name, 'twitter': twitter});
  }else if(cat === 'company') {
    company.push({'name': name, 'twitter': twitter});
  }else if(cat === 'conference') {
    conference.push({'name': name, 'twitter': twitter});
  }
}

// capetalize first letter
const capital = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// create content of the list of links
const ouputLinks = (obj, title) => {
  // sort in alphabetical
  obj.sort((a, b) => {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  });

  content += `\n\n## ${title}`;
  const duplicates = [];
  for (const out of obj) {
    // avoid duplicates
    if (duplicates.indexOf(out.twitter) === -1) {
      duplicates.push(out.twitter);
      content += (
       `\n * [${out.name} - @${out.twitter}](http://twitter.com/${out.twitter})`
     );
    }
  }
  
  return obj;
}

// create content of links
ouputLinks(engineer, 'Engineers');
ouputLinks(company, 'Companies');
ouputLinks(conference, 'Conferences');

// create README file
fs.writeFile('./README.md', content, function (err) {
   if (err) throw err;
   console.log('Updated list');
});
