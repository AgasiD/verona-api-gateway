import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy } from '@nestjs/microservices';
import { LoginAuthDto } from './dto/login-auth.dto';
import { firstValueFrom } from 'rxjs';
import { handleHttpErrors } from 'src/common/exceptions/http-expeptions';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Post('/login')
  async login(@Body() loginAuthDTO: LoginAuthDto) {
    try {
      return await firstValueFrom(this.client.send('auth.login', loginAuthDTO))
    } catch (err) {
      console.log(err)
      handleHttpErrors(err)
    }
  }

  @Post('/fullfill')
  async fulfill() {
    try {
      return await firstValueFrom(this.client.emit('auth.fullfillAuth', {}))
    } catch (err) {
      console.log(err)
      handleHttpErrors(err)
    }
  }

}
