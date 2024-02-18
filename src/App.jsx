import { Outlet } from "react-router-dom";
import Provider from "./context/Provider";
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import translations from './resources/translate.json';

i18next.use(initReactI18next).init({
  
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: translations
});

function App() {
  return (
    <I18nextProvider i18n={i18next}>
      <Provider>
        <div className="App">
          <Outlet />
        </div>
      </Provider>
    </I18nextProvider>
  );
}

export default App;
