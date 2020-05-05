import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appontment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../infra/typeorm/repositories/appointmentsRepository';
import AppError from '../../../shared/errors/AppError';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: RequestDTO): Promise<Appontment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const hourOfDate = startOfHour(date);

    const findAppointmentInSameData = await appointmentsRepository.findByDate(
      hourOfDate,
    );

    if (findAppointmentInSameData) {
      throw new AppError('This appointments is already booked.');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: hourOfDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
