const router = require('express').Router();
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const routeSignup = require('./auth/signup');
const routeSignin = require('./auth/signin');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// не требует авторизации
router.use('/signup', routeSignup);
router.use('/signin', routeSignin);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

module.exports = router;
