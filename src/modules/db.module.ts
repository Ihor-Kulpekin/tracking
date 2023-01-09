import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigService} from "@nestjs/config";
import {ConfigurationModule} from "./configuration.module";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigurationModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('MONGODB_URL'),
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            inject: [ConfigService]
        })
    ]
})
export class DbModule {
}
