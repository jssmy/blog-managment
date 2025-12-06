import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { BlogStage } from '@commons/enum/blog-stage.enum';

export class Meta {
  @IsOptional()
  @IsBoolean()
  checked: boolean;

  @IsOptional()
  @IsString()
  counterType: string;
}

export class Item {
  @IsString()
  content: string;

  @ValidateNested()
  @Type(() => Meta)
  meta: Meta;

  @ValidateNested({ each: true })
  @Type(() => Item)
  items: Item[];
}

class Data {
  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsNumber()
  level?: number;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsString()
  caption?: string;

  @IsOptional()
  @IsBoolean()
  withBorder?: boolean;

  @IsOptional()
  @IsBoolean()
  withBackground?: boolean;

  @IsOptional()
  @IsBoolean()
  stretched?: boolean;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  style?: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => Meta)
  meta?: Meta;

  @ValidateNested({ each: true })
  @Type(() => Item)
  items?: Item[];
}

class Block {
  @IsString()
  id: string;

  @IsString()
  type: string;

  @ValidateNested()
  @Type(() => Data)
  data: Data;
}

export class CreateBlogDto {
  @IsNumber()
  time: number;

  @IsEnum(BlogStage)
  stage: BlogStage;

  @ValidateNested({ each: true })
  @Type(() => Block)
  blocks: Block[];

  @IsString()
  version: string;
}
