import { MeetingsService } from './../../services/meetings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meetings-home',
  templateUrl: './meetings-home.component.html',
  styles: [],
})
export class MeetingsHomeComponent implements OnInit {
  constructor(private meetingsService: MeetingsService) {}

  ngOnInit(): void {
    /* this.meetingsService.findAll().subscribe((res) => {
      console.log(res);
    }); */
    /* this.meetingsService
      .create({
        contractId: 1,
        date: new Date('2021-10-10'),
        examsRequired: 5,
      })
      .subscribe((res) => {
        console.log(res);
      }); */
    /* this.meetingsService
      .update(1, {
        date: new Date('2021-10-10'),
        examsRequired: 5,
      })
      .subscribe((res) => console.log(res)); */
    /* this.meetingsService
      .removeOrActive(1, false)
      .subscribe((res) => console.log(res)); */
  }
}
