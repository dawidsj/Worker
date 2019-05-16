import {AuthenticateSuccesResponseInterface} from '../../interfaces/responses/authenticate.succes.response.interface';

export class AuthenticateSuccesResponseDto implements AuthenticateSuccesResponseInterface {
  public token: string;
}
