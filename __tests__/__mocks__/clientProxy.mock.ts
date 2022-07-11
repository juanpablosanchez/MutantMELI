function clientProxyMock() {
  return {
    client: {
      send: () => {},
      emit: () => {},
    },
  } as any;
}

export { clientProxyMock };
