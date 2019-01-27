import { createAction } from 'appraisejs-utils/redux';

export const SELECT_BRANCH = 'SELECT_BRANCH';
export const SELECT_COMMIT = 'SELECT_COMMIT';
export const SELECT_INSTALLATION = 'SELECT_INSTALLATION';
export const SELECT_REPOSITORY = 'SELECT_REPOSITORY';

export const selectBranch = branch => createAction(SELECT_BRANCH, { selected: branch });

export const selectCommit = commit => createAction(SELECT_COMMIT, { selected: commit });

export const selectInstallation = installation => (
  createAction(SELECT_INSTALLATION, { selected: installation })
);

export const selectRepository = repository => (
  createAction(SELECT_REPOSITORY, { selected: repository })
);
