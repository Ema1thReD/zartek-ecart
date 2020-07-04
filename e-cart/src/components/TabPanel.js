import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Button, IconButton } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Fab from '@material-ui/core/Fab';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    }
}));

export default function TabPanel(props) {
    const { table_menu_list, value, index, ...other } = props;
    const [menu, setMenu] = useState()
    const [buttonValue, setButtonValue] = useState()
    useEffect(() => {
        if (value === index) {
            setMenu(table_menu_list[index])
        }
    }, [value])
    const classes = useStyles();
    const decreaseValue = (dishName) => {
        console.log(dishName)
        setButtonValue(prevbuttonValue =>({dishName: prevbuttonValue - 1}))
    }
    const inreaseValue = () => {
        setButtonValue(prevbuttonValue => prevbuttonValue + 1)
    }
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <List className={classes.root}>
                    {menu ?
                        menu.category_dishes.map(item =>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={item.dish_name}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                                style={{ float: 'left' }}>{item.dish_currency + ' ' + item.dish_price}</Typography>
                                            <Typography component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                                style={{ float: 'right' }}>{item.dish_calories + ' calories'}</Typography><br />
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textSecondary"
                                            >
                                                {item.dish_description}
                                            </Typography><br />
                                            <Fab variant="extended" size="small" style={{ backgroundColor: "green", color: "white" }} aria-label="contained primary button group">
                                                <IconButton style={{ color: "white" }} onClick={() => decreaseValue(item.dish_name)}><RemoveIcon /></IconButton >
                                                <Button style={{ color: "white" }} >{buttonValue?buttonValue.dishName:0}</Button>
                                                <IconButton style={{ color: "white" }} onClick={()=>inreaseValue(item.dishName)} ><AddIcon /></IconButton >
                                            </Fab ><br />
                                            {item.addonCat.length > 0 ?
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="secondary"
                                                >Customization Available</Typography> : null}
                                        </React.Fragment>
                                    }
                                />

                                <ListItemAvatar style={{ float: "right" }}>
                                    <img alt="dish image" style={{ width: '120px', height: 'auto' }} src={item.dish_image} />
                                </ListItemAvatar>

                            </ListItem>
                        )
                        : null}
                </List>
            )}
        </div>
    );
}