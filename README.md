# E-commerce Web Application

## Project Overview
This project is a React-based e-commerce Vite application written in mostly typescript that utilizes **FakeStoreAPI** for simulating product data, user management, and shopping cart functionalities. The application demonstrates React concepts, including state management with **Redux Toolkit**, data fetching with **React Query**, and user authentication. It also incorporates **React-i18next** for internationalization and accessibility features. Additionally the application incorporates Continuous Integration & Continuous Deployment Practices through GitHub Actions workflows. The project redeploys to Netlify (can be found at https://ct-ecommerce-store.netlify.app/)after any push in which the CI tests have passed successfully. The GitHub repo that this application exists in can be found at https://github.com/gabegoodoi/e-commerce-app

## Key Features
- **User CRUD**: Create, read, update, and delete user profiles.
- **Product Catalog**: Browse, filter, and search for products.
- **Shopping Cart**: Add, update, and remove products, with real-time calculations for total price and quantity.
- **Checkout and Order History**: Simulate the checkout process and view past orders.
- **Performance Optimization**: Use of `useMemo` and `useCallback` to optimize the application.
- **Internationalization**: Multi-language support with **React-i18next**.
- **Testing**: Unit and integration tests for DeleteUser components.

## Steps to Install
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies.
4. Start the development server and run the application locally.

## Project Structure
- **/.github**: Contains the yml workflow file that propels CI/CD in this project.
- **/src**
  - **/__tests__**: Contains a test TSX file for DeleteUser that utilizes Jest.
  - **/components**
    - **/Product**: Contains `ProductCatalog` & `ShoppingCart` TSX components
    - **/User**: Contains `CartHistory`, `CreateUser`, `DeleteUser`, `Login`, `Logout`, & `UpdateUser` components
    - **AccessDenied**: TSX component for context-forbidden endpoints
    - **NotFound**: TSX component for non-existent endpoints
    - **Homepage**: TSX component directory and product catalog display
  - **/context**: Contains `UserContext` TSX file which stores the logged-in user
  - **/features**: Contains Redux slices and actions
  - **/internationalization**: Contains i18n file with key:value language dictionary
  - **SemanticAppLayout**: TSX file pulling everything together and keeping it current
  - **store**: Central hub of the application's states


## Technologies Used
- **React**: For building the user interface.
- **Redux Toolkit**: For managing global state.
- **React Query**: For data fetching from the FakeStoreAPI.
- **React-i18next**: For internationalization (i18n).
- **Jest**: For testing (unit and integration).
- **React Testing Library**: For simulating user interactions in tests.
- **Session Storage**: For persisting token and cart data.

## Conclusion
This project demonstrates the usage of advanced React concepts, including **Redux** for state management, **React Query** for data fetching, and **React-i18next** for internationalization. It simulates a real-world e-commerce platform with user authentication, a product catalog, a shopping cart, and a checkout process, providing a solid foundation for a scalable application. It deploys in the CI/CD method.