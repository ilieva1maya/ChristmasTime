import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Reservation } from 'src/app/types/reservation';
import { UserService } from 'src/app/user/user.service';
import { PresentService } from '../present.service';
import { ActivatedRoute } from '@angular/router';
import { Present } from 'src/app/types/present';

@Component({
  selector: 'app-reserve-present',
  templateUrl: './reserve-present.component.html',
  styleUrls: ['./reserve-present.component.css']
})
export class ReservePresentComponent implements OnInit {
  reservations: Reservation[] | null = [];
  present = {} as Present;
  showReserveMode: boolean = false;
  id = '';

  constructor(private apiService: ApiService,
    private fb: FormBuilder,
    private userService: UserService,
    private presentService: PresentService,
    private activeRoute: ActivatedRoute,
  ) { }

  get user() {
    return this.userService.user;
  };

  form = this.fb.group({
    reservationComment: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit(): void {
    this.apiService.getReservations().subscribe({
      next: (reservations) => {
        this.reservations = reservations;
      },
      error: (err) => {
        console.error('Error: ', err);
      }
    });
    this.activeRoute.params.subscribe((data) => {
      this.id = data['presentId'];
      this.apiService.getPresentById(this.id).subscribe((present) => {
        this.present = present;
      });
    });
  }

  createReservation(form: NgForm) {
    if (form.invalid) {
      return
    }
    const { reservationComment } = form.value;
    this.apiService.createReservation(reservationComment, this.user?.nickName!, this.user?._id!, this.present._id!);
  };
}
