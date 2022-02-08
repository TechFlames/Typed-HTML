function getAttributes(attrValue: string) {
  const types: { name: string, params: string[] }[] = [],
    regex: RegExp = /([\s]|[,])+/;

  let match: RegExpExecArray | null | boolean = false, pos: number = 0;

  while((match = regex.exec(attrValue) || (match === false) ? true : null) != null) {
    const open_sb: number = attrValue.indexOf("[", pos),
      close_sb: number = attrValue.indexOf("]", pos);


    if ((open_sb < 0) && (close_sb < 0)) {
      types.push({ name: attrValue, params: [] });

      break;
    };


    if ((open_sb < 0) && (close_sb > -1))
      break;

    else if ((open_sb > -1) && (close_sb < 0))
      break;


    if (match !== true) // @ts-ignore  
      if ((open_sb < match.index) && (match.index < close_sb)) {
        const match = attrValue.substring(close_sb).match(regex);
  
        if (match) continue;
      };


    const attr_params: string[] = (attrValue.substring((open_sb + 1), close_sb)).split(regex),
      attr_name: string = attrValue.substring(pos, open_sb);

    types.push({ name: attr_name, params: attr_params });


    if (match === true) break;


    attrValue = "".concat( // @ts-ignore
      attrValue.substring(0, match.index), "|", // @ts-ignore
      attrValue.substring(match.index + match.length)
    );
  };

  return types;
};