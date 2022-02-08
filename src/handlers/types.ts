const TypeHandler: {
  [key: string]: (
    record: MutationRecord,
    type: string,
    params: string[]
  ) => void;
} = {
  "protect-attrs"({ attributeName, target }, _, params) {
    console.log(attributeName, target.nodeName, params)

    if (!params.length) return StopDocument("ALTERED_ATTR", attributeName!);

    for (const param of params)
      if (attributeName === param) return StopDocument("ALTERED_ATTR", attributeName);
  },
};
