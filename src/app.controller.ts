import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
export type WebhookBody = {
  url: string;
  bodyData: Record<string, any>;
};
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/webhook')
  webhook(@Body() body: WebhookBody) {
    const { url, bodyData } = body;
    console.log(body);
    axios.post(url, bodyData).then((v) => {
      console.log(v.data);
    });
  }
  @Get()
  hello() {
    return 'hello world';
  }
}
