
  import { RuleProperties} from 'json-rules-engine'
  const emailMatch = {
    conditions: {
      "all": [
        {
          "value": {
            "fact":"main",
            "path": "$.email"
          },
          "fact": "main",
          "path": "$.emailConfirm",
          "operator": "notEqual"
        }
      ]
    },
    event: {
      type: 'emailNotMatch',
      params: {
        formPath: 'emailConfirm'
      }
    },
    name: 'emailCheck',
    priority: 1
  }
  
  export const emailRules: RuleProperties[] = [emailMatch];
  