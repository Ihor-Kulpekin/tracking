import {DynamicModule, Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {ConfigOptions} from "../services/config/interfaces/config-options.interface";
import {CONFIG_OPTIONS} from "../common/constants";
import {ConfigService} from "../services/config/config.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './development.env'
        })
    ]
})
export class ConfigurationModule {
    static register(options: ConfigOptions): DynamicModule {
        return {
            module: ConfigModule,
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options
                },
                ConfigService
            ],
            exports: [ConfigService]
        }
    }
}
