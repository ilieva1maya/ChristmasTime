// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-details-present',
//   templateUrl: './details-present.component.html',
//   styleUrls: ['./details-present.component.css']
// })
// export class DetailsPresentComponent {

// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/api.service';
import { Present, UpdatePresent } from 'src/app/types/present';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-details-present',
  templateUrl: './details-present.component.html',
  styleUrls: ['./details-present.component.css']
})
export class DetailsPresentComponent implements OnInit {
  present = {} as Present;
  showEditMode: boolean = false;
  id = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder,
    private userService: UserService,    
  ) { }

  // get token(): string {
  //   return this.userService.user?.accessToken || '';
  // }

  form = this.fb.group({
    itemName: ['', [Validators.required]],
    itemDescription: ['', [Validators.required, Validators.minLength(10)]],
    itemImage: ['', [Validators.required]],
    itemCategory: ['', [Validators.required]],
    itemStatus: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      this.id = data['presentId'];
      this.apiService.getPresentById(this.id).subscribe((present) => {
        this.present = present;
      });
    });
  }

  onToggle(): void {
    const { itemName, itemDescription, itemImage, itemCategory, itemStatus } = this.present;
    this.form.setValue({
      itemName,
      itemDescription,
      itemImage,
      itemCategory,
      itemStatus
    });
    this.showEditMode = !this.showEditMode;
  }

  editPresent(): void {
    if (this.form.invalid) {
      console.log('Form invalid')
      return;
    }
    const { itemName, itemDescription, itemImage, itemCategory, itemStatus } = this.form.value;
    this.apiService.updatePresent(itemName!, itemDescription!, itemImage!, itemCategory!, itemStatus!, this.id!)
  }

  finishPresent(): void {
    console.log('Finish button clicked. Implement the finish functionality here.');
  }
}

