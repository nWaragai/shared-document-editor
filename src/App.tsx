


import { ClipLoader } from 'react-spinners';
import './App.css'
import { Router } from './components/router/Router'
import { useAuthenticationObserver } from './hooks/useAuthenticationObserver'

function App() {

  const { isAuthenticated } = useAuthenticationObserver();
  if(!isAuthenticated){

    return (
      <div className='load-body'>
        <ClipLoader size={200} color='rgb(54, 215, 183)' className='load-spinner'/>
      </div>
    )
  }

  return (
    <>
      <Router />
    </>
  )
}

export default App
