import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('webhooks/line')
export class LineController {
    @Post()
    lineWebhook(@Req() req: Request) {
        console.log(req.body);
        // stuff here
    }
}
