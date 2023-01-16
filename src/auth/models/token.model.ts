import { User } from 'src/users/entities/user.entity';

export interface PayloadToken {
  role: string;
  sub: number;
}
