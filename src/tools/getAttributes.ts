function getAttributes(attrValue: string) {
  const types: { name: string; params: string[] }[] = [],
    regex: RegExp = /([\s]|[,])+/;

  let match: RegExpExecArray | null | boolean = false,
    noMatch: boolean = true;


  while ((match = regex.exec(attrValue)) != null || noMatch) {
    if (match === null) noMatch = false;


    const open_sb: number = attrValue.indexOf("[", 0),
      close_sb: number = attrValue.indexOf("]", 0);


    if ((open_sb < 0) && (close_sb > -1)) {
      console.error("The Square bracket never opens, types are ignored.");
      
      break;

    } else if ((open_sb > -1) && (close_sb < 0)) {
      console.error("The Square bracket never closes, types are ignored.");

      break;
    }

    if (open_sb < 0 && close_sb < 0) {
      types.push({
        name: attrValue.substring(0, (match === null) ? undefined : match.index),
        params: [],
      });

      continue;
    }

    if (match === null) {
      types.push({
        params: (attrValue.substring((open_sb + 1), close_sb)).split(/([\s]|[,])+/g),
        name: attrValue.substring(0, open_sb)
      });

      break;
    }

    if (open_sb < match.index && match.index < close_sb) {
      if (attrValue.substring(close_sb).match(/([\s]|[,])+/)) continue;

      types.push({
        name: attrValue.substring(0, close_sb),
        params: [],
      });

      break;
    }


    const invalidParams = (match.index < open_sb) ? true : false;

    const params = invalidParams ? [] : (attrValue.substring((open_sb + 1), close_sb)).split(/([\s]|[,])+/g),
      name = attrValue.substring(0, invalidParams ? match.index : open_sb);


    types.push({ name, params });
    attrValue = attrValue.substring(match!.index + match!.length);
  };


  return types;
};
