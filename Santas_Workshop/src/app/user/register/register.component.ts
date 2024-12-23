import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { emailValidator } from 'src/app/shared/utils/email-validator';
import { EMAIL_DOMAINS, VALID_URLS } from 'src/app/constants';
import { matchPasswordsValidator } from 'src/app/shared/utils/match-passwords-validator';
import { imageValidator } from 'src/app/shared/utils/image-validator';

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
    // image: ['', [Validators.required, imageValidator(VALID_URLS)]],  
    image: ['', [Validators.required]],
    height: ['', [Validators.required]],
    passGroup: this.fb.group({
      password: ['', [Validators.required,]],
      rePassword: ['', [Validators.required,]],
    }, {
      validators: [matchPasswordsValidator('password', 'rePassword')]
    }),
  })

  get passGroup() {
    return this.form.get('passGroup');
  }

  register(): void {

    if (this.form.invalid) {
      return;
    }

    const { nickName, email, image, height, passGroup: { password, rePassword } = {} } = this.form.value;
    this.userService.register(nickName!, email!, image!, Number(height!), password!, rePassword!).subscribe(() => {
      this.router.navigate(['/warehouse'])
    })
  }
}