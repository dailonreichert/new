import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Appontment from '../infra/typeorm/entities/Appointment';
import AppError from '../../../shared/errors/AppError';
import IAppointmetsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmetsRepository,
  ) {}

  public async execute({
    provider_id,
    date,
  }: IRequestDTO): Promise<Appontment> {
    const hourOfDate = startOfHour(date);

    const findAppointmentInSameData = await this.appointmentsRepository.findByDate(
      hourOfDate,
    );

    if (findAppointmentInSameData) {
      throw new AppError('This appointments is already booked.');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: hourOfDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
