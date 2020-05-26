import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let listProvider: ListProviderService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProvider', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProvider = new ListProviderService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should not be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Teste 2',
      email: 'teste2@gmail.com',
      password: '123456',
    });

    const userLogged = await fakeUsersRepository.create({
      name: 'Teste 3',
      email: 'teste3@gmail.com',
      password: '123456',
    });

    const providers = await listProvider.execute({
      user_id: userLogged.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
