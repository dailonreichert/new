import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;

    const listProviderAvailabilityService = container.resolve(
      ListProviderAvailabilityService,
    );

    const appointments = await listProviderAvailabilityService.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(appointments);
  }
}
