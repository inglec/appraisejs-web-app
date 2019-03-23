import { createSelector } from 'reselect';

export const selectAuth = state => state.auth;

export const selectIsAuthenticated = createSelector(selectAuth, ({ token }) => !!token);

export const selectBenchmarkResults = state => state.benchmarkResults;

export const selectBenchmarksByCommit = state => state.benchmarksByCommit;

export const selectCommitsByRepository = state => state.commitsByRepository;

export const selectInstallations = state => state.installations;

export const selectReposByInstallation = state => state.reposByInstallation;

export const selectRepositories = state => state.repositories;

export const selectUser = state => state.user;
