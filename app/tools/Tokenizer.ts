import { Keywords } from "./Keywords";
import { Types } from "./Types";

export default class Tokenizer {

    static tokenize(token: string, error: string) {
        
        const length: number = token.length;
        let position: number = 0;
        let tokens: Array<object> = [];
        const BUILT_IN_KEYWORDS: Array<string> = Object.values(Keywords);

        const varChars: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';

        while(position < length){
            let currentChar: string = token[position];

            if(currentChar === " " || currentChar === "\n"){
                position ++;
                continue;
            } else if(currentChar === '"'){
                let res: string = "";
                position++;
                while(token[position] !== '"' && token[position] !== "\n" && position < length){
                    res += token[position];
                    position++;
                }
                
                if(token[position] !== '"'){
                    return {
                        error: "Unterminated String",
                        tokens: [],
                    }
                }
                position ++;


                tokens.push({
                    type: Types.string,
                    value: res,
                })
            } else if (varChars.includes(currentChar)){
                
                let res: string = currentChar;
                position++;

                while (varChars.includes(token[position]) && position < length){
                    res += token[position];
                    position++;
                }

                tokens.push({
                    type: BUILT_IN_KEYWORDS.includes(res) ? Types.keyword : Types.custom_keyword,
                    value: res
                });
            } else if ( currentChar === "="){
                position++;
                tokens.push({
                    type: Types.operator,
                    value: "eq"
                })
            } else {
                return {
                    error: `Unexpected character ${token[position]}`,
                    tokens: [],
                }
            }
        }

        return {
            error: false,
            tokens
        }
    }
}