import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {TokenService} from '../../services/token.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {LoginDto} from '../../DTO/repositories/login.dto';
import {AuthenticateSuccessResponseDto} from '../../DTO/repositories/responses/authenticate.success.response.dto';
import * as $ from 'jquery';
import {RegisterComponent} from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/**/

export class LoginComponent implements OnInit {
  @ViewChild('registerComponent', { read: ViewContainerRef }) registerComponentRef;
  public form = new LoginDto();
  public error: string;
  public showRegister: boolean = false;
  constructor(private apiService: ApiService,
              private router: Router,
              private tokenService: TokenService,
              private spinner: NgxSpinnerService,
              private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.router.navigateByUrl('dashboard');
      /**/
    }
  }

  loadComponent() {
    this.showRegister = true;
    const factory = this.componentFactoryResolver.resolveComponentFactory(RegisterComponent);
    const ref = this.registerComponentRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
  }
  onSubmit(): void {
    this.spinner.show();
    this.apiService.login(this.form).subscribe(
      (data: AuthenticateSuccessResponseDto) => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  private handleResponse(data: AuthenticateSuccessResponseDto): void {
    console.log(data.token);
    $('#myLoginModal').click();
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
