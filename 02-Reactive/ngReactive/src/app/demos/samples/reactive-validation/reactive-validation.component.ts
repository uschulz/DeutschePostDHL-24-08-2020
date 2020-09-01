import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { emptyPerson, wealthOpts } from '../empty-person';
import { Person } from '../person.model';
import { PersonService } from '../person.service';
import { AsyncMailExistsValidator } from './asyncMailExistsValidator';

@Component({
  selector: 'app-reactive-validation',
  templateUrl: './reactive-validation.component.html',
  styleUrls: ['./reactive-validation.component.scss'],
})
export class ReactiveValidationComponent implements OnInit {
  person: Person = emptyPerson;
  wealthOpts = wealthOpts;

  personForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ps: PersonService,
    private mailExistsValidator: AsyncMailExistsValidator
  ) {}

  ngOnInit() {
    this.loadData();
    this.initForm();
    this.subscribeChanges();
  }

  private loadData() {
    this.ps.getPerson().subscribe((p) => {
      this.personForm.setValue(p);
    });
  }

  private initForm() {
    this.personForm = this.fb.group({
      name: [
        this.person.name,
        [Validators.required, Validators.minLength(4), this.validateName],
      ],
      age: [this.person.age, [Validators.min(18), Validators.max(99)]],
      gender: [this.person.gender],
      email: [
        this.person.email, //Model Val
        [Validators.required, Validators.email], //Sync Validators
        [this.mailExistsValidator], //Async Val
        { updateOn: 'blur' },
      ],
      wealth: [this.person.wealth],
    });
  }

  private subscribeChanges() {
    this.personForm.valueChanges.subscribe((vals) => {
      console.log('changes happening @form: ', vals);
    });
  }

  savePerson(personForm): void {
    this.ps.save(personForm);
  }

  //Sample for custom sync Validator
  validateName(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Hugo') {
      return { nameError: true };
    }
    return null;
  }

  violatesMinLenght() {
    let result = false;
    const errs: ValidationErrors = this.personForm.controls.name.errors;

    if (errs != null) {
      console.log('Errors in Name field: ', errs);
      if (errs.minlength) {
        result = true;
      }
    }
    return result;
  }

  validateForm() {
    this.personForm.updateValueAndValidity();
    this.personForm.controls.name.updateValueAndValidity();
  }
}
