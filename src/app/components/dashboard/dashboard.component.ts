import {AfterContentChecked, AfterContentInit, Component, OnInit} from '@angular/core';
import {TokenService} from '../../services/token.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterContentChecked {
  public name: string = 'Użytkowniku';
  public ownerBoards;
  public participantBoards;
  constructor(private tokenService: TokenService,
              private router: Router,
              private apiService: ApiService,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if (!this.tokenService.getToken()) {
      this.router.navigateByUrl('');
    }
    this.ownerBoards = this.route.snapshot.data.ownerBoards.body;
    this.participantBoards = this.route.snapshot.data.participantBoards.body;
    console.log(this.participantBoards);
    console.log(this.ownerBoards);
/*    this.apiService.getUser().subscribe(data => {
      this.name = data.body.user.name;
    });*/
  }
  ngAfterContentChecked(): void {
    this.spinner.hide();
  }
  public logout() {
    this.tokenService.removeToken();
    this.router.navigateByUrl('');
  }

}
