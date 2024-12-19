import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  userLocation: any = null;
  errorMessage: string = '';

  constructor() { }

  ngOnInit(): void {
    this.getUserLocation();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
        },
        (error) => {
          this.errorMessage = 'Unable to retrieve your location: ' + error.message;
        }
      );
    } else {
      this.errorMessage = 'Geolocation is not supported by this browser.';
    }
  }
}

