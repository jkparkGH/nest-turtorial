import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMoiveDto } from './dto/create-moive.dto';
import { UpdateMoiveDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [
    {
      id: 1,
      title: 'ternet1',
      year: 2020,
      geners: ['Nolan', 'mind Blown1'],
    },
    {
      id: 2,
      title: 'ternet2',
      year: 2022,
      geners: ['Nolan', 'mind Blown2'],
    },
  ]; // DB DUMMY

  getMovieList(): Movie[] {
    return this.movies;
  }

  getOneMovie(id: number): Movie {
    const crrMovie = this.movies.find(one => one.id === id);
    if (!crrMovie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return crrMovie;
  }

  createMovie(movieData: CreateMoiveDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  deleteMoive(id: number) {
    this.getOneMovie(id);
    this.movies = this.movies.filter(movie => movie.id !== id);
  }

  patchMoive(id: number, movieData: UpdateMoiveDto) {
    const crrMovie = this.getOneMovie(id);
    this.deleteMoive(id);
    this.movies.push({ ...crrMovie, ...movieData });
  }
}
