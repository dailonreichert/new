import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpadateUserAvatarService from '../../../services/UpadateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const upadateUserAvatar = container.resolve(UpadateUserAvatarService);

    const user = await upadateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}
