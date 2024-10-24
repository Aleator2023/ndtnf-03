import express, { Request, Response } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as YandexStrategy } from 'passport-yandex';
import cors from 'cors';
import { router } from './routes';
import { connectDB } from './db';

declare global {
  namespace Express {
    interface User {
      id?: string;
      displayName?: string;
      emails?: { value: string }[];
      photos?: { value: string }[];
    }
  }
}

const app = express();

async function startServer() {
  try {
    await connectDB();
    console.log('Database connected successfully');

    app.use(
      session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
      })
    );

    app.use(cors());
    app.use(express.json());

    passport.use(
      new YandexStrategy(
        {
          clientID: '574475f6240d49c38649a4449bcb5004',
          clientSecret: 'dbcf60280596407cb3cabc200a106731',
          callbackURL: 'http://localhost:3000/auth/yandex/callback',
        },
        (accessToken, refreshToken, profile, done) => {
          console.log('User Profile:', profile);
          return done(null, profile);
        }
      )
    );

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/login', passport.authenticate('yandex'));

    app.get(
      '/auth/yandex/callback',
      passport.authenticate('yandex', { failureRedirect: '/login' }),
      (req, res) => {
        res.redirect('/profile');
      }
    );

    app.get('/profile', (req: Request, res: Response) => {
      if (!req.isAuthenticated()) {
        return res.redirect('/login');
      }

      const user = req.user as Express.User;
      res.send(
        `<h1>Привет, ${user.displayName || 'Гость'}!</h1>
         <a href="/logout">Выйти</a>`
      );
    });

    app.get('/logout', (req, res) => {
      req.logout(() => {
        res.redirect('/');
      });
    });

    app.use('/books', router);

    app.use((req: Request, res: Response) => {
      res.status(404).json({ message: 'Route not found' });
    });

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
}

startServer();