import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux"
import { store } from './store/index.ts'
import { YjsContextProvider } from './context/yjsContext.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <YjsContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </YjsContextProvider>
  </StrictMode>,
)
