import express from 'express';
import { currentUser } from '@motway_ticketing/common'
//import { requireAuth } from '../middlewares/require-auth'; // ЕСЛИ НУЖНО ТРЕБОВАТЬ АВТОРИЗАЦИЮ то нужно и тест менять!

const router = express.Router();
// Логику с requireAuth можно удалить, сейчас с ней, ответ будет {    "errors": [        {            "message": "Not authorized"        }    ]}
//без нее отверт {    "currentUser": null }. Все зависит от логики клиента, нужно ли ему кидать ошибку или просто null - что одно и тоже, он сам может вывестим ощибку если currentUser null
router.get('/api/users/currentuser', currentUser, /**requireAuth,**/(req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };