import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '../../../../database/index'
import { app } from '../../../../app';

let connection: Connection;

describe('Show user Profile', () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close()
  })

  it('should be able show profile', async () => {

    // const responseToken = await request(app).post('/api/v1/sessions')
    //   .send({
    //     email: 'victor@rocketseat.com.br',
    //     password: 'password'
    //   });

    // const { token } = responseToken.body;

    // const response = await request(app).post('/api/v1/profile')
    //   .set({
    //     Authorization: `Bearer ${token}`
    //   })

    //   console.log(response)

    // expect(response.status).toBe(201);
  });
});