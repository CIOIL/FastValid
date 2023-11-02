# Fast valid

Welcome to the "Fast valid" repository, an integral part of the Israeli Government's Open Source Software Library!

## Overview

This open-source project provides a streamlined Angular wrapper library for JSON-RULES-ENGINE.

### Under the Hood

This utility is a TypeScript wrapper designed to seamlessly integrate the [json-rules-engine](https://github.com/CacheControl/json-rules-engine) JavaScript library with Angular forms. The project originates from an ISC License.

## Features

- Facilitates the creation of intricate cross-field form validations.
- Upholds the principle of Separation of Concerns by abstracting form logic from Angular components.
- Offers readability and understandability of cross-field validation logic for non-programmers, including QA professionals and project managers.

## When to Use

This library is geared towards cross-field validations, such as matching an "email" field with an "emailConfirm" field. It is not suitable for single-field validations like "Validators.required".

## Getting Started

### Installation

To install the library, run the following command in your Angular project's root directory:

`npm i @cioil/fast-valid`

### import FastValid module into @NgModule imports

```typescript
import { FastValidModule } from 'fast-valid';

@NgModule({
  ...
  imports: [
    ...
    FastValidModule
  ],
  ...
})
```

Inject FastValidService in the components that host the form
```typescript
  constructor(private fastValidService: FastValidService) { }
```

Register the validation engine on your form (on every chage, for example):
```typescript
ngOnInit(): void {
    this.fastValidService.loadRules(contactDetailsRules);
    this.contactDetails.valueChanges.subscribe(res => {
      this.fastValidService.rulesEngineRun(this.contactDetails);
    })
  }
```

### Define your rules

You can either import rules in JSON format or define them as hardcoded JavaScript objects. Even without pre-defined rules, you can still initialize the Rules Engine.

### Usage
 
- define the Rule in a Json format or JS object
- inside your angular component initialize the Rules Engine ,pass the relevant rules for the specific form
 and call it whatever you want
 - call the Engine inside Observable pipe


### Defining rules Example

define the rule . the $ sign is the define main root object path  
to learn more bout how to define rules read the Json rule Engine Docs.

```
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
```


## Documentation
first - for understand the base rules-engine see in their repo 
 [json-rules-engine](https://github.com/CacheControl/json-rules-engine)  
see in documentations and example folder in ths repo


## Acknowledgments


Our deepest appreciation goes to the creators of the original library. Their significant contributions have been instrumental in shaping our tailored solution.

# ROADMAP

now we have the ability to run validation on angular forms array but we dont have the ability to response the array index with teh error.
we want to add the ability to add the validation error in the accurate  array index.

## Contributions

Feel free to contribute, report issues, or share your feedback to help us improve "json-rules-engine-angular-ITA". We appreciate your support!

## License

This project is licensed under the MIT License - see the [ISC](https://www.isc.org/licenses/) file for details.



