import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpadteProfile from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let upadteProfile: UpadteProfile;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    upadteProfile = new UpadteProfile(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '123456',
    });

    const updateUser = await upadteProfile.execute({
      user_id: user.id,
      name: 'Teste 2',
      email: 'teste2@gmail.com',
    });

    expect(updateUser.name).toBe('Teste 2');
    expect(updateUser.email).toBe('teste2@gmail.com');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    expect(
      upadteProfile.execute({
        user_id: 'non-existing user id',
        name: 'test',
        email: 'test@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste2@gmail.com',
      password: '123456',
    });

    await expect(
      upadteProfile.execute({
        user_id: user.id,
        name: 'Teste 2',
        email: 'teste@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '123456',
    });

    const updateUser = await upadteProfile.execute({
      user_id: user.id,
      name: 'Teste 2',
      email: 'teste2@gmail.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updateUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '123456',
    });

    await expect(
      upadteProfile.execute({
        user_id: user.id,
        name: 'Teste 2',
        email: 'teste2@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '123456',
    });

    await expect(
      upadteProfile.execute({
        user_id: user.id,
        name: 'Teste 2',
        email: 'teste2@gmail.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
