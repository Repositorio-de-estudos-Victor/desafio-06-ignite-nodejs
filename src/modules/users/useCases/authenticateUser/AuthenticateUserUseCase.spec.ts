import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let inMemoryUserRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUserRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
  });

  it('should be able to authenticate a user', async () => {
    const user: ICreateUserDTO = {
      name: 'Victor',
      email: 'victor@rocketseat.com.br',
      password: '123456'
    };

   await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({ 
      email: user.email, 
      password: user.password,
    });

    expect(result).toHaveProperty('token')
  });

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'Victor',
        email: 'victor@rocketseat.com.br',
        password: '123456'
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrectPassword'
      });
    }).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to authenticate with incorrect email', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'Victor',
        email: 'victor@rocketseat.com.br',
        password: '123456'
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: 'incorrectEmail',
        password: user.password
      });
    }).rejects.toBeInstanceOf(AppError)
  });
});