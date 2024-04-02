const publicEnv = process.env.public;

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var $env: PublicEnv;
}

globalThis.$env = publicEnv;

export {};
