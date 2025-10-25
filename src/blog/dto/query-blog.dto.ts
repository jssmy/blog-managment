import { IsOptional, IsString, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { BlogStage } from 'src/commons/enum/blog-stage.enum';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export enum SortField {
  TIME = 'time',
  SLUG = 'slug',
  STAGE = 'stage',
  VERSION = 'version'
}

export class QueryBlogDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value))
  limit?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsEnum(SortField)
  sortBy?: SortField = SortField.TIME;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;
}
