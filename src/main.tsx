// Here's where it comes to life!

import { Provider } from 'react-redux';
import { store } from './store';
import ReactDOM from 'react-dom/client';
import SemanticAppLayout from './SemanticAppLayout';

// Initialize a React app by creating a root element for it
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render( // Render the app within the root element
  // Enables routing in a React application without reloading the browser
  <Provider store={store}>
    <SemanticAppLayout />
  </Provider>
);