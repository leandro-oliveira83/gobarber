import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

import uploadConfig from '@config/upload';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UsersAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UsersAvatarController();
const upload = multer(uploadConfig.multer);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
