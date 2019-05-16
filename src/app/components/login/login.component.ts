import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {TokenService} from '../../services/token.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {LoginDto} from '../../DTO/repositories/login.dto';
import {AuthenticateSuccesResponseDto} from '../../DTO/repositories/responses/authenticate.succes.response.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form = new LoginDto();
  public error: string;

  constructor(private apiService: ApiService,
              private router: Router,
              private tokenService: TokenService,
              private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.router.navigateByUrl('dashboard');
    }
  }

  onSubmit(): void {
    this.spinner.show();
    this.apiService.login(this.form).subscribe(
      (data: AuthenticateSuccesResponseDto) => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  private handleResponse(data: AuthenticateSuccesResponseDto): void {
    console.log(data.token);
    this.tokenService.setToken(data.token);
    this.router.navigateByUrl('dashboard');
    this.spinner.hide();
    console.log(this.tokenService.getToken());
  }

  private handleError(data): void {
    this.spinner.hide();
    this.error = JSON.stringify(data.error.error);
  }
}
