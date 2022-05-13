import Tokenizer from "./Tokenizer";
import Parser from "./Parser";

export default class Lexer {

    static tokenize(token: string, error: string) {
        
        return Tokenizer.tokenize(token, error);
        
    }

    static parse(tokens: Array<any>){

        return Parser.parse(tokens);
        
    }
}