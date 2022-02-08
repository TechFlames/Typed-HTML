interface Config {
  handlers?: {
    error?: (error: Error) => void;
  }
  interfaces?: {
    [name: string]: {
      [tag: string]: string
    }
  },
  target?: Node
}