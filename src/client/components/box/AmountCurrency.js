import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';

class AmountCurrency extends Component{
    constructor(props){
        super(props)
        this.onChangeAmount = this.onChangeAmount.bind(this);
    }
    onChangeAmount(event){
        event.preventDefault();
        const { amount, changes } = this.props
        changes(event.target.value)
    }
    
    
    render(){
        const { amount } = this.props
        return(
            <>
                <Typography variant="h6">
                    USD - United States Dollars
                </Typography>
                <div>
                    <div className={`width50`}>
                        <Typography variant="h6" component="h6">
                            USD
                        </Typography>
                    </div>
                    <div className={`width50 text-right`}>
                        <Input
                            placeholder="Insert Value"
                            className={``}
                            defaultValue={amount}
                            onChange={ () => {this.onChangeAmount(event)} }
                            inputProps={{
                                style: { textAlign: "right" }
                            }}
                        />
                    </div>
                </div>
            </>
        )
    }
}

export default AmountCurrency