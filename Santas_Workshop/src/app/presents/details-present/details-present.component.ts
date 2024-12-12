// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-details-present',
//   templateUrl: './details-present.component.html',
//   styleUrls: ['./details-present.component.css']
// })
// export class DetailsPresentComponent {

// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-details-present',
  templateUrl: './details-present.component.html',
  styleUrls: ['./details-present.component.css']
})
export class DetailsPresentComponent implements OnInit {
  present: any;

  constructor(private activeRoute: ActivatedRoute, private apiService: ApiService,) { }

  ngOnInit(): void {
    // const presentId = this.activeRoute.snapshot.paramMap.get('presentId');
    // if (presentId) {
    //   this.apiService.getPresentById(presentId).subscribe((present) => {
    //     this.present = present;
    //   });
    // }

    this.activeRoute.params.subscribe((data) => {
      const id = data['presentId'];
      this.apiService.getPresentById(id).subscribe((present) => {
        this.present = present;
      });
    });
  }

  editPresent(): void {
    console.log('Edit button clicked. Implement the edit functionality here.');
    // Navigate to edit page or display editable fields
    // You can use routerLink or implement more logic for editing
  }

  finishPresent(): void {
    console.log('Finish button clicked. Implement the finish functionality here.');
    // Mark present as finished or implement necessary functionality
    this.present.status = 'Finished'; // Example of changing status
    // Optionally, call a service to update the present status on the server
  }
}

