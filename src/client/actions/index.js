export const FETCH_DATA = "LOAD_DATA_EXCHANGE"
export const REMOVE_DATA = "REMOVE_DATA"
export const CREATE_DATA = "CREATE_DATA"
export const CHANGE_AMOUNT = "CHANGE_AMOUNT"

function tryGetDataCache(url) {
    return new Promise((resolve, reject) => {
        if(typeof window !== 'undefined' && 'caches' in window) {
            return caches.match(url)
            .then(function(matchedResponse) {
                if (!matchedResponse) {
                    reject()
                    return
                }
                resolve(matchedResponse.json())
            })
            .catch(e => {
                reject()
            })
        }
        reject()
    })
}

export const fetchData = (amount) => async (dispatch, getState, api) => {
    const res = await api.get('/latest?base=USD')
    try {
        dispatch({
            type: FETCH_DATA,
            payload: res.data,
            amount: amount
        })
    } catch (e) {
        tryGetDataCache('locahost:5000/latest?base=USD')
        .then(response => 
            dispatch({
                type: FETCH_DATA,
                payload: response.data,
                amount: amount
            })
        )
    }
}

export const createData = (key, amount) => {
    return {
        type: CREATE_DATA, 
        key: key,
        amount: amount
    }
}

export const removeData = (key, amount) => {
    return {
        type: REMOVE_DATA, 
        key: key,
        amount: amount
    }
}

export const changeAmount = (amount) => {
    return {
        type: CHANGE_AMOUNT, 
        amount: amount
    }
}