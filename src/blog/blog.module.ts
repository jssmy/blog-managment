import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './entities/blog.entity';
import { ParseMongoIdPipe } from 'src/commons/pipes/parse-mongo-id/parse-mongo-id.pipe';
// import { Block, BlockSchema } from './entities/block.entity';
// import { Data, DataSchema } from './entities/data.entity';
// import { Meta, MetaSchema } from './entities/meta.entity';
// import { Item, ItemSchema } from './entities/item.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Blog.name,
        schema: BlogSchema,
      },
    ]),
  ],
  controllers: [BlogController],
  providers: [BlogService, ParseMongoIdPipe],
})
export class BlogModule {}
