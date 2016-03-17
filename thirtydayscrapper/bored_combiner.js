var _ = require('underscore')
var fs = require('fs')

var x = fs.readFileSync('./marchdata/Adams_march.txt', 'utf-8')
var y = fs.readFileSync('./aprildata/Adams_april.txt', 'utf-8')

var target = _.extend(x, y);

console.log(target)

// console.log(x)
// console.log(y)

fs.writeFile('message.txt', target, (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});