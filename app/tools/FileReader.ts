import fs = require('fs');
import path = require('path');

export default class FileReader {
    static readFile(filename: string, dirname: string){
        const codes = fs.readFileSync(path.join(dirname, filename), 'utf-8').toString().replace(/\r/g, "");
        return codes;
    }
}
