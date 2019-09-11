import * as actions from './index'

const key = 'IDR'
const amount = 14000

describe('actions', () => {
    it('should create an action to create data', () => {
        const addKey = key
        const addAmount = amount
        const expectedAction = {
            type: actions.CREATE_DATA,
            key: addKey,
            amount: addAmount
        }
        expect(actions.createData(addKey, addAmount)).toEqual(expectedAction)
    })
    
    it('should remove an action to remove data', () => {
        const removeKey = key
        const removeAmount = amount
        const expectedAction = {
            type: actions.REMOVE_DATA,
            key: removeKey,
            amount: removeAmount
        }
        expect(actions.removeData(removeKey, removeAmount)).toEqual(expectedAction)
    })
    
    it('should change an action to change data', () => {
        const changeAmount = amount
        const expectedAction = {
            type: actions.CHANGE_AMOUNT,
            amount: changeAmount
        }
        expect(actions.changeAmount(changeAmount)).toEqual(expectedAction)
    })
})