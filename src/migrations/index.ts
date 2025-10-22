import * as migration_20251019_150202 from './20251019_150202';
import * as migration_20251021_093631 from './20251021_093631';
import * as migration_20251022_080030 from './20251022_080030';

export const migrations = [
  {
    up: migration_20251019_150202.up,
    down: migration_20251019_150202.down,
    name: '20251019_150202',
  },
  {
    up: migration_20251021_093631.up,
    down: migration_20251021_093631.down,
    name: '20251021_093631',
  },
  {
    up: migration_20251022_080030.up,
    down: migration_20251022_080030.down,
    name: '20251022_080030'
  },
];
