// import './App.css';
// import Body from './Components/Body';
// import appStore from './Utils/appStore';
// import { Provider } from 'react-redux';

// function App() {
//   return (
//     <div>
//       <Provider store= {appStore}>
//         <Body />
//       </Provider>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import appStore, { persistor } from './Utils/appStore';
import Body from './Components/Body';
import './App.css';

const App = () => (
  <Provider store={appStore}>
    <PersistGate loading={null} persistor={persistor}>
      <Body />
    </PersistGate>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
