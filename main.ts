/*

MIT License

Copyright (c) 2022 TypeMarkup

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

function StopDocument(message: string): void {
  document.documentElement.innerHTML = `
    <html>
      <head>
        <title>ERROR!</title>
      </head>

      <body>
        <p>
          Error: An unexpected value appeared.<br>
            ↳ ${message}
        </p>
      </body>
    </html>
  `;
}


const DataTypes: {
  [func: string]: (value: string | null) => boolean
} = {
  readonly() {

    return false;
  },

  uint(value) {
    if (!value || !value.match(/^[0-9]*$/)) return false;

    return true;
  }
};


const AttrTypes: {
  [func: string]: (attr: string) => boolean
} = {
  static_attr() {

    return false;
  },

  static_class(attr) {
    if (attr === "class") return false;

    return true;
  },

  static_id(attr) {
    if (attr === "id") return false;

    return true;
  }
}


const RecordHandler: {
  [func: string]: (record: MutationRecord) => void
} = {
  attributes(record) {
    // this prevents types from being changed.
    if (record.attributeName === "typed")
      return StopDocument("Changing the attribute \"typed\" is not allowed");

    // @ts-ignore
    const targetType = record.target.getAttribute("typed");

    if (!targetType) return;


    const types: string[] = targetType.split(", ");

    const res: boolean[] = types.map((type: string): boolean => {
      // check if it is some type of new data.
      if (Object.keys(AttrTypes).includes(type))
        return AttrTypes[type](record.attributeName!)

      // if not return, it is an unknown type.
      return true;
    });

  
    if (res.includes(false))
      return StopDocument(`The attribute "${record.attributeName}" cannot be changed`);
  },

  characterData(record) {
    const targetType = record.target.parentElement?.getAttribute("typed");

    if (!targetType) return;


    const types: string[] = targetType.split(", ");

    const res: boolean[] = types.map((type: string): boolean => {
      // check if it is some type of new data.
      if (Object.keys(DataTypes).includes(type))
        return DataTypes[type](record.target.nodeValue)

      // check if it is some type of common data.
      else if (record.target.nodeValue) try {
        if (typeof(JSON.parse(record.target.nodeValue)) === type)
          return true;

      } catch {
        // in case of error, it may be a string.
        if (type !== "string") return false;
  
        // if not, it is an unknown type.
        return true;
      }

      return true;
    })


    if (res.includes(false))
      return StopDocument(`Expected Value Type: ${types.join(", ")}`);

  }

};


window.addEventListener("DOMContentLoaded", (): void => {
  const observer: MutationObserver = new MutationObserver((records: MutationRecord[]): void => {
    for (const record of records) try {
      RecordHandler[record.type](record);

    } catch {

      return
    }

  });

  observer.observe(document.getElementsByTagName("html")[0], {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  });

});