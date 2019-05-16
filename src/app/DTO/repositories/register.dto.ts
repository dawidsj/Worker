import {LoginDto} from './login.dto';
import {RegisterInterface} from '../interfaces/register.interface';

export class RegisterDto extends LoginDto implements RegisterInterface {
  public name: string;
  public password_confirmation: string;

}
