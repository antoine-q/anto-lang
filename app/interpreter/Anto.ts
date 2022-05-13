import Lexer from '../tools/Lexer'
export default class Anto{
    codes: string = "";
    
    constructor(codes: string){
        this.codes = codes;
    }

    run(){
        const {error, tokens} = Lexer.tokenize(this.codes, "");
        if (error){
            console.error(error);
        }

        const data: Array<any> = Lexer.parse(tokens);
        data.forEach(item => {console.log(item.color, item.data)});
    }
}