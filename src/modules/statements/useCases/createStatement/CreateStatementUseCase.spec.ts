import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let createStatementUseCase: CreateStatementUseCase;
let inMemoryUserRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

describe('Create Statement', () => {

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createStatementUseCase = new CreateStatementUseCase(inMemoryUserRepository, inMemoryStatementsRepository);
  });

  it('should be able to create a new statement', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'Victor',
      email: 'victor@rocketseat.com.br',
      password: '123456'
    });

    const statement = await createStatementUseCase.execute({ 
      description: 'Description test',
      amount: 1000,
      type: 'amount' as OperationType,
      user_id: user.id
    });

    expect(statement).toHaveProperty('id');
  });
  
  it('should not be able to create a new statement when has a non-existing user', async () => {
    expect(async () => {
      await inMemoryUserRepository.findById('non-existing')
    }).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to withdraw when don`t have an amount', async () => {
    expect(async () => {
      const user = await inMemoryUserRepository.create({
        name: 'Victor',
        email: 'victor@rocketseat.com.br',
        password: '123456'
      });
  
      await createStatementUseCase.execute({ 
        description: 'Description amount',
        amount: 1000,
        type: 'amount' as OperationType,
        user_id: user.id
      });

      await createStatementUseCase.execute({ 
        description: 'Description withdraw',
        amount: 1500,
        type: 'withdraw' as OperationType,
        user_id: user.id
      });
  
    }).rejects.toBeInstanceOf(AppError)
  });

});