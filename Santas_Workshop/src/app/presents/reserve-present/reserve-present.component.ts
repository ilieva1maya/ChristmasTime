import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Reservation } from 'src/app/types/reservation';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-reserve-present',
  templateUrl: './reserve-present.component.html',
  styleUrls: ['./reserve-present.component.css']
})
export class ReservePresentComponent implements OnInit {
  reservations: Reservation[] | null = [];
  showReserveMode: boolean = false;

  constructor(private apiService: ApiService,
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  get user() {
    return this.userService.user?._id
  }

  get present() {
    return this.apiService.getPresentById
  }

  form = this.fb.group({
    reservationComment: ['', [Validators.required, Validators.minLength(10)]],
  })

  ngOnInit(): void {
    this.apiService.getReservations().subscribe({
      next: (reservations) => {       
        this.reservations = reservations;
      },
      error: (err) => {
        console.error('Error: ', err)
      }
    })
  }

  createReservation(form: NgForm) {
    if (form.invalid) {
      return
    }

    const {reservationComment} = form.value;
    
    // this.apiService.createReservation(reservationComment, this.user!, presentId, reservationId)
    // .subscribe(()=>{
    //   this.router.navigate(['/warehouse'])
    // })

  }
}
