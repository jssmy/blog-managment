import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generateSlug } from 'src/commons/utils/string.util';

@Injectable()
export class BlogService {

  constructor(
    @InjectModel(Blog.name)
    private readonly blogModel: Model<Blog>
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    const blog = new this.blogModel({
      slug: generateSlug(createBlogDto.blocks.find(block => block.type === 'header').data.text),
      ...createBlogDto
    });
    const {  _id, slug } = await blog.save();

    return {
      _id,
      slug
    }
  }

  findAll() {
    return `This action returns all blog`;
  }

  async findOne(slug: string) {
    const blog = await this.blogModel.findOne({ slug });

    if (!blog) {
       throw new  NotFoundException(`Blog ${slug} not found`);
    }

    return blog;

  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
