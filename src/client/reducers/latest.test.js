import * as actions from '../actions'
import reducer from './latest'

describe('todos reducer', () => {
    const state = {}
    const key = 'JPY'
    const amount = 10
    const ratesDisplay = {
        IDR: '14102.0011',
        EUR: '0.8854',
        GBP: '0.7720',
        SGD: '1.3568'
    }
    const ratesFree = {
        JPY: '110.7579',
        ISK: '120.1523'
    }
    
    const currentState = {
        ratesDisplay: ratesDisplay,
        ratesFree: ratesFree
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(state)
    })
    
    it('should handle CREATE_DATA', () => {
        
        let newRatesFree = Object.assign({}, ratesFree);
        let newRatesDisplay = Object.assign({}, ratesDisplay);
        
        newRatesDisplay[key] = newRatesFree[key]
        delete newRatesFree[key]
        
        const expectedResult = {
            ratesDisplay : newRatesDisplay,
            ratesFree : newRatesFree,
            amount : amount
        }

        expect(reducer(currentState, {
            type: actions.CREATE_DATA, 
            key: key,
            amount: amount
        })).toEqual(expectedResult);
    })
    
    it('should handle REMOVE_DATA', () => {
        
        let newRatesDisplay = Object.assign({}, currentState.ratesDisplay);
        let newRatesFree = Object.assign({}, currentState.ratesFree);
        
        newRatesFree[key] = newRatesDisplay[key]
        delete newRatesDisplay[key];
        
        const expectedResult = {
            ratesDisplay : newRatesDisplay,
            ratesFree : newRatesFree,
            amount : amount
        }

        expect(reducer(currentState, {
            type: actions.REMOVE_DATA, 
            key: key,
            amount: amount
        })).toEqual(expectedResult);
    })
    
    it('should handle CHANGE_DATA', () => {
        let newRatesDisplay = Object.assign({}, currentState.ratesDisplay);
        let newRatesFree = Object.assign({}, currentState.ratesFree);
        
        const expectedResult = {
            ratesDisplay : newRatesDisplay,
            ratesFree : newRatesFree
        }

        expect(reducer(currentState, {
            type: actions.CHANGE_DATA, 
            amount: amount
        })).toEqual(expectedResult);
    })
})