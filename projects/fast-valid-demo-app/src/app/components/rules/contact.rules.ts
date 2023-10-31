
  import { RuleProperties} from 'json-rules-engine'
  const contactDetailsRequired = {
    conditions: {
      "all": [
        {
          "value": '',
          "fact": "main",
          "path": "$.phone",
          "operator": "equal"
        },
        {
          "value": '',
          "fact": "main",
          "path": "$.phone2",
          "operator": "equal"
        },
        {
          "value": '',
          "fact": "main",
          "path": "$.cellphone",
          "operator": "equal"
        },
      ]
    },
    event: {
      type: 'contactDetailsRequired',
      params: {
        formPath: 'phone'
      }
    },
    name: 'contactDetailsRequired',
    priority: 1
  }
  
  export const contactDetailsRules: RuleProperties[] = [contactDetailsRequired];
  