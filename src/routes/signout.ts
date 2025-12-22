import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {

  // Clear the JWT from the session
  req.session = null;

  res.send({});
});

export { router as signoutRouter };