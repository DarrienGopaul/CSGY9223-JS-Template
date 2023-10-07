# JavaScript Template Repository

This is a JavaScript template repository that provides a basic structure for starting a new JavaScript project. It includes configuration for testing with Jest, linting with ESLint and Prettier, and a GitHub Actions workflow for automatically running tests on every pull request. Yarn is the package manager used for managing dependencies in this template.

## Getting Started

To use this template repository for your own project, follow these steps:

1. Click the "Use this template" button on GitHub to create a new repository based on this template.

2. Clone your new repository to your local machine:

   ```bash
   git clone https://github.com/your-username/your-new-repo.git
   ```

3. Navigate to the cloned repository:

   ```bash
   cd your-new-repo
   ```

4. Install project dependencies using Yarn:

   ```bash
   yarn install
   ```

5. Start adding your JavaScript code to the `src` directory. You can create new files and modules under the `src` directory as needed.

6. To expose your modules, update the `index.js` file in the root directory. For example:

   ```javascript
   import * as hello from './src/hello.js';
   import * as yourNewModule from './src/yourNewModule.js'

   export default {
     hello,
     yourNewModule
   };
   ```

## Testing

This template includes Jest for testing your JavaScript code. Test files should be placed under the `src/__tests__` directory. You can run tests using the following command:

```bash
yarn test
```

Jest will automatically discover and run all test files under `src/__tests__`.

## Linting

This template uses ESLint and Prettier for code linting and formatting. It also includes the `eslint-plugin-unicorn` for additional linting rules. You can check and fix linting issues using the following commands:

To check for linting issues:

```bash
yarn lint
```

To automatically fix some of the linting issues:

```bash
yarn lint:fix
```

## GitHub Actions

A GitHub Actions workflow is included in this template that runs the tests on every pull request. You don't need to configure anything for this to work; it's set up to run automatically.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.