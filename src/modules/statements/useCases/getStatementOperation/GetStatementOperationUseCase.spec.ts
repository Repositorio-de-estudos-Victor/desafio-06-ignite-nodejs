import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";

let getStatementOperationUseCase: GetStatementOperationUseCase;
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
    getStatementOperationUseCase = new GetStatementOperationUseCase(inMemoryUsersRepository, inMemoryStatementsRepository);
  })

  it('should be able to return the operations found', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'Victor',
      email: 'victor@rocketseat.com.br',
      password: '123456'
    });

    const statement = await inMemoryStatementsRepository.create({
      amount: 100,
      description: 'Teste',
      type: 'deposit' as OperationType,
      user_id: user.id
    });

    const operation = await inMemoryStatementsRepository.findStatementOperation({ 
      user_id: user.id,
      statement_id: statement.id
    });

    expect(operation).toHaveProperty('id')
    expect(operation).toHaveProperty('type')
  });

  it('should not be able to list the operations of a non-existing user', async () => {
    expect(async () => {
      await inMemoryUsersRepository.findById('non-existing')
    }).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to list the operations of a non-existing statement', async () => {
    expect(async () => {
      await inMemoryStatementsRepository.findStatementOperation({ 
        user_id: 'non-existing',
        statement_id: 'non-existing'
      });
    }).rejects.toBeInstanceOf(AppError)
  });
 
})