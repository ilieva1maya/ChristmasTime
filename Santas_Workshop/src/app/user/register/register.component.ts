import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  constructor(private fb: FormBuilder){}

  form = this.fb.group({
    nickName: [''],
    email: [''],
    image: [''],
    passGroup: this.fb.group({
      password: [''],
      rePassword: [''],
    })
  })

  register(): void { 

    console.log(this.form.value)
  }
}

