import useStyles from 'styles';

const CustomTooltip = ({active, payload, label}) => {
    const classes = useStyles();
    return (
        <div>
            { active === true &&
                <div className={classes.tooltip}>
                    <h4>${label}</h4>
                    <p>{payload[0].value}</p>
                </div>
            }
        </div>
    
    )
}

export default CustomTooltip;