import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Photo from './pages/photo';

//Va cargar el main donde sea cargado el component Routes
/**
 * /products/:ID - permite pasar parámetro ID en la ruta localhost:3000/products/
 */
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/photos/:id" component={Photo} />
        </Switch>
    </BrowserRouter>
);

export default Routes;