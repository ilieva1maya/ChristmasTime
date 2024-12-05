import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { emailValidator } from 'src/app/shared/utils/email-validator';
import { EMAIL_DOMAINS } from 'src/app/constants';
import { matchPasswordsValidator } from 'src/app/shared/utils/match-passwords-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  form = this.fb.group({
    nickName: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, emailValidator(EMAIL_DOMAINS)]],
    image: ['', [Validators.required]],
    // password: ['', [Validators.required, matchPasswordsValidator('password', 'rePassword')]],
    // rePassword: ['', [Validators.required, matchPasswordsValidator('password', 'rePassword')]],
    passGroup: this.fb.group({
      password: ['', [Validators.required, ]],
      rePassword: ['', [Validators.required, ]],
    }, {
      validators: [matchPasswordsValidator('password', 'rePassword')]
    }),
  })

  get passGroup() {
    return this.form.get('passGroup');
  }

  register(): void {

    if (this.form.invalid) {
      console.log('Form invalid')
      return;
    }

    console.log('Form valid')

    // const {nickName, email, image, passGroup: {password, rePassword} = {}} = this.form.value;    
    // this.userService.register(nickName!, email!, image!, password!, rePassword!).subscribe(()=>{
    //   this.router.navigate(['/warehouse'])
    // })
  }
}

