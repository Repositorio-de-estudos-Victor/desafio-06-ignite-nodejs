import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let showUserProfileUseCase: ShowUserProfileUseCase;
let inMemoryUserRepository: InMemoryUsersRepository;

describe('List User', () => {

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUserRepository);
  })

  it('should be able to list a user', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'Victor',
      email: 'victor@rocketseat.com.br',
      password: '123456'
    });

    const userReached = await showUserProfileUseCase.execute(user.id);

    expect(userReached).toEqual(user);
  });

  it('should not be able to list a user', async () => {
    expect(async () => {
      await showUserProfileUseCase.execute('non-exist-user-id')
    }).rejects.toBeInstanceOf(AppError);
  });
 
})