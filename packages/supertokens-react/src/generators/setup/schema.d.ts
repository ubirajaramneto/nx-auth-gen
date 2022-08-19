export interface SetupGeneratorSchema {
  _: Array<string>;
  STAppName: string;
  STApiDomain: string;
  STWebDomain: string;
  STApiBasePath: string;
  STWebBasePath: string;
  name: string;
  tags?: string;
  directory?: string;
}
