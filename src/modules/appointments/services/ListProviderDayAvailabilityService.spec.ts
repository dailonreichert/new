import 'reflect-metadata';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';
import FakeAppointmentRepository from '../repositories/fakes/fakeAppointmentsRepository';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should not be able to list the day availability from provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'teste',
      user_id: '123123',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'teste',
      user_id: '123123',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const availabilidy = await listProviderDayAvailability.execute({
      provider_id: 'teste',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availabilidy).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 10, available: false },
      ]),
    );
  });
  it('should not be able to list the day availability from provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'teste',
      user_id: '123123',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'teste',
      user_id: '123123',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availabilidy = await listProviderDayAvailability.execute({
      provider_id: 'teste',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availabilidy).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
