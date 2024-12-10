import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Present } from 'src/app/types/present';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {
  presents: Present[] | null = [];

  arePresents = false;
  // isLoading: boolean = true;

  constructor(private api: ApiService, private userService: UserService) { }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  };

  get userId(): string {
    return this.userService.user?.userData.id || '';
  };

  ngOnInit(): void {
    this.api.getPresents().subscribe((presents) => {      

      if (presents) {
        this.arePresents = true;
        this.presents = presents;
      }
      
          

      // this.isLoading = false;
    })
  }
}


