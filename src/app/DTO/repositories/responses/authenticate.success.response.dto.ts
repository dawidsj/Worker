import {AuthenticateSuccessResponseInterface} from '../../interfaces/responses/authenticate.success.response.interface';

export class AuthenticateSuccessResponseDto implements AuthenticateSuccessResponseInterface {
  public token: string;
}
