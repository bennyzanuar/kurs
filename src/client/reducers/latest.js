import { FETCH_DATA, REMOVE_DATA, CREATE_DATA, CHANGE_AMOUNT } from '../actions'

const defaultDisplay = ['IDR','EUR','GBP','SGD']

let rates = {}

export default (currentState, action) => {
    currentState = currentState || {};
    let amount = action.amount || 0

    switch (action.type) {
        case FETCH_DATA:
            let allRates = Object.assign({}, action.payload.rates)            
            
            let ratesForSelectInput = Object.keys(allRates)
            .filter(rate => !defaultDisplay.includes(rate) )
            .reduce((a, c) => {
                a[c] = allRates[c]
                return a
            }, {})
            
            let ratesForDisplayInit = defaultDisplay.reduce((a, c) => {
                a[c] = allRates[c]
                return a
            }, {})
                        
            return {
                ratesDisplay : ratesForDisplayInit,
                ratesFree : ratesForSelectInput,
                amount : amount
            }
        case 'REMOVE_DATA':
            if (action.key) {
                let currentRatesDisplay = Object.assign({}, currentState.ratesDisplay)
                
                let ratesForDisplay = Object.keys(currentRatesDisplay)
                .filter(rate => rate != action.key )
                .reduce((a, c) => {
                    a[c] = currentRatesDisplay[c]
                    return a
                }, {})
                
                let ratesForSelectInput = Object.assign({[action.key]: currentRatesDisplay[action.key]}, currentRatesDisplay)

                return {
                    ratesDisplay : ratesForDisplay,
                    ratesFree : ratesForSelectInput,
                    amount : amount
                }
            } else {
                return currentState;
            }
        case 'CREATE_DATA':
            let newRatesFree = Object.assign({}, currentState.ratesFree)
            let newRatesDisplay = Object.assign({}, currentState.ratesDisplay)
            
            let ratesForSelect = Object.keys(newRatesFree)
            .filter(rate => rate != action.key )
            .reduce((a, c) => {
                a[c] = newRatesFree[c]
                return a
            }, {})
            
            let ratesForDisplay = Object.assign(newRatesDisplay, {[action.key]: newRatesFree[action.key]})

            return {
                ratesDisplay : ratesForDisplay,
                ratesFree : ratesForSelect,
                amount : amount
            }
        case 'CHANGE_AMOUNT':
            let ratesFreeAmount = Object.assign({}, currentState.ratesFree)
            let ratesDisplayAmount = Object.assign({}, currentState.ratesDisplay)
            if (amount > -1) {
                return {
                    ratesDisplay : ratesDisplayAmount,
                    ratesFree : ratesFreeAmount,
                    amount : amount
                }
            }
        default:
            return currentState
    }
};