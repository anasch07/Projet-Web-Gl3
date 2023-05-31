import { User } from 'src/user/user.entity';

export class LoginResponseDto {
    token: string;
    user: User;
  }
  