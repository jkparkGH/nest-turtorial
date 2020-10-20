import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // decorator 선언한 것 만 validator에 도달한다
        forbidNonWhitelisted: true, // decorator 선언하지 않은 요소가 존재하는 경우, reject
        transform: true, // 자동으로 값의 type 을 변환시켜줌
      }),
    );

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('### Movie API home ###');
  });

  describe('/movies', () => {
    it('(GET)', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200);
    });
    it('(POST) 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'E2E TEST TITLE',
          year: 2020,
          geners: ['TEST'],
        })
        .expect(201);
    });
    it('(POST) 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'E2E TEST TITLE',
          year: 2020,
          geners: ['TEST'],
          wrongThing: 'thing',
        })
        .expect(400);
    });
    describe('/movies/:id', () => {
      it('GET 200', () => {
        return request(app.getHttpServer())
          .get('/movies/1')
          .expect(200);
      });
      it('GET 404', () => {
        return request(app.getHttpServer())
          .get('/movies/1999')
          .expect(404);
      });
      it('PATCH 200', () => {
        return request(app.getHttpServer())
          .patch('/movies/1')
          .send({
            title: 'E2E Test',
            year: 2025,
          })
          .expect(200);
      });
      it('DELETE 200', () => {
        return request(app.getHttpServer())
          .delete('/movies/1')
          .expect(200);
      });
    });
  });
});
