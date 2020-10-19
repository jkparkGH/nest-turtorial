import { IsNumber, IsString } from 'class-validator';

export class CreateMoiveDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsString({ each: true })
  readonly geners: string[];
}
