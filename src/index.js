import '@babel/polyfill'
import express from 'express'
import compression from 'compression'
import {matchRoutes} from 'react-router-config'
import proxy from 'express-http-proxy'
import ejs from 'ejs'
import Routes from './client/Routes'
import renderer from './helpers/renderer'
import createStore from './helpers/createStore'

const app = express()
const port = process.env.PORT || 5000

app.use(compression())
app.set('view engine', 'ejs')
app.use('/api', proxy('https://api.exchangeratesapi.io', {
    proxyReqOptDecorator(opts) {
        opts.headers['x-forwarded-host'] = 'localhost:3110'
        return opts
    }
}))
app.use(express.static('public'))
app.get("*", (req, res) => {
    const store = createStore(req)
    const promises = matchRoutes(Routes, req.path).map(({ route }) => {        
        let fetchData = route.component.fetchData
		return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null)
    }).map(promise => {
        if(promise){
            return new Promise((resolve, reject) => {
                promise.then(resolve).catch(resolve)
            })
        }
    })    
    Promise.all(promises).then(() => {
        const context = {} 
        const { content, helmet, initialState } =  renderer(req, store, context)
        if(context.url){
            return res.redirect(301, context.url)
        }
        if(context.notFound){
            res.status(404)
        }
         
        res.render('index', {
            content: content,
            helmet: helmet,
            initialState: initialState
        })
    })
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})