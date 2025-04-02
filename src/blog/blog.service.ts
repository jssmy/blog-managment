import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generateSlug } from 'src/commons/utils/string.util';
import { BlogStage } from 'src/commons/enum/blog-stage.enum';

@Injectable()
export class BlogService {

  constructor(
    @InjectModel(Blog.name)
    private readonly blogModel: Model<Blog>
  ) { }

  async create(createBlogDto: CreateBlogDto & { userId: string }) {
    const blog = new this.blogModel({
      slug: generateSlug(createBlogDto.blocks.find(block => block.type === 'header').data.text),
      stage: BlogStage.DRAFT,
      ...createBlogDto
    });
    const { _id, slug } = await blog.save();

    return {
      _id,
      slug
    }
  }

  findAll() {
    return `This action returns all blog`;
  }

  getBlogsByUserId(userId: string) {
    return this.blogModel.find({
      userId
    });
  }

  async findOne(slug: string, stage: BlogStage = null) {

    const query = { slug };

    if (stage) {
      query['stage'] = stage;
    }

    const blog = await this.blogModel.findOne(query)


    if (!blog) {
      throw new NotFoundException(`Blog ${slug} not found`);
    }

    

    return blog;

  }

  async update(slugQuery: string, updateBlogDto: UpdateBlogDto) {

    const blog = await this.findOne(slugQuery);


    Object.assign(blog, updateBlogDto);
    await blog.save();


    if (!blog) {
      throw new NotFoundException('No se ha encontrado el blog');
    }

    const { _id, slug } = blog;

    return {
      _id,
      slug
    }

  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
