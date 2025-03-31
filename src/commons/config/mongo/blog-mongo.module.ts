import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ ConfigService],
            useFactory: (config: ConfigService)=> {
                const password = encodeURIComponent(config.get('MONGO_INITDB_ROOT_PASSWORD'));
                const uri = `mongodb://${config.get('MONGO_INITDB_ROOT_USERNAME')}:${password}@${config.get('MONGO_INITDB_HOST')}:${config.get('MONGO_INITDB_PORT')}/${config.get('MONGO_INITDB_DATABASE')}`;
                return  {
                        uri,
                        authSource: 'admin'
                }
            }
        })
    ],
    exports: [
        MongooseModule
    ]
})
export class BlogMongoModule {}