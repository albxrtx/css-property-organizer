<p align="center">
  <img src="resources/icon.png" width="128" alt="CSS Property Organizer">
</p>

<h1 align="center">CSS Property Organizer</h1>

<p align="center">
  Cleaner CSS. Better organized. Easier to read.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/PostCSS-DD3A0A?style=flat&logo=postcss&logoColor=white" alt="PostCSS">
  <img src="https://img.shields.io/badge/version-0.0.1-blue?style=flat" alt="Version">
</p>

## Features

CSS Property Organizer automatically sorts CSS declarations into predefined groups based on their purpose, helping you keep your stylesheets structured and readable.

- Automatic organization: rearranges CSS properties into logical groups.

- Clear grouping: separates groups with comments for easier navigation.

- Consistent formatting: applies the same organization across your CSS rules.

### Before

```css
.card {
  color: rgb(51, 51, 51);
  display: flex;
  padding: 20px;
  background: white;
  position: relative;
  border: 1px solid rgb(204, 204, 204);
}
```

### After

```css
.card {
  /* background */
  background: white;

  /* layout */
  display: flex;
  position: relative;

  /* border */
  border: 1px solid rgb(204, 204, 204);

  /* box */
  padding: 20px;

  /* typography */
  color: rgb(51, 51, 51);
}
```

The extension keeps declarations within their original CSS rule while reorganizing them according to their property group.

## Usage

1. Open a CSS file in Visual Studio Code.
2. Open the Command Palette with `Ctrl+Shift+P`.
3. Run **Organize CSS by Groups**.

The extension only operates on CSS files.

## Property Groups

Properties are organized into groups such as:

- Background
- Layout
- Border
- Box
- Typography
- Animation
- Other

The property groups are defined in the extension configuration and can be expanded as the project evolves.

## Requirements

- Visual Studio Code `1.105.0` or later.

## Development

Clone the repository and install the dependencies:

```bash
git clone https://github.com/albxrtx/css-property-organizer.git
cd css-property-organizer
npm install
```

Compile the extension:

```bash
npm run compile
```

Run the tests:

```bash
npm test
```

## License

This project is licensed under the MIT License.
