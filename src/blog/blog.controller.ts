import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  Put,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { QueryBlogDto } from './dto/query-blog.dto';
import { PaginatedBlogResponseDto } from './dto/paginated-blog-response.dto';
import { BlogPreview } from './interfaces/blog-preview.interface';
import { ParseMongoIdPipe } from '@commons/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetPayload } from '@commons/decorators/get-payload.decorators';
import { AccessTokenPayload } from '@commons/interfaces/access-token.payload';
import { BlogStage } from '@commons/enum/blog-stage.enum';
import { StrategyKey } from '@commons/enum/strategy-key.enum';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(AuthGuard(StrategyKey.ACCESS_TOKEN))
  @Post()
  create(
    @Body() createBlogDto: CreateBlogDto,
    @GetPayload() payload: AccessTokenPayload,
  ) {
    return this.blogService.create({
      ...createBlogDto,
      userId: payload.uid,
    });
  }

  @Get()
  findAll(
    @Query() queryDto: QueryBlogDto,
  ): Promise<PaginatedBlogResponseDto<BlogPreview>> {
    return this.blogService.findAll(queryDto);
  }

  @UseGuards(AuthGuard(StrategyKey.ACCESS_TOKEN))
  @Get('own')
  getBlogsByUserId(@GetPayload() payload: AccessTokenPayload) {
    return this.blogService.getBlogsByUserId(payload.uid);
  }

  @Get('public/:slug')
  findOne(@Param('slug') slug: string) {
    return this.blogService.findOne(slug, BlogStage.PUBLIC);
  }

  // here auth access
  @UseGuards(AuthGuard(StrategyKey.ACCESS_TOKEN))
  @Get('draft/:slug')
  findOneDraft(@Param('slug') slug: string) {
    return this.blogService.findOne(slug, BlogStage.DRAFT);
  }

  @UseGuards(AuthGuard(StrategyKey.ACCESS_TOKEN))
  @Put(':slug')
  update(@Param('slug') slug: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(slug, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
