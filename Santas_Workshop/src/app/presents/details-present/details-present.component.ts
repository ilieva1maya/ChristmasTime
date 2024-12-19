import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/api.service';
import { Present } from 'src/app/types/present';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-details-present',
  templateUrl: './details-present.component.html',
  styleUrls: ['./details-present.component.css']
})
export class DetailsPresentComponent implements OnInit {
  present = {} as Present;
  showEditMode: boolean = false;
  isOwner: boolean = false;
  id = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  };

  get user() {
    return this.userService.user?._id
  }

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
       
        if (this.present.owner == this.userService.user?._id) {
          this.isOwner = true;
        }
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
      console.log('Form invalid');
      return;
    }

    const { itemName, itemDescription, itemImage, itemCategory, itemStatus } = this.form.value;
    const owner = this.present.owner;

    this.apiService.updatePresent(itemName!, itemDescription!, itemImage!, itemCategory!, itemStatus!, this.id!, owner).subscribe({
      next: (updatedPresent) => {
        this.showEditMode = false;

        this.present = updatedPresent;
      },
      error: (error) => {
        console.error('Error updating present:', error);
      },
      complete: () => {
        console.log('Update process completed.');
      }
    });
  }

  finishPresent(): void {
    const owner = this.present.owner;
    this.apiService.deletePresent(this.id!);
  }
}