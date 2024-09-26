import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import { IAuthenticate } from './interface/authenticate';
import { UserService } from 'src/user/user.service';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService) { }

    async authenticate(authenticateDto : AuthenticateDto): Promise<IAuthenticate> {
        const user = await this.userService.findByUserNameAndPassword(authenticateDto.userName, authenticateDto.password);
        if(!user) throw new NotFoundException('Invalid Credentials');
        const token = sign({ ...user, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }, process.env.SECRET_KEY);
        const iAuthenticate = {
            token: token,
            user: user
        }
        return iAuthenticate ;
    }
}
