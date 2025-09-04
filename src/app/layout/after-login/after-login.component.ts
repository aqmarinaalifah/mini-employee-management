import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { navigationData } from './navigation';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'after-login-layout',
  standalone: true,
  imports: [RouterOutlet, MenubarModule, MenuModule],
  templateUrl: './after-login.component.html',
  styleUrl: './after-login.component.scss',
})
export class AfterLoginComponent implements OnInit {
  items: MenuItem[] = navigationData;
  userMenu!: MenuItem[];

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.userMenu = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  logout(): void {
    localStorage.clear();
    this._router.navigate(['/login']);
  }
}
