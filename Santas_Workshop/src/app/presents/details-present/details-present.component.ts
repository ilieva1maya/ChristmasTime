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
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/api.service';
import { Present, UpdatePresent } from 'src/app/types/present';

@Component({
  selector: 'app-details-present',
  templateUrl: './details-present.component.html',
  styleUrls: ['./details-present.component.css']
})
export class DetailsPresentComponent implements OnInit {
  present = {} as Present;
  showEditMode: boolean = false;

  // updatePresent: UpdatePresent = {
  //   itemName: '',
  //   itemDescription: '',
  //   itemImage: '',
  //   itemCategory: '',
  //   itemStatus: '',
  // }

  constructor(private activeRoute: ActivatedRoute, private apiService: ApiService, private fb: FormBuilder) { }

  form = this.fb.group({
    itemName: ['', [Validators.required]],
    itemDescription: ['', [Validators.required, Validators.minLength(10)]],
    itemImage: ['', [Validators.required]],
    itemCategory: ['', [Validators.required]],
    itemStatus: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const id = data['presentId'];
      this.apiService.getPresentById(id).subscribe((present) => {
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
    console.log(this.form);
  }

  editPresent(): void {

    console.log(this.form);


    // if(this.form.invalid) {
    //   return;
    // }

    // this.updatePresent = this.form.value as UpdatePresent;
    // const {itemName, itemDescription, itemImage, itemCategory, itemStatus} = this.updatePresent;

    // this.apiService.updatePresent(itemName, itemDescription, itemImage, itemCategory, itemStatus).subscribe(()=>{
    //   console.log("From edit function",itemName, itemDescription, itemImage, itemCategory, itemStatus)
    // });    

  }

  finishPresent(): void {
    console.log('Finish button clicked. Implement the finish functionality here.');

  }
}

