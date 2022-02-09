attributes: (record: MutationRecord): void => {
  /*function checkContainerTyped(node: Node): boolean { // @ts-ignore
    const types: string = node.getAttribute("typed"), // @ts-ignore
      childrens: HTMLCollection[] = node.children;

    for (const children of childrens) {
      
    }

    return false
  };*/

  if (record.attributeName === "typed")
    return StopDocument("ALTERED_ATTR", "typed");

  /*if (
    record.target.parentNode?.nodeName === "DIV" && // @ts-ignore
    record.target.parentNode.hasAttribute("typed")
  ) {
    const iface = checkContainerTyped(record.target.parentNode);

    if (iface) return;
  }*/

  // @ts-ignore
  if (!record.target.hasAttribute("typed")) return;

  // @ts-ignore
  const types = getAttributes(record.target.getAttribute("typed")); 


  for (const type of types)
    if (type.name.charAt(0) === type.name.charAt(0).toUpperCase())
      return;

    else if (type.name in TypeHandler)
      TypeHandler[type.name](record, type.name, type.params);

    else
      console.warn(`The type "${type.name}" was not found.`)
};
