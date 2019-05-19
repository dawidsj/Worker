import {Component, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
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
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  // Keep track of list of generated components for removal purposes
  components = [];

  // Expose class so that it can be used in the template
  registerComponentClass = RegisterComponent;
  loginComponentClass = LoginComponent;

  constructor(public tokenService: TokenService,
              public router: Router,
              private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  public ngOnInit() {
    $(window).on('scroll', () => {
      if ($(window).scrollTop()) {
        $('nav').addClass('black');
      } else {
        $('nav').removeClass('black');
      }
    });
  }

  /**
   * Loads given component
   * @param {string} component
   */
  loadComponent(component: string) {
    this.removeComponent(this.registerComponentClass);
    this.removeComponent(this.loginComponentClass);

    if (component === 'login') {
      this.addComponent(this.loginComponentClass);
    } else if (component === 'register') {
      this.addComponent(this.registerComponentClass);
    }
  }

  /**
   * Injects given component
   * @param {Type<any>} componentClass
   */
  addComponent(componentClass: Type<any>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = this.container.createComponent(componentFactory);

    // Push the component so that we can keep track of which components are created
    this.components.push(component);
  }

  /**
   * Removes given component
   * @param {Type<any>} componentClass
   */
  removeComponent(componentClass: Type<any>) {
    // Find the component
    const component = this.components.find((component) => component.instance instanceof componentClass);
    const componentIndex = this.components.indexOf(component);

    if (componentIndex !== -1) {
      // Remove component from both view and array
      this.container.remove(this.container.indexOf(component));
      this.components.splice(componentIndex, 1);
    }
  }

  public logout() {
    this.tokenService.removeToken();
    this.router.navigateByUrl('');
  }
}
