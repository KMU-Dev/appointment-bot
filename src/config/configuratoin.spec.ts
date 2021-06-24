import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { AppointmentBotConfig } from './appointment-bot.config';
import { configuration } from './configuration';
import { InvalidConfigError } from './invalid-config.error';
import { UnavailableConfigError } from './unavailable-config.error';

const validConfig = plainToClass(AppointmentBotConfig, {
    port: 3000,
    channels: {
        line: {
            enabled: true,
            path: '/webhook/line',
            accessToken: 'access token',
            channelSecret: 'secret',
        },
    },
});

describe('configuration', () => {
    it('should return an configuration object', async () => {
        jest.spyOn(fs, 'readFileSync').mockImplementation(() =>
            yaml.dump(validConfig),
        );
        expect(await configuration()).toStrictEqual<AppointmentBotConfig>(
            validConfig,
        );
    });

    it('should return an configuration object when addition property is set', async () => {
        const wrongConfig = plainToClass(AppointmentBotConfig, {
            port: 3000,
            channels: {
                line: {
                    enabled: true,
                    path: '/webhook/line',
                    accessToken: 'access token',
                    channelSecret: 'secret',
                },
            },
            key: 'value', // The different site
        });

        jest.spyOn(fs, 'readFileSync').mockImplementation(() =>
            yaml.dump(wrongConfig),
        );
        expect(await configuration()).toStrictEqual<AppointmentBotConfig>(
            validConfig,
        );
    });

    it('should throw InvalidConfigError if invalid configuration provided', async () => {
        const wrongConfig = plainToClass(AppointmentBotConfig, {
            channels: {
                line: {
                    enabled: true,
                    path: '/webhook/line',
                    accessToken: 10,
                    channelSecret: 'secret',
                },
            },
        });

        jest.spyOn(fs, 'readFileSync').mockImplementation(() =>
            yaml.dump(wrongConfig),
        );
        await expect(configuration()).rejects.toThrow(InvalidConfigError);
    });

    it('should throw UnavailableConfigError if readFileSync throws error', async () => {
        jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
            throw new Error();
        });
        await expect(configuration()).rejects.toThrow(UnavailableConfigError);
    });
});
