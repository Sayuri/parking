import * as React from 'react'
import { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { GeneralHeader } from './components/generalHeader'
import { BookingPage } from './pages/bookingPage'
import { AdminPage } from './pages/adminPage'
import { LoginPage } from './pages/loginPage'
import { RegistrationPage } from './pages/registrationPage'
import { ProfilePage } from './pages/profilePage'
import { ReportsPage } from './pages/reportsPage'
import { PasswordResetPage } from './pages/passwordResetPage'
import { UserState, UserWithBalanceAndId } from './models/user'
import * as backendService from './services/backendService'

type AppState = {
  initialized: boolean,
  authError: boolean,
  user: UserState,
  rate: number | undefined
}

const initialState: AppState = {
  initialized: false,
  authError: false,
  user: {type: 'Initial'},
  rate: undefined
}

export const App = () => {
  const [appState, setAppState] = useState<AppState>(initialState)

  const handleLogin = async (email: string, password: string) => {
    setAppState(appState => ({...appState, authError: false}))
    const loginResult = await backendService.logIn({email, password})
    if (loginResult.result === 'Failure') {
      setAppState(appState => ({...appState, authError: true}))
      console.log('Authentication failed')
      return
    }
    const token = loginResult.token
    localStorage.setItem('budarina_token', token)
    const me = await backendService.getMe()
    setAppState(appState => ({...appState, user: {type: 'Loaded', value: me}}))
  }

  const handleLogout = async () => {
    localStorage.setItem('budarina_token', '')
    setAppState({...initialState, initialized: true})
  }

  useEffect(() => {
    const token = localStorage.getItem('budarina_token')
    if (token) {
      backendService.getMe().then(me => setAppState(appState => ({
        ...appState,
        user: {type: 'Loaded', value: me},
        initialized: true
      })))
    } else {
      setAppState(appState => ({...appState, initialized: true}))
    }
    backendService.getRate().then(rate => setAppState(appState => ({...appState, rate})))
  }, [])

  const loggedInRoutes = (user: UserWithBalanceAndId) => (
    <div className="w-full">
      <Switch>
        <Route exact path="/booking" render={() => <BookingPage user={user} rate={appState.rate}/>}/>
        <Route exact path="/profile" component={ProfilePage}/>
        <Route exact path="/admin" component={AdminPage}/>
        <Route exact path="/reports" component={ReportsPage}/>
        <Route exact path="/passwordReset" component={PasswordResetPage}/>
        <Redirect to="/booking"/>
      </Switch>
    </div>
  )

  const guestRoutes = () => (
    <div className="w-full">
      <Switch>
        <Route exact path="/login" render={() => <LoginPage authError={appState.authError} logIn={handleLogin} />}/>
        <Route exact path="/register" component={RegistrationPage}/>
        <Redirect to="/login"/>
      </Switch>
    </div>
  )

  if (!appState.initialized) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <div>
      <GeneralHeader userState={appState.user} logOut={handleLogout} />
      {appState.user.type === 'Loaded' ? loggedInRoutes(appState.user.value) : guestRoutes()}
    </div>
  )
}
