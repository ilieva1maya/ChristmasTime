import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-create-present',
  templateUrl: './create-present.component.html',
  styleUrls: ['./create-present.component.css']
})
export class CreatePresentComponent {
  constructor(private apiService: ApiService, private router: Router, private userService: UserService){}

  get owner(): string {
    return this.userService.user?._id || '';
  }

  createPresent(form: NgForm) {
    if(form.invalid) {      
      return
    }
    
    const {itemName, itemDescription, itemImage, itemCategory, itemStatus} = form.value;
    const owner = this.userService.user?._id

    this.apiService.createPresent(itemName, itemDescription, itemImage, itemCategory, itemStatus, this.owner).subscribe(()=>{
      this.router.navigate(['/warehouse'])
    })
  }
}

