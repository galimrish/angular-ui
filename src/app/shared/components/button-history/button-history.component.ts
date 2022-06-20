import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-button-history',
  templateUrl: './button-history.component.html',
  styleUrls: ['./button-history.component.less']
})
export class ButtonHistoryComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  openHistory() {
    this.router.navigate(['history'], {relativeTo: this.route});
  }
}
