import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData, removeData, createData, changeAmount } from '../../actions'
import { bindActionCreators } from 'redux'
import ListCurrency from '../box/ListCurrency'
import SelectCurrency from '../box/SelectCurrency'
import AmountCurrency from '../box/AmountCurrency'

import Grid from '@material-ui/core/Grid';

const default_amount = 10

class Home extends Component {
    constructor(props){
        super(props)
    }
    static fetchData(store) {
        return store.dispatch(fetchData(default_amount))
	}
    componentDidMount() {
        this.props.fetchData(default_amount)
	}
    
    render() {
        const { data } = this.props
        
        const amount = data.amount
        const rates = data.ratesDisplay
        const ratesFree = data.ratesFree

        const suggestions = Object.keys(ratesFree).map(key => ({
            value: key,
            label: key,
        }))
        
        return(
            <>
                <Grid container className={`grid-center`}>
                    <Grid item xs={12}>
                        <AmountCurrency
                            amount={default_amount}
                            changes={this.props.changeAmount}
                        />
                        <ListCurrency 
                            rates={rates} 
                            amount={amount}
                            deletes={this.props.removeData}
                        />
                        <SelectCurrency 
                            suggestions={suggestions}
                            amount={amount}
                            creates={this.props.createData}
                        />
                    </Grid>
                </Grid>
            </>
        )
    }
}

function mapStateToProps(state){
    return { data: state.latest }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(
        { fetchData, removeData, createData, changeAmount }, dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);