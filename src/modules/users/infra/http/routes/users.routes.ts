import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../../../services/CreateUserService';
import ensureAutheticated from '../middlewares/ensureAutheticated';
import uploadConfig from '../../../../../config/upload';
import UpadateUserAvatarService from '../../../services/UpadateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAutheticated,
  upload.single('avatar'),
  async (request, response) => {
    const upadateUserAvatarService = new UpadateUserAvatarService();

    const user = await upadateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
