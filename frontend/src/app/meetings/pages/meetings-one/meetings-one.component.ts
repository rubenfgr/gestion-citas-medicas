import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meetings-one',
  templateUrl: './meetings-one.component.html',
  styleUrls: ['./meetings-one.component.scss']
})
export class MeetingsOneComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
    })
  }

}
