import Anto from "./app/interpreter/Anto";
import FileReader from "./app/tools/FileReader";

const code: string = FileReader.readFile('code.at', `${__dirname}/source`);
const anto = new Anto(code);
anto.run();

