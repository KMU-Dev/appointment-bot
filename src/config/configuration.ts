import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { resolve } from 'app-root-path';
import { plainToClass } from 'class-transformer';
import { AppointmentBotConfig } from './appointment-bot.config';
import { validate } from 'class-validator';
import { InvalidConfigError } from './invalid-config.error';
import { UnavailableConfigError } from './unavailable-config.error';

const YAML_CONFIG_NAME = 'config/config.yaml';

export async function configuration() {
    let yamlContent;
    try {
        yamlContent = readFileSync(resolve(YAML_CONFIG_NAME), 'utf-8');
    } catch (e) {
        throw new UnavailableConfigError(e);
    }

    // validate configuration
    const config = yaml.load(yamlContent) as Record<string, any>;
    const configObject = plainToClass(AppointmentBotConfig, config);
    const errors = await validate(configObject, { whitelist: true });

    if (errors.length > 0) throw new InvalidConfigError(errors);
    return configObject;
}
