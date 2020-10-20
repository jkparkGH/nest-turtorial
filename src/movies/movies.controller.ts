import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMoiveDto } from './dto/create-moive.dto';
import { UpdateMoiveDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('/')
  getMovieList(): Movie[] {
    return this.moviesService.getMovieList();
  }

  // @Get('/search')
  // getSearch(@Query('name') name: number): string {
  //   return `### moevie Search name : ${name}`;
  // }

  @Get('/:id')
  getOneMovie(@Param('id') id: number): Movie {
    return this.moviesService.getOneMovie(id);
  }

  @Post()
  createMoive(@Body() movieData: CreateMoiveDto) {
    return this.moviesService.createMovie(movieData);
  }

  @Delete('/:id')
  deleteMoive(@Param('id') id: number) {
    return this.moviesService.deleteMoive(id);
  }

  @Patch('/:id')
  patchMoive(@Param('id') id: number, @Body() movieData: UpdateMoiveDto) {
    return this.moviesService.patchMoive(id, movieData);
  }
}
