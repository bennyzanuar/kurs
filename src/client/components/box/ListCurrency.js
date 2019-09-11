import React, { Component } from 'react'
import { currencyCountry } from '../../configs'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

function formatNumber(num) {
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

class ListCurrency extends Component {
    handleRemove(key, amount){
        const { deletes } = this.props
        deletes(key, amount)
    }
    render(){
        const { rates, amount, handleRemove } = this.props
        return(
            <>
            {
                Object.keys(rates).map((key,index) => {
                return  <List 
                            key={index}
                        >
                            <ListItem>
                                <div className={`box-left`}>
                                    <div className={`width50`}>
                                        <Typography variant="h6" component="h6">
                                            {key}
                                        </Typography>
                                    </div>
                                    <div className={`width50 text-right`}>
                                        <Typography component="p">
                                            {formatNumber((rates[key] * amount).toFixed(4))}
                                        </Typography>
                                    </div>
                                    <Typography component="p">
                                        <strong>{currencyCountry[key]}</strong>
                                    </Typography>
                                    <Typography component="p">
                                        {`1 USD = ${key} ${formatNumber((rates[key] * 1).toFixed(4))}`}
                                    </Typography>
                                </div>
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Delete" onClick={ (e) => {this.handleRemove(key, amount)} }>
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                })
            }
            </>
        )
    }
}

export default ListCurrency