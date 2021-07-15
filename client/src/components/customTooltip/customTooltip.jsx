import useStyles from 'styles';

const CustomTooltip = ({active, payload}) => {
    const classes = useStyles();
    
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    
    return (
        <div>
            { active === true &&
                <div className={classes.tooltip}>
                    <h4>{formatter.format(payload[0].value)}</h4>
                </div>
            }
        </div>
    
    )
}

export default CustomTooltip;