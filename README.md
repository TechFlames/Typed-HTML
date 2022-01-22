# **Typed HyperText Markup Language**

You can add types to the HyperText Markup Language.

## **Types**
To declare two types, they must be separated by a period and a space.

<details>
  <summary> Typed for values </summary>

  - All types of JavaScript.
    + boolean ─ Example: true
    + number  ─ Example: `2332`
    + string  ─ Example: "Hello world!"
  
  - Others
    + readonly ─ Values cannot be changed.
    + uint ─ Integer numbers.

</details>

<details>
  <summary> Typed for attributes </summary>

  - Attributes
    + static_attr ─ No attribute can be modified.
    + static_class ─ The class attribute cannot be modified.
    + static_id ─ The id attribute cannot be modified.

</details>


## **Examples**

```HTML
<body>
  <!-- The value that this tag can receive is only of type number -->
  <h1 typed="number"> 230 </h1>

  <!-- The value that this tag can receive is only of type string -->
  <p typed="string"> hi </p>

  <!-- The id attribute cannot be modified -->
  <!-- The value that this tag can receive is only of type string -->
  <h3 id="Be" typed="static_id, string"> BEee </h3>

  <!-- The value of this tag cannot change. -->
  <p typed="readonly">Lmao</p>
</body>
```

## **Future plans**

[ x ] Interfaces for the divs.
You can give an idea of how it could be, this will NOT be like that.

```html
<!--
  @interface User {
    "h4": string
    "p": string
  }
-->

<div typed="User">
  <h4>Carlos</h4>
  <p>description....23232dadasd</p>
</div>
```

#### v0.1.0

##### **TypeMarkup ─ 2022**