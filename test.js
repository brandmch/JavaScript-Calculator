const Parser = require("expr-eval").Parser;
const parser = new Parser();

const ecp = parser.parse("8/2+9-1*7");

console.log(ecp.evaluate());
