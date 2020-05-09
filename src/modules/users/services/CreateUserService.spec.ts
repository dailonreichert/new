import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const appointment = await createUser.execute({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '12345',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '12345',
    });

    expect(
      createUser.execute({
        name: 'Teste',
        email: 'teste@gmail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
