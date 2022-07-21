import randomWords from "./random-words";

export default function readableRandom(id) {
  let wordID = [id.slice(0,6)]
  let l = 0;
  for (let i = 8; i < id.length -6 ; i += 2) {
    let part = parseInt(id.slice(i, i + 2), 16);
    let word = randomWords[l][part];
    wordID.push(word);
    l = (l + 1) % randomWords.length;
  }
  wordID.push(id.slice(-6))
  let colour = `#${id.slice(-6)}`
  return {id: wordID.join('-'), colour};
}
