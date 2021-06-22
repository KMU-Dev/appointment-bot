import { Body, Controller, Post } from '@nestjs/common';

@Controller('webhooks/line')
export class LineController {
    @Post()
    lineWebhook(@Body() body: Record<string, any>) {
        console.log(body);
        // stuff here
    }
}
