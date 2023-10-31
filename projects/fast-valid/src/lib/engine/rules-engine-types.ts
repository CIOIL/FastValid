import { Rule ,Event } from "json-rules-engine";

export interface IIndex {
    [x: number]: boolean;
}[]

export interface EventWithIndex extends Event {
    params: {
        errorAtIndex?: IIndex  // not in use 
        formJsonPath?: string
        formPath?: string
      
    };
    type:string
}
// export class RuleInner extends Rule {

//     // was taken from json-rules-engine\dist\rule.js line 148
//     ruleEvent!: EventWithIndex
// }
