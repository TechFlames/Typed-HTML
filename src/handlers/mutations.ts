declare let config: Config;

const MutationHandler: {
  [key: string]: (mutation: MutationRecord) => void;
} = {
  // @bys-import mutations/attributes.ts \\
};

const target: Node = (!config || !config.target)
  ? document.getElementsByTagName("html")[0]
  : config.target;

new MutationObserver((records: MutationRecord[]): void => {
  for (const record of records) {
    console.log(record);

    MutationHandler[record.type](record);
  }
}).observe(target, {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
});
