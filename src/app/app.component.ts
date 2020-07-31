import {Component, OnDestroy, OnInit} from '@angular/core';
import Tg from './Tg';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  title = 'angular-tdweb-starter';

  constructor(private tg: Tg) {}

  ngOnInit(): void {
    this.subscriptions.push(this.tg.update$.subscribe(update => console.log(update)));
    this.tg.setTdLibParametrs();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
