import { Controller,Post, Body } from '@nestjs/common';
import { SmsService } from './sms.service';

@Controller('sms')
export class SmsController {

    constructor(private smsService:SmsService){}

    @Post('test')
  async sendTestSms(
    @Body() body: {
      number: string;
      message: string;
    },
  ) {

    return this.smsService.sending(
      body.number,
      body.message,
    );
  }
}

