import { PartialType } from '@nestjs/mapped-types';
import { CreateMoiveDto } from './create-moive.dto';
// import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMoiveDto extends PartialType(CreateMoiveDto) {}
// export class UpdateMoiveDto {
//   @IsString()
//   readonly title?: string;

//   @IsNumber()
//   readonly year?: number;

//   @IsOptional()
//   @IsString({ each: true })
//   readonly geners?: string[];
// }
