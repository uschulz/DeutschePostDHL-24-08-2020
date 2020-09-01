import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthFacade } from '../../store/facades/auth.facade';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private af: AuthFacade) {}

  registerForm: FormGroup;

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      passwords: new FormGroup(
        {
          password: new FormControl('', [
            Validators.required,
            Validators.minLength(4)
          ]),
          passwordRepeat: new FormControl('', [Validators.required])
        },
        { validators: this.passwordsMatch }
      )
    });
  }

  registerUser(form: FormGroup) {
    const usr = {
      email: form.value.email,
      password: form.value.passwords.password
    };
    this.af.register(usr);
  }

  passwordsMatch(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('passwordRepeat').value) {
      return { invalid: true };
    }
  }
}
