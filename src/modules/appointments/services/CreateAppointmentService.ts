import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Appontment from '../infra/typeorm/entities/Appointment';
import AppError from '../../../shared/errors/AppError';
import IAppointmetsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmetsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequestDTO): Promise<Appontment> {
    const hourOfDate = startOfHour(date);

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself.");
    }

    if (isBefore(hourOfDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    if (getHours(hourOfDate) < 8 || getHours(hourOfDate) > 17) {
      throw new AppError(
        'You can only create an appointment between 8am and 5pm.',
      );
    }

    const findAppointmentInSameData = await this.appointmentsRepository.findByDate(
      hourOfDate,
    );

    if (findAppointmentInSameData) {
      throw new AppError('This appointments is already booked.');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: hourOfDate,
    });

    const dateFormated = format(hourOfDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormated}`,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
