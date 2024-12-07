import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/utils/email-validator';
import { UserService } from '../user.service';
import { EMAIL_DOMAINS } from 'src/app/constants';
import { ProfileDetails } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
// export class ProfileComponent implements OnInit{
  export class ProfileComponent {
  showEditMode: boolean = false;

  profileDetails: ProfileDetails = {
    nickName: '',
    email: '',
    image: '',
    height: 0,
  }

  constructor(private fb: FormBuilder, private userService: UserService) { }

  form = this.fb.group({
    nickName: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, emailValidator(EMAIL_DOMAINS)]],
    image: [''],
    height: [0],
  })

  //   ngOnInit(): void {
  //   const {nickName, email, image, height} = this.userService.user!;

  //   this.profileDetails = {
  //     nickName,
  //     email,
  //     image,
  //     height
  //   }

  //   this.form.setValue({
  //     nickName,
  //     email,
  //     image,
  //     height
  //   })
  // }

  onToggle(): void {
    this.showEditMode = !this.showEditMode;
  }

  saveProfileHandler(): void {
    if(this.form.invalid) {
      return;
    }

    this.profileDetails = this.form.value as ProfileDetails;
    const {nickName, email, image, height} = this.profileDetails;

    console.log(nickName, email, image, height)
    this.onToggle()

    // this.userService.updateProfile(nickName, email, image, height).subscribe(()=>{
    //   this.onToggle();
    // });    
  }

  onCancel(e: Event) {
    e.preventDefault()
    this.onToggle()
  }
}
