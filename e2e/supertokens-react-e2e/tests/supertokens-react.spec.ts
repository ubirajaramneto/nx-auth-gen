import {
  ensureNxProject,
  runNxCommand,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';

describe('supertokens-react e2e', () => {
  // Setting up individual workspaces per
  // test can cause e2e runs to take a long time.
  // For this reason, we recommend each suite only
  // consumes 1 workspace. The tests should each operate
  // on a unique project in the workspace, such that they
  // are not dependant on one another.
  beforeAll(() => {
    ensureNxProject(
      '@nx-auth-gen/supertokens-react',
      'dist/packages/supertokens-react'
    );
    runNxCommand(
      'generate @nrwl/react:application --name=react-app --style=css --routing=false'
    );
  });

  afterAll(() => {
    // `nx reset` kills the daemon, and performs
    // some work which can help clean up e2e leftovers
    // runNxCommandAsync('reset');
  });

  it('should create supertokens-react', async () => {
    const project = 'react-app';
    await runNxCommandAsync(
      `generate @nx-auth-gen/supertokens-react:setup ${project} directory=apps STAppName=reactTest STApiDomain=localhost:3000 STWebDomain=localhost:4200 STApiBasePath=auth STWebBasePath=auth`
    );
  }, 120000);
});
