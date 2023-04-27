import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss'],
})
export class BlankLayoutComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  userName?: string;

  ngOnInit(): void {
    this.userName = this._AuthService.user.getValue().first_name;
  }

  logout(): void {
    localStorage.removeItem('_tokenNote');
    this._AuthService.user.next(null);
    this._Router.navigate(['/login']);
  }
}
