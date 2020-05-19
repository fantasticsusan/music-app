import React from 'react'
import App from './App'
import {Provider} from "react-redux"
import { render } from 'react-dom'
import configureStore from "./Utils/ConfigureStore";

const store = configureStore()

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
