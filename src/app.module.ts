import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { ConfigModule } from '@nestjs/config';
import { BlogMongoModule } from '@commons/config/mongo/blog-mongo.module';
import { TokenStrategyModule } from '@commons/strategy/token-strategy.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    TokenStrategyModule,
    BlogModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    BlogMongoModule,
    // Rate Limiting: Protección contra abuso de API
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // 1 segundo
        limit: 3, // 3 requests por segundo
      },
      {
        name: 'medium',
        ttl: 10000, // 10 segundos
        limit: 20, // 20 requests por 10 segundos
      },
      {
        name: 'long',
        ttl: 60000, // 1 minuto
        limit: 100, // 100 requests por minuto
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Aplicar rate limiting globalmente a todas las rutas
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
