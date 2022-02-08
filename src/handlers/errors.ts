const ErrorHandler: {
  [key: string]: (name: string, elemName: string) => string;
} = {
  ALTERED_ATTR(name: string, attrName: string) {
    let message = `【 ${name} 】The "${attrName}" attribute has been altered.`;

    for (const cause of ["Changes are not allowed."])
      message = message.concat(`\n ‣ ${cause}`);

    return message;
  }
};
