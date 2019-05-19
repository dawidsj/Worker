import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import * as $ from 'jquery';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';
import {RegisterComponent} from '../register/register.component';
import {LoginComponent} from '../login/login.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('loginComponent', { read: ViewContainerRef }) loginComponentRef;
  @ViewChild('registerComponent', { read: ViewContainerRef }) registerComponentRef;
  public showLogin: boolean = false;
  public showRegister: boolean = false;
  constructor(public tokenService: TokenService,
              public router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  public ngOnInit() {
    $(window).on('scroll', () => {
      if ($(window).scrollTop()) {
        $('nav').addClass('black');
      } else {
        $('nav').removeClass('black');
      }
    });
    $(function() {
      if ($('body').hasClass('modal-open')) {
        alert('x');
      }
    });
    window.setInterval(function() {
      $(function() {
        if ($('#myLoginModal').hasClass('show')) {
          alert('x');
        }
      });
    }, 5000);
    /*$('#myLoginModal').hasClass('show') {
      /!*$(".modal-body").html("");*!/
      alert('x');
    };*/
/*    $(!'#modalContent').on('click', function(){
      alert('x');
    });*/
  }
  loadLogin() {
    this.showLogin = true;
    const factory = this.componentFactoryResolver.resolveComponentFactory(LoginComponent);
    const ref = this.loginComponentRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
  }
  loadRegister() {
    this.showRegister = true;
    const factory = this.componentFactoryResolver.resolveComponentFactory(RegisterComponent);
    const ref = this.registerComponentRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
  }
  public logout() {
    this.tokenService.removeToken();
    this.router.navigateByUrl('');
  }
}
