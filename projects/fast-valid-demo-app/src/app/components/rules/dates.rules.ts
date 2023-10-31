import { RuleProperties} from 'json-rules-engine';


const datesRule = {
    conditions: {
      all: [
        {
          fact: 'main',
          operator: 'arrayItemEqualToFollowingArrayItem',
          path: '$.startDates',
  
          value: {
            "fact": "main",
            path: '$.endDates'
          }
        }
      ]
    },
    event: {
      type: 'tkufotArrayItemEqualToFollowingArrayItem',
      params: {
        formJsonPath: 'startDates'
      }
    },
    name: 'datesArrayName',
    priority: 1
  };
  export const datesRules: RuleProperties[] = [datesRule];