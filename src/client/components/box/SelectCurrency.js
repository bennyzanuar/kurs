import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Select from 'react-select';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingBottom: '10px'
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    inputTop: {
        margin: theme.spacing.unit,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    width100: {
        width: '100%',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
})

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
            inputComponent,
            inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps,
            },
        }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
            fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    )
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

class SelectCurrency extends Component {
    constructor(props){
        super(props)
        this.state = {
            single: null,
            openSelect: false,
        }
        this.onChange = this.onChange.bind(this);
        this.openClose = this.openClose.bind(this);
    }
    onChange = name => value => {
        this.setState({
            [name]: value,
        })
    }
    onSubmit(event){
        event.preventDefault();
        const { single } = this.state
        const { amount, creates } = this.props

        if (single) {
            creates(single.value, amount);
            this.setState({
                single: '',
                openSelect:false
            })
        }
    }
    openClose(){
        this.setState({openSelect:true})
    }
    render(){
        const { suggestions, classes, theme } = this.props
        const { single, openSelect } = this.state

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };
        
        return(
            <>
                {
                    openSelect == true ? <form onSubmit={() => { this.onSubmit(event) }}>
                        <div className={classes.root}>
                            <NoSsr>
                                <Select
                                    name='select_name'
                                    classes={classes}
                                    styles={selectStyles}
                                    options={suggestions}
                                    components={components}
                                    value={single}
                                    onChange={this.onChange('single')}
                                    placeholder="Add New Currency"
                                    isClearable
                                />
                            </NoSsr>
                        </div>
                        <Button variant="contained" color="primary" type="submit" size="small" className={classes.width100}>
                            <SaveIcon />
                            Submit
                        </Button>
                    </form>
                    :
                    <Button variant="contained" size="small" onClick={this.openClose} className={classes.width100}>
                        <SaveIcon />
                        Add More Currency
                    </Button>
                }
            </>
        )
    }
}

export default withStyles(styles, { withTheme: true })(SelectCurrency);