import 'dotenv/config';
import { addAlias } from 'module-alias';
import { readdirSync } from 'fs';
import { resolve } from 'path';

const rootPath = typeof process.env.TS_NODE_DEV === 'undefined' ? 'dist' : 'dist';

const layers = readdirSync(resolve(__dirname, '..', '..', '..', '..', rootPath));

layers.forEach((layer: string) => {
  addAlias(`@${layer}`, resolve(`${rootPath}/${layer}`));
});
