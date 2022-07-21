import adjectives from "./adjectives.json";
import nouns from "./nouns.json";
import adverbs from "./adverbs.json";
import verbs from "./verbs.json";
import compound from "./compound.json";

const randomWords = [adjectives.sort(), nouns.sort(), verbs.sort(), compound.sort(), adverbs.sort()];

export default randomWords
export {adjectives}
