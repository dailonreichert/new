import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmet: CreateAppointmentService;

describe('CreateAppointmet', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmet = new CreateAppointmentService(fakeAppointmentsRepository);
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmet.execute({
      date: new Date(),
      provider_id: '12345',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12345');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmet.execute({
      date: appointmentDate,
      provider_id: '12345',
    });

    expect(
      createAppointmet.execute({
        date: appointmentDate,
        provider_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
