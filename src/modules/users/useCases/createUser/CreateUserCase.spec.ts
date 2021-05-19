import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let inMemoryUserRepository: InMemoryUsersRepository;

describe('Create user', () => {

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Victor',
      email: 'victor@rocketseat.com.br',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user', async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: 'Victor',
        email: 'victor@rocketseat.com.br',
        password: '123456'
      });

      await createUserUseCase.execute({
        name: 'Victor 2',
        email: 'victor@rocketseat.com.br',
        password: '123456'
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  
});