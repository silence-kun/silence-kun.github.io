import {HashRouter as Router ,Route} from "react-router-dom"
import { Index } from "./pages/Index";

import {Provider} from "react-redux"
import { store } from "./store/store";

export class App extends React.Component{
    render(){
        return (
            <Provider store={store}>
                <Router>
                    <Route path="/" component={Index} />
                </Router>
            </Provider>
        )
    }
}