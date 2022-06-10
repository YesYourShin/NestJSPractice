import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable() // JwtStrategy를 다른 곳에서도 주입을 해서 사용할 수 있게 하기 위해 사용
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    /*
            constructor에 UserRepository를 주입 시켜주는 이유는 
            나중에 토큰이 유효한지 확인한 다음에 payload안에 username으로 user객체를 database에서 가져오는데
            그 부분을 구현하기 위해서
        */
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      // auth.module.ts에 넣어준 거랑 똑같이 넣어줬음
      // 토큰이 유효한지 체크할 때 쓰는 부분
      secretOrKey: 'Secret1234',

      //토큰을 AuthHeader에서 가져오고 토큰이 BearerToken의 타입으로 넘어오는걸 가져와서 위에 secretkey로 유효한지 확인을 한다는 것
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // 위에서 토큰이 유효한지 체크가 되면 validate 메소드에서 payload에 있는 유저이름이 데이터베이스에 있는 유저인지 확인 후 있다면 유저 객체를 return 값으로 던져줌
  // return 값은 @UseGuards(AuthGuard())를 이용한 모든 요청의 Request Object에 들어감

  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
