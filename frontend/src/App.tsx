import { AuthContext } from "contexts/AuthProvider"
import React, { useContext } from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import "./App.scss"
import Login from "./pages/auth/Login"
import Admin from "./pages/admin"
import Demo from "./pages/demo"
import PrivateRoute from "./PrivateRoutes"

const App: React.FC = () => {
    const { auth }: any = useContext(AuthContext)
    const hasNoCredentials = !auth.loading && !Boolean(auth.token)
    return (
        <BrowserRouter>
            <Switch>
                {hasNoCredentials && (
                    <Route path="/login" component={Login} />
                )}
                <Route exact path="/demo" component={Demo} />
                <Route path="/demo/:id" component={Demo} />
                <PrivateRoute path="/" component={Admin} />
                <Route>
                    <Redirect to="/demo" />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App
