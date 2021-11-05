import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Cadastro from './pages/Cadastro'
import Home from './pages/Home'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/cadastro">
                    <Cadastro />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes