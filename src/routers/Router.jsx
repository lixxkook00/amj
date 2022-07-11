import React from 'react'

import { Route,Routes} from 'react-router-dom';


import LandingPage from '../pages/LandingPage'

export default function Router() {
  return (
    <Routes>

        <Route exact path="/" element={<LandingPage />} />
        
    </Routes>
  )
}
