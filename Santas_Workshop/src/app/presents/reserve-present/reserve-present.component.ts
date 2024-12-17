import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Reservation } from 'src/app/types/reservation';

@Component({
  selector: 'app-reserve-present',
  templateUrl: './reserve-present.component.html',
  styleUrls: ['./reserve-present.component.css']
})
export class ReservePresentComponent implements OnInit {
  reservations: Reservation[] | null = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getReservations().subscribe({
      next: (reservations) => {
        console.log(reservations);
        this.reservations = reservations;  
      },
      error: (err) => {
        console.error('Error: ', err)
      }
    })
  }
}
