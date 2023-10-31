import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { contactDetailsRules } from '../rules/contact.rules';
import { FastValidService } from 'fast-valid';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(private fastValidService: FastValidService) { }

  contactDetails: FormGroup = new FormGroup({
    phone: new FormControl('', [Validators.pattern('[0-9]+')]),
    phone2: new FormControl('', [Validators.pattern('[0-9]+')]),
    cellphone: new FormControl('', [Validators.pattern('[0-9]+')]),
  });

  get phone() {
    return this.contactDetails?.controls['phone']
  }

  get phone2() {
    return this.contactDetails?.controls['phone2']
  }
  get cellphone() {
    return this.contactDetails?.controls['cellphone']
  }



  ngOnInit(): void {
    this.fastValidService.loadRules(contactDetailsRules);
    this.contactDetails.valueChanges.subscribe(res => {


      this.fastValidService.rulesEngineRun(this.contactDetails);


    })
  }

}
