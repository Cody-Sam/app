var files = ["colours"];

var { readFileSync, writeFileSync } = require("fs");

files.forEach((file) => {
  const words = `./${file}.txt`;
  const contents = readFileSync(words, "utf-8");
  const arr = contents.split(/\r?\n/);
  writeFileSync(`./${file}.json`, JSON.stringify(arr));
});
