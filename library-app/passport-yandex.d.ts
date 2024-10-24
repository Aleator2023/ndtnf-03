declare module 'passport-yandex' {
    import { Strategy as PassportStrategy } from 'passport';
  
    interface StrategyOptions {
      clientID: string;
      clientSecret: string;
      callbackURL: string;
    }
  
    interface Profile {
      id: string;
      displayName: string;
      emails: Array<{ value: string }>;
      photos: Array<{ value: string }>;
      _raw: string;
      _json: any;
    }
  
    type VerifyCallback = (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void
    ) => void;
  
    export class Strategy extends PassportStrategy {
      constructor(options: StrategyOptions, verify: VerifyCallback);
    }
  }