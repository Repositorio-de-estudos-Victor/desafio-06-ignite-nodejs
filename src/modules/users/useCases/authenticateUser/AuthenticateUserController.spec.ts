import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '../../../../database/index'
import { app } from '../../../../app';

let connection: Connection;

describe('Authenticate user', () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close()
  })

  it('should be able to authenticate an user', async () => {
    await request(app).post('/api/v1/users')
      .send({
        name: 'Victor',
        email: 'victor1@rocketseat.com.br',
        password: 'password'
      });

    const response = await request(app).post('/api/v1/sessions')
      .send({
        email: 'victor@rocketseat.com.br',
        password: 'password'
      });

    expect(response.status).toBe(200);
  });
});