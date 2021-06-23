import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsDefined,
    IsInstance,
    IsNotEmpty,
    IsString,
    ValidateNested,
} from 'class-validator';

export class LineConfig {
    @IsDefined()
    @IsBoolean()
    enabled: boolean;

    @IsNotEmpty()
    @IsString()
    path: string;

    @IsNotEmpty()
    @IsString()
    accessToken: string;

    @IsNotEmpty()
    @IsString()
    channelSecret: string;
}

export class ChannelsConfig {
    @ValidateNested()
    @IsInstance(LineConfig)
    @Type(() => LineConfig)
    line: LineConfig;
}

export class AppointmentBotConfig {
    @ValidateNested()
    @IsInstance(ChannelsConfig)
    @Type(() => ChannelsConfig)
    channels: ChannelsConfig;
}
