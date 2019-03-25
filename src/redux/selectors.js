import { createSelector } from 'reselect';

export const selectAuth = state => state.auth;
export const selectInstallations = state => state.installations;
export const selectReposByInstallation = state => state.reposByInstallation;
export const selectRepositories = state => state.repositories;
export const selectTests = state => state.tests;
export const selectTestsByRepository = state => state.testsByRepository;
export const selectUser = state => state.user;

export const selectIsAuthenticated = createSelector(selectAuth, ({ token }) => !!token);
