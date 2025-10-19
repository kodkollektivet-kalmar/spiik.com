import * as migration_20251019_150202 from './20251019_150202';

export const migrations = [
  {
    up: migration_20251019_150202.up,
    down: migration_20251019_150202.down,
    name: '20251019_150202'
  },
];
