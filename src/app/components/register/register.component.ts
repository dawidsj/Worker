import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {RegisterDto} from '../../DTO/repositories/register.dto';
import {AuthenticateSuccessResponseDto} from '../../DTO/repositories/responses/authenticate.success.response.dto';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm = new RegisterDto();
  public error: string;

  constructor(private apiService: ApiService,
              private tokenService: TokenService,
              private router: Router,
              public viewContainerRef: ViewContainerRef,
              private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.router.navigateByUrl('dashboard');
    }
  }
  formSubmit(): void {
    console.log(this.registerForm);
    this.apiService.register(this.registerForm).subscribe(
      (data: AuthenticateSuccessResponseDto) => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  private handleResponse(data: AuthenticateSuccessResponseDto): void {
    $('#myLoginModal').click();
    this.tokenService.setToken(data.token);
    this.router.navigateByUrl('dashboard');
  }
  private handleError(data): void {
    this.spinner.hide();
    this.error = JSON.stringify(data.error.error);
  }
}
