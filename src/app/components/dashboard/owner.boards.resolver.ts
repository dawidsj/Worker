import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class OwnerBoardsResolver implements Resolve<any> {
  constructor(private apiService: ApiService,
              private spinner: NgxSpinnerService) {}

  resolve(route: ActivatedRouteSnapshot) {

    return this.apiService.getOwnerBoards();
  }
}
