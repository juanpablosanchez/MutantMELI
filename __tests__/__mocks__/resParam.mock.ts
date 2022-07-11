const resParamMock = () =>
  ({
    status: () => ({
      send: () => {},
    }),
  } as any);

export { resParamMock };
