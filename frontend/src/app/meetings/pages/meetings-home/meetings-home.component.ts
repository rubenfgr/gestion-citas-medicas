import { MeetingsService } from './../../services/meetings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meetings-home',
  templateUrl: './meetings-home.component.html',
  styles: [],
})
export class MeetingsHomeComponent implements OnInit {
  constructor(private meetingsService: MeetingsService) {}

  ngOnInit(): void {}
}
