import { User } from 'src/user/entities/user.entity';

export class LoginResponseDto {
    token: string;
    user: User;
  }
  