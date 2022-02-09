function getAttributes(attrValue: string) {
  const types: { name: string; params: string[] }[] = [],
    regex: RegExp = /([\s]|[,])+/;

  let match: RegExpExecArray | null | boolean = false,
    pos: number = 0,
    firstMatch: boolean = true;

  while (
    (match = regex.exec(attrValue)) != null ||
    (match === null && firstMatch)
  ) {
    if (firstMatch) match !== null ? (firstMatch = false) : void 0;

    const open_sb: number = attrValue.indexOf("[", pos),
      close_sb: number = attrValue.indexOf("]", pos);

    if (open_sb < 0 && close_sb < 0) {
      types.push({ name: attrValue, params: [] });

      break;
    }

    if (open_sb < 0 && close_sb > -1) break;
    else if (open_sb > -1 && close_sb < 0) break;

    if (firstMatch !== true)
      if (open_sb < match!.index && match!.index < close_sb) {
        const match = attrValue.substring(close_sb).match(regex);

        if (match) continue;
      }

    const attr_params: string[] =
      match?.index! < open_sb
        ? []
        : attrValue.substring(open_sb + 1, close_sb).split(regex);

    const attr_name: string = attrValue.substring(
      pos,
      match?.index! < open_sb ? match?.index! : open_sb
    );

    types.push({ name: attr_name, params: attr_params });

    if (firstMatch === true) break;

    attrValue = "".concat(
      attrValue.substring(0, match!.index),
      "|",
      attrValue.substring(match!.index + match!.length)
    );
  }

  return types;
}
