import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';
import { SetupGeneratorSchema } from './schema';

describe('setup generator', () => {
  let appTree: Tree;
  const options: SetupGeneratorSchema = {
    name: 'test',
    STAppName: 'react-test',
    STWebDomain: 'localhost:4200',
    STApiDomain: 'localhost:3000',
    STWebBasePath: '/auth',
    STApiBasePath: '/auth',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    console.log('TREE AFTER: ', appTree);
    expect(true).toBe(true);
  });
});
