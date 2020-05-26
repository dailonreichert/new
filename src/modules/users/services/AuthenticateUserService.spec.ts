import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let autheticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    autheticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to atheticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '12345',
    });

    const response = await autheticateUser.execute({
      email: 'teste@gmail.com',
      password: '12345',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to atheticate with non axisting user', async () => {
    expect(
      autheticateUser.execute({
        email: 'teste@gmail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to atheticate to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '12345',
    });

    await expect(
      autheticateUser.execute({
        email: 'teste@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
