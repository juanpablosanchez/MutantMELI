function clientProxyMock() {
  return {
    client: {
      send: () => {},
    },
  } as any;
}

export { clientProxyMock };
