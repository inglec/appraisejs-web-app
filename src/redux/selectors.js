import { createSelector } from 'reselect';

// Auth
export const selectAuth = state => state.auth;

export const selectIsAuthenticated = createSelector(selectAuth, ({ token }) => !!token);

// Installations
export const selectInstallations = state => state.installations;

// ReposByInstallation
export const selectReposByInstallation = state => state.reposByInstallation;

// Repositories
export const selectRepositories = state => state.repositories;

// User
export const selectUser = state => state.user;
