import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmptyComponent } from './empty/empty.component';
import { AfterLoginComponent } from './after-login/after-login.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [EmptyComponent, AfterLoginComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit, OnDestroy {
  layout: any;

  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this._activatedRoute.pathFromRoot.forEach((path) => {
      if (path.routeConfig && path.routeConfig.data) {
        this.layout = path.routeConfig?.data['layout'];
      }
    });
  }
  ngOnDestroy(): void {}
}
