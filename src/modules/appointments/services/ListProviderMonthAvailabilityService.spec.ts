import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import FakeAppointmentRepository from '../repositories/fakes/fakeAppointmentsRepository';

let fakeAppointmentoRepository: FakeAppointmentRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentoRepository = new FakeAppointmentRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentoRepository,
    );
  });

  it('should not be able to list the month availability from provider', async () => {
    await fakeAppointmentoRepository.create({
      provider_id: 'teste',
      user_id: '123123',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentoRepository.create({
      provider_id: 'teste',
      user_id: '123123',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    await fakeAppointmentoRepository.create({
      provider_id: 'teste',
      user_id: '123123',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentoRepository.create({
      provider_id: 'teste',
      user_id: '123123',
      date: new Date(2020, 4, 20, 11, 0, 0),
    });

    await fakeAppointmentoRepository.create({
      provider_id: 'teste',
      user_id: '123123',
      date: new Date(2020, 4, 20, 12, 0, 0),
    });

    await fakeAppointmentoRepository.create({
      provider_id: 'teste',
      user_id: '123123',
      date: new Date(2020, 4, 20, 13, 0, 0),
    });

    await fakeAppointmentoRepository.create({
      provider_id: 'teste',
      user_id: '123123',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentoRepository.create({
      provider_id: 'teste',
      user_id: '123123',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    await fakeAppointmentoRepository.create({
      provider_id: 'teste',
      user_id: '123123',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });

    await fakeAppointmentoRepository.create({
      provider_id: 'teste',
      user_id: '123123',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    await fakeAppointmentoRepository.create({
      provider_id: 'teste',
      user_id: '123123',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availabilidy = await listProviderMonthAvailability.execute({
      provider_id: 'teste',
      year: 2020,
      month: 5,
    });

    expect(availabilidy).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
      ]),
    );
  });
});
