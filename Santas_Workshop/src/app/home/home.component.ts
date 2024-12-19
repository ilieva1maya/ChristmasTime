import { Component, OnInit } from '@angular/core';
import { animate, keyframes, style, trigger, transition } from '@angular/animations';

interface Snowflake {
  state: string;
  style: {
    '--startX': string;
    '--startY': string;
    '--endX': string;
  };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fallingSnowflake', [
      transition(':enter', [
        style({
          opacity: 1,
          transform: 'translateX(var(--startX)) translateY(var(--startY))',
        }),
        animate(
          '10s linear',
          keyframes([
            style({
              opacity: 1,
              transform: 'translateX(var(--endX)) translateY(100vh)',
            }),
          ])
        ),
      ]),
      transition(':leave', [
        animate('0s', style({
          opacity: 0,
        })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  snowflakes: Snowflake[] = [];
  snowflakeCount: number = 80; 

  ngOnInit() {
    this.createSnowflakes();
    this.repeatFallingSnowflakes();
  }

  createSnowflakes() {
    for (let i = 0; i < this.snowflakeCount; i++) {
      const snowflake: Snowflake = {
        state: 'enter',
        style: {
          '--startX': `${Math.random() * 100}vw`,
          '--startY': `${Math.random() * 100}vh`,
          '--endX': `${Math.random() * 100}vw`,
        },
      };
      this.snowflakes.push(snowflake);
    }
  }

  repeatFallingSnowflakes() {
    setInterval(() => {
      this.snowflakes = [];
      this.createSnowflakes();
    }, 4000);
  }
}


