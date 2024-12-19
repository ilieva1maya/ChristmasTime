import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Reservation } from 'src/app/types/reservation';
import { UserService } from 'src/app/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Present } from 'src/app/types/present';

@Component({
  selector: 'app-reserve-present',
  templateUrl: './reserve-present.component.html',
  styleUrls: ['./reserve-present.component.css']
})
export class ReservePresentComponent implements OnInit {
  reservations: Reservation[] = [];
  present: Present = {} as Present;
  id: string = '';
  users: any = {};

  form = this.fb.group({
    reservationComment: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
  ) { }

  get user() {
    return this.userService.user;
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      this.id = data['presentId'];
      this.apiService.getPresentById(this.id).subscribe((present) => {
        this.present = present;
        console.log(this.present._id)
      });

      this.apiService.getReservations().subscribe({
        next: (reservations) => {
          const currentPresentId = this.id
          this.reservations = reservations.filter(reservation => reservation.presentId.toString() === currentPresentId);
          console.log(this.reservations)

          this.reservations.forEach(reservation => {
            console.log("Reservation NickName:", reservation.nickName);
          });
        },
        error: (err) => {
          console.error('Error fetching reservations: ', err);
        }
      });
    });
  }

  createReservation(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { reservationComment } = form.value;

    const nickName = this.user?.nickName;
    const userId = this.user?._id;

    this.apiService.createReservation(reservationComment, nickName!, userId!, this.present._id!).subscribe(() => {
      this.ngOnInit();
    });

    form.reset();
  }
}

