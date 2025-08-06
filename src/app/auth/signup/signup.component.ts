import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';

let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-signup-form');
if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  ngOnInit() {
    this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        localStorage.setItem(
          'saved-signup-form',
          JSON.stringify({ email: value.email })
        );
      },
    });
  }

  get emailIsInvalid() {
    return (
      this.form.controls.email.invalid &&
      this.form.controls.email.touched &&
      this.form.controls.email.dirty
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.invalid &&
      this.form.controls.password.touched &&
      this.form.controls.password.dirty
    );
  }

  onSubmit() {
    console.log(this.form.controls.email.value);
    console.log(this.form.controls.password.value);
  }

  onReset() {
    this.form.reset();
  }
}
