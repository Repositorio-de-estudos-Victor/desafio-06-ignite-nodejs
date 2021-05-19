import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

let getBalanceUseCase: GetBalanceUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

describe('Get Balance', () => {

  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    getBalanceUseCase = new GetBalanceUseCase(inMemoryStatementsRepository, inMemoryUsersRepository);
  })

  it('should be able to list all operations of user', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'Victor',
      email: 'victor@rocketseat.com.br',
      password: '123456'
    });

    await inMemoryStatementsRepository.create({
      amount: 100,
      description: 'Teste',
      type: 'deposit' as OperationType,
      user_id: user.id
    });

    await inMemoryStatementsRepository.create({
      amount: 50,
      description: 'Teste',
      type: 'withdraw' as OperationType,
      user_id: user.id
    });

    const allOperations = await inMemoryStatementsRepository.getUserBalance({ 
      user_id: user.id,
      with_statement: true,
    });

    expect(allOperations).toHaveProperty('statement')
    expect(allOperations).toHaveProperty('balance')
  });

  it('should not be able to list all operations of a non-existing user', async () => {
    expect(() => {
      
    }).rejects.toBeInstanceOf(AppError)
  });
 
})