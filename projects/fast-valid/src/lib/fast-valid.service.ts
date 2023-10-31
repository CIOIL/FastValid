import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { RuleProperties, Engine, Rule, Almanac, RuleResult, Event } from 'json-rules-engine';
import { extractTemplatePath, filterOutErrorsByType, removeErrorFromControllers, resolveEventPathParam } from './engine/rules-engine-form-helpers';
import { EventWithIndex } from './engine/rules-engine-types';

@Injectable({
  providedIn: 'root'
})
export class FastValidService {

  engine = new Engine();
  private rules: RuleProperties[] = [];

  constructor() { }

  public loadRules(rules: RuleProperties[]) {
    this.rules = rules;

  }


  private removeErrors(event: EventWithIndex, f: FormGroup) {
    // check for previous errors success that need to be removed in this check
    let controlPaths: string[] = resolveEventPathParam(event.params.formJsonPath, event.params.formPath, true, event.params.errorAtIndex)

    removeErrorFromControllers(controlPaths, f, event.type)


  }

  private addErrors(event: EventWithIndex, f: FormGroup) {

    let controlPathsErrorsTurnOff: string[] = [];

    // step 1 - turn off validation that marked as false
    if (event.params.formJsonPath) {

      controlPathsErrorsTurnOff = extractTemplatePath(event.params.formJsonPath, false, event.params.errorAtIndex)
    }

    removeErrorFromControllers(controlPathsErrorsTurnOff, f, event.type)

    let controlPathsWithErrorTurnOn: string[] = resolveEventPathParam(event.params.formJsonPath, event.params.formPath, true, event.params.errorAtIndex)

    controlPathsWithErrorTurnOn.forEach(controlPath => {
      const control = f.get(controlPath);
      if (control === null) { console.error('not found control', controlPath); return };

      const errors: ValidationErrors = control.errors ? filterOutErrorsByType(control.errors, event.type) : {}
      console.log('previous errors on control to keep on', errors);

      // step 2 -  keep previous errors and add the new errors
      control.setErrors({
        ...control.errors,
        [event.type]: true
      })

    });


  }


  public rulesEngineRun(f: FormGroup) {
    const that = this;
    const engine = new Engine(this.rules.map(rule => new Rule({
      ...rule,
      onFailure: function (event: Event, almanac: Almanac, ruleResult: RuleResult) {
        /* when the rule fail we
            1- as practice we not add errors in 'onFailure' event!
                we add errors only on 'onSuccess' event
            2- we need to check for previous errors success that need to be removed in this check

        */
        that.removeErrors(event as EventWithIndex, f)


      },
      onSuccess: function (event: Event, almanac: any, ruleResult: any) {
        /* when the rule success we
          1- if the rule success for some array items in the same time it my fail for other array items
            so first we need to turn of validation that was previous success but in this cycle were failed
          2- we need to turn on errors success items
      */
        that.addErrors(event as EventWithIndex, f)
      }
    })), {
      allowUndefinedFacts: true
    });


    console.log('form raw data', f.value);
    const data = f.value;
    // 'main' will be the key inside the rule engine for the form  root
    return engine.run({ 'main': data }).then(() => engine.stop())
  }
}
