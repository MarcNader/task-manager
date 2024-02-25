# Project Description

This is a task manager website underdevelopment, that will allow users to easily manage their tasks

# Currently Supported Features
1- Full authentication: create account, sign in and out + sign in with Google
2- keep user signed in using local storage
2- Tasks screen:
    - Easily create new task and update or remove existing one
    - Filtration by: date and status
    - Sorting by: date

# Project Structure
The project is divided into different Folders:

- assets: all logos and images
- Screens: representing the screens (currently only Tasks working)
- components: reusable components
- separate typing files:   
      - components (Component.types)
      - redux (Store.types)
      - entities(Tasks, and any general other entities in the future) 
      - User ( User related typings) 
-finally utils: contains configs for firebase along with authentication        





# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
