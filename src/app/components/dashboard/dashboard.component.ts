import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private tokenService: TokenService, private router:Router) { }

  ngOnInit(): void {
    if (!this.tokenService.getToken()) {
      this.router.navigateByUrl('login');
    }
  }
  public logout() {
    this.tokenService.removeToken();
    this.router.navigateByUrl('');
  }
}
