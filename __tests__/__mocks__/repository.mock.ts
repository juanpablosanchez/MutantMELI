function repositoryMock() {
  return {
    dnaRepository: {
      findDna: () => {},
      getAll: () => {},
      add: () => {},
    },
  } as any;
}

export { repositoryMock };
