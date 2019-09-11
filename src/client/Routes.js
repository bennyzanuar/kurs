import React from 'react'
import App from './App'
import Home from './components/pages/Home'
import NotFoundPage from './components/pages/NotFoundPage'

export default [
    {
        component : App,
        routes: [
            {
                component: Home,
                path: '/',
                exact: true
            },
            {
                component: NotFoundPage
            }
        ]
    }
];


