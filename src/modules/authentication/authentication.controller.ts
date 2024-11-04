import { Controller, Get, Request } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';


@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Get('/strava/webhook')
  loginAndAnalysis(@Request() req: any) {
    return this.authenticationService.loginAndAnalysis(req.query.code);
  }
}
