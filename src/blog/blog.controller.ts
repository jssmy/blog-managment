import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe, Put } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ParseMongoIdPipe } from 'src/commons/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetPayload } from 'src/commons/decorators/get-payload.decorators';
import { AccessTokenPayload } from 'src/commons/interfaces/access-token.payload';
import { BlogStage } from 'src/commons/enum/blog-stage.enum';
import { use } from 'passport';



@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(AuthGuard('access-token-strategy'))
  @Post()
  create(
    @Body() createBlogDto: CreateBlogDto,
    @GetPayload() payload: AccessTokenPayload
) {
    return this.blogService.create({
      ...createBlogDto,
      userId: payload.uid
    });
  }

  @UseGuards(AuthGuard('access-token-strategy'))
  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @UseGuards(AuthGuard('access-token-strategy'))
  @Get('own')
  getBlogsByUserId(
    @GetPayload() payload: AccessTokenPayload

  ) {
    return this.blogService.getBlogsByUserId(payload.uid);
  }

  @Get('public/:slug')
  findOne(
    @Param('slug') slug: string
  ) {
    return this.blogService.findOne(slug, BlogStage.PUBLIC);
  }

  // here auth access
  @UseGuards(AuthGuard('access-token-strategy'))
  @Get('draft/:slug')
  findOneDraft(
    @Param('slug') slug: string
  ) {
    return this.blogService.findOne(slug, BlogStage.DRAFT);
  }

  @UseGuards(AuthGuard('access-token-strategy'))
  @Put(':slug')
  update(@Param('slug') slug: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(slug, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
