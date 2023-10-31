import { Component, OnInit } from '@angular/core';

import { emailRules } from '../rules/email.rules'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FastValidService } from 'fast-valid';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  emailForm: FormGroup<{ email: FormControl<string | null>, emailConfirm: FormControl<string | null> }> = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    emailConfirm: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor(private fastValidService: FastValidService) {

  }

  ngOnInit(): void {
    this.emailForm.valueChanges.subscribe(res => {
      this.fastValidService.rulesEngineRun(emailRules, this.emailForm);
    });
  }
}
