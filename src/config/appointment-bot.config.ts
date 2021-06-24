import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsDefined,
    IsInstance,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsPositive,
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

export class LocaltunnelConfig {
    @IsString()
    @IsOptional()
    subdomain: string;
}

export class AppointmentBotConfig {
    @IsInt()
    @IsPositive()
    port: number;

    @ValidateNested()
    @IsInstance(ChannelsConfig)
    @Type(() => ChannelsConfig)
    channels: ChannelsConfig;

    @ValidateNested()
    @IsInstance(LocaltunnelConfig)
    @Type(() => LocaltunnelConfig)
    @IsOptional()
    localtunnel: LocaltunnelConfig;
}
