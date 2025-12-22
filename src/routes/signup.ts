import express, { type Request, type Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@motway_ticketing/common';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signup',
  [
    body('email')
      .isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      //console.log('Email in use!');
      throw new BadRequestError('Email in use!!');
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      // the same is in  sigin.ts
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_KEY! // we are sure that it is defined due to the check in index.ts
    );
    // Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);
  });

export { router as signupRouter };