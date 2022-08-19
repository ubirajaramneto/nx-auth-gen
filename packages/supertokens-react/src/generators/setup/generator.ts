import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  logger,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import { SetupGeneratorSchema } from './schema';

const memoizedOptions = {};

interface NormalizedSchema extends SetupGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
  STAppName: string;
  STApiDomain: string;
  STWebDomain: string;
  STApiBasePath: string;
  STWebBasePath: string;
}

function getOptionsFromCommands(key: string, options: Array<string>) {
  if (Object.keys(memoizedOptions).length > 0) return memoizedOptions[key];
  options.map((option) => {
    const arg = option.split('=');
    memoizedOptions[arg[0]] = [arg[1]];
  })
  return memoizedOptions[key];
}

function normalizeOptions(
  tree: Tree,
  options: SetupGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).appsDir}/${projectDirectory}`;
  const args = options._;
  const STAppName = name;
  const STApiDomain = getOptionsFromCommands('STApiDomain', args);
  const STWebDomain = getOptionsFromCommands('STWebDomain', args);
  const STApiBasePath = getOptionsFromCommands('STApiBasePath', args);
  const STWebBasePath = getOptionsFromCommands('STWebBasePath', args);
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
    STAppName,
    STApiDomain,
    STWebDomain,
    STApiBasePath,
    STWebBasePath
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    tmpl: '',
  };

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
}

export default async function (tree: Tree, options: SetupGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
