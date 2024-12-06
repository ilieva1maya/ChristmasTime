import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create-present',
  templateUrl: './create-present.component.html',
  styleUrls: ['./create-present.component.css']
})
export class CreatePresentComponent {
  constructor(private apiService: ApiService, private router: Router){}

  createPresent(form: NgForm) {
    if(form.invalid) {
      return
    }
    
    const {itemName, itemDescription, itemImage, itemCategory} = form.value;

    console.log(`From create-present.component.ts: ${itemName}, ${itemDescription}, ${itemImage}, ${itemCategory}`)
    this.router.navigate(['/warehouse'])
    // this.apiService.createPresent(itemName, itemDescription, itemImage, itemCategory).subscribe(()=>{
    //   this.router.navigate(['/warehouse'])
    // })
  }
}

