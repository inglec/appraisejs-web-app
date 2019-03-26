// Access values from Redux store
export const selectAuth = state => state.auth;
export const selectInstallations = state => state.installations;
export const selectRepositoryIdsByInstallation = state => state.repositoryIdsByInstallation;
export const selectRepositories = state => state.repositories;
export const selectTests = state => state.tests;
export const selectTestIdsByRepository = state => state.testIdsByRepository;
export const selectUser = state => state.user;
