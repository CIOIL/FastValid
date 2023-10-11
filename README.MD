#

# json-rules-engine-angular-ITA

Welcome to the "json-rules-engine-angular-ITA" repository, an integral part of the Israeli Government's Open Source Software Library!

## Overview

This open-source project provides two main offerings:

1. A streamlined Angular wrapper library for JSON-RULES-ENGINE.
2. A single-file bundle for vanilla JavaScript projects.

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

`npm install json-rules-engine-angular-ITA`

### import functions in your components

`import { createEngineAndOperator } from 'json-rules-engine-angular-ita';`

### Define your rules

You can either import rules in JSON format or define them as hardcoded JavaScript objects. Even without pre-defined rules, you can still initialize the Rules Engine.

### call the initialize function
` this.operatorEngine = createEngineAndOperator(rules, this.form).operatorEngine;`


The `createEngineAndOperator` function returns an object containing two keys: `engine` and `operatorEngine`. If you need to later access the Rules Engine to, for instance, add more rules, you can destructure the object as follows:

`({ operatorEngine: this.operatorEngine, engine: this.engine } = createEngineAndOperator(rules, this.form).operatorEngine;`

### Implement the Operator

` this.form.valueChanges.pipe(this.operatorEngine).subscribe((res) => {
    });`



### Usage
 
- define the Rule in a Json format or JS object
- inside your angular component initialize the Rules Engine ,pass the relevant rules for the specific form
 and call it whatever you want
 - call the Engine inside Observable pipe


### Example

define the rule . the $ sign is the define main root object path  
to learn more bout how to define rules read the Json rule Engine Docs.


```
  import { RuleProperties} from 'json-rules-engine-angular-ita
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

```
import { Component, OnInit } from '@angular/core';
import {emailRules} from '../rules/email.rules'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OperatorFunction } from 'rxjs';
import { createEngineAndOperator } from 'json-rules-engine-angular-ita';
import { Engine } from 'json-rules-engine';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  operatorEngine:OperatorFunction<unknown, Engine>;

  emailForm: FormGroup<{
    email: FormControl<string | null>;
    emailConfirm: FormControl<string | null>;
  }> = new FormGroup({
    email: new FormControl('', [Validators.required]),
    emailConfirm: new FormControl('', [Validators.required]),
  });

  constructor() {
    this.operatorEngine = createEngineAndOperator(emailRules, this.emailForm).operatorEngine;
  }

  
  ngOnInit(): void {
    this.emailForm.valueChanges.pipe(this.operatorEngine).subscribe((res) => {
    });
  }
}





```

```
<p>sample-email</p>
<section>
    <div [formGroup]=emailForm class="form-group">
        <div class="form-control">
            <label for="">Email</label>
            <input type="text" formControlName="email">
          
        </div>
        <div>error list:  {{emailForm.controls.email.errors|json}}</div>
        <div *ngIf="emailForm.controls.email.errors?.required" class="error">
            חובה להכניס כתובת מייל
        </div>

        <div class="form-control">
            <label for="">Confirm Email</label>
            <input type="text" formControlName="emailConfirm">

        </div>
        <div>error list:  {{emailForm.controls.emailConfirm.errors|json}} </div>

        <div *ngIf="emailForm.controls.emailConfirm.errors?.emailNotMatch" class="error">
            כתובת מייל לא תואמת
        </div>

    </div>
</section>
<hr>
{{emailForm.value|json}}

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



