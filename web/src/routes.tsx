import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import Home from '../src/pages/home';
import CreatePoint from '../src/pages/create_point';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path='/' exact />
            <Route component={CreatePoint} path='/create-point' />
        </BrowserRouter>
    );
}

export default Routes;