import { Keywords } from "./Keywords";
import { Types } from "./Types";

export default class Parser{
    static parse(tokens: Array<any>){
        const length: number = tokens.length;
        let position: number = 0;
        let returnData: Array<object> = [];

        const vars: object = {};

        while (position < length){
            const token = tokens[position];

            if(token.type === Types.keyword && token.value === Keywords.print ){
                if(!tokens[position +1]){
                    returnData.push({color: "" , data: "unexpected end of line, expected string" });
                    return returnData;
                }
                
                let isString: boolean = tokens[position + 1].type === Types.string;
                let isVar: boolean = tokens[position + 1].type === Types.custom_keyword;

                if(!isString && !isVar) {
                    returnData.push({color: "", data: `Unexpected token ${tokens[position+1].type}, expected string` });
                    return returnData;
                }
                if(isVar){
                    if(!(tokens[position + 1 ].value in vars)){
                        returnData.push({color: "", data: `Undefined variable ${tokens[position+1].type}` });
                        return returnData;
                    }
                    returnData.push({color:"",data: vars[tokens[position +1].value]});
                }else{
                    returnData.push({color: '\x1b[35m%s\x1b[0m', data: tokens[position+1].value});
                }
                
                position += 2;
                
            } else if (token.type === Types.keyword && token.value === Keywords.var) {
                const isCustomKeyword = tokens[position +1] && tokens[position +1].type === Types.custom_keyword;
                if (!isCustomKeyword){
                    if(!token[position + 1]){
                        returnData.push({color: "", data:"Unexpected end og line, expected variable name"});
                        return returnData;
                    }
                    returnData.push({color: "", data: `Unexpected token ${tokens[position+1].type}, expected variable name` });
                    return returnData;
                }
                const varName = tokens[position +1].value;

                const isEq = tokens[position + 2] && tokens[position+2].type === Types.operator && tokens[position+2].value === "eq";
                if(!isEq){
                    if(!token[position + 2]){
                        returnData.push({color: "", data:"Unexpected end og line, expected ="});
                        return returnData;
                    }
                    returnData.push({color: "", data: `Unexpected token ${tokens[position+1].type}, expected =` });
                    return returnData;
                }

                const isString = tokens[position + 3] && tokens[position + 3].type === Types.string;
                if(!isString){
                    if(!token[position + 3]){
                        returnData.push({color: "", data:"Unexpected end og line, expected string"});
                        return returnData;
                    }
                    returnData.push({color: "", data: `Unexpected token ${tokens[position+1].type}, expected string` });
                    return returnData;
                }
                
                if(varName in vars){
                    returnData.push({color: "", data: `variable ${varName} already exists` });
                    return returnData;
                }

                vars[varName] = tokens[position + 3].value;
                position += 4;
            }
            
            else {
                returnData.push({color: '\x1b[35m%s\x1b[0m', data: `Unexpected token ${token.type}`});
                return returnData;
            }
        }
        return returnData;
    }
}