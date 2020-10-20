import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { time } from 'console';
import { MoviesService } from './movies.service';

describe('## MoviesService ##', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('## MoviesService should be defined ##', () => {
    expect(service).toBeDefined();
  });

  describe('## getMovieList() ##', () => {
    it('# Should return an array #', () => {
      const result = service.getMovieList();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('## getOneMovie() ##', () => {
    it('should return a movie one', () => {
      const movie = service.getOneMovie(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw 404 error', () => {
      try {
        service.getOneMovie(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  describe('## createMoive() ##', () => {
    it('## Create new Movie ##', () => {
      const beforeListLength = service.getMovieList().length;
      service.createMovie({
        title: 'new Movie Name',
        year: 2002,
        geners: ['TEst', 'actions'],
      });
      const afterListLength = service.getMovieList().length;
      console.log('# created Data #', service.getOneMovie(afterListLength));

      expect(beforeListLength).toEqual(afterListLength - 1);
    });
  });

  describe('## deleteMoive() ##', () => {
    it('# delete a movie', () => {
      const beforeListLength = service.getMovieList().length;
      service.deleteMoive(2);
      const afterListLength = service.getMovieList().length;
      expect(beforeListLength).toEqual(afterListLength + 1);
    });
  });

  describe('## patchMoive() ##', () => {
    it('# patch a movie', () => {
      const patchData = {
        title: 'TEST MOVIE',
        year: 2055,
      };
      service.patchMoive(1, patchData);
      const movie = service.getOneMovie(1);
      expect(movie.title).toEqual(patchData.title);
      expect(movie.year).toEqual(patchData.year);
    });
  });
});
