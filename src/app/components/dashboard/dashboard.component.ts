import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public name: string = 'Użytkowniku';
  public ownerBoards;
  constructor(private tokenService: TokenService,
              private router: Router,
              private apiService: ApiService) { }

  ngOnInit(): void {
    if (!this.tokenService.getToken()) {
      this.router.navigateByUrl('login');
    }
    this.apiService.getUser().subscribe(data => {
      this.name = data.body.user.name;
    });
    this.apiService.getOwnerBoards().subscribe(data => {
      console.log(data);
    });
  }
  public logout() {
    this.tokenService.removeToken();
    this.router.navigateByUrl('');
  }

}
