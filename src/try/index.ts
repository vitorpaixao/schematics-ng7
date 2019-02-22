
import {
  Rule, SchematicsException, apply, branchAndMerge, mergeWith, template, url, chain, move,
} from '@angular-devkit/schematics';
import { dasherize, classify} from "@angular-devkit/core/src/utils/strings";
import { normalize } from 'path';

const stringUtils = {dasherize, classify};

export default function (options: any): Rule {
  options.path = options.path ? normalize(options.path) : options.path;
  const sourceDir = options.sourceDir;

  if (!sourceDir) {
    throw new SchematicsException('sourceDir option is riquired.');
  }

  if (!options.name) {
    throw new SchematicsException('Option (name) is required.');
  }

  const templateSource = apply(
    url('./files'),
    [
      template({
        ...stringUtils,
        ...options as object,
      }),
      move(sourceDir),
    ]
  );
  
  return chain([
    branchAndMerge(chain([
      mergeWith(templateSource)
    ])),
  ]);
  
}