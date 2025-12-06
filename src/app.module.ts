import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BlogMongoModule } from '@commons/config/mongo/blog-mongo.module';
import { TokenStrategyModule } from '@commons/strategy/token-strategy.module';

@Module({
  imports: [
    TokenStrategyModule,
    BlogModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    BlogMongoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
