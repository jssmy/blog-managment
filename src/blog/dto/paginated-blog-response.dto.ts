import { Blog } from '../entities/blog.entity';

export class PaginatedBlogResponseDto {
  data: Blog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
