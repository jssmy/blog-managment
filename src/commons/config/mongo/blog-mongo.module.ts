import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ ConfigService],
            useFactory: (config: ConfigService)=> ({
                uri: `mongodb://${config.get('MONGO_INITDB_ROOT_USERNAME')}:${config.get('MONGO_INITDB_ROOT_PASSWORD')}@${config.get('MONGO_INITDB_HOST')}:${config.get('MONGO_INITDB_PORT')}/${config.get('MONGO_INITDB_DATABASE')}`,
                authSource: 'admin'
            })
        })
    ],
    exports: [
        MongooseModule
    ]
})
export class BlogMongoModule {}