import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { QueryBlogDto } from './dto/query-blog.dto';
import { PaginatedBlogResponseDto } from './dto/paginated-blog-response.dto';
import { Blog } from './entities/blog.entity';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
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

  async findAll(queryDto: QueryBlogDto): Promise<PaginatedBlogResponseDto> {
    const { page = 1, limit = 10, search, stage, userId, sortBy = 'time', sortOrder = 'desc' } = queryDto;
    
    // Build filter object
    const filter: FilterQuery<Blog> = {};
    
    if (stage) {
      filter.stage = stage;
    }
    
    if (userId) {
      filter.userId = userId;
    }
    
    if (search) {
      filter.$or = [
        { 'blocks.data.text': { $regex: search, $options: 'i' } }
      ];
    }
    
    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Execute queries in parallel
    const [blogs, total] = await Promise.all([
      this.blogModel
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.blogModel.countDocuments(filter)
    ]);
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;
    
    return {
      data: blogs,
      total,
      page,
      limit,
      totalPages,
      hasNext,
      hasPrev
    };
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
