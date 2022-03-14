import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Crypto } from '../../common/utils/crypto';
import { CreateUser } from '../users/create-user.dto';
import { IUser } from '../users/user.interface';
import { UsersService } from '../users/users.service';

export interface IPayloadReqUser {
  id: number;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<IUser | null> {
    const user = await this.usersService.findOneByUsernameWithPassword(
      username,
    );
    if (!user) return null;

    const isPwdValid = await Crypto.comparePassword(password, user.password);
    if (isPwdValid) {
      return user;
    }
    return null;
  }

  async login(user: IUser) {
    const payload: IPayloadReqUser = {
      username: user?.username,
      id: user?.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUser) {
    this.usersService.insertUser(user);
  }
}
