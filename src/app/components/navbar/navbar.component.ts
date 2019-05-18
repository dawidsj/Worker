import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {TokenService} from '../../services/token.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public tokenService: TokenService,
              public router: Router) { }

  public ngOnInit() {
    $(window).on('scroll', () => {
      if ($(window).scrollTop()) {
        $('nav').addClass('black');
      } else {
        $('nav').removeClass('black');
      }
    });
  }
  public logout() {
    this.tokenService.removeToken();
    this.router.navigateByUrl('');
  }
}
