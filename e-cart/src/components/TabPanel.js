import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, IconButton, Typography,List, ListItem, Divider,ListItemAvatar, ListItemText} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    }
}));

export default function TabPanel(props) {
    const { table_menu_list, value, index, ...other } = props;
    const [menu, setMenu] = useState();
    const [buttonValue, setButtonValue] = useState({});
    useEffect(() => {
        if (value === index) {
        setMenu(table_menu_list[index]);
        }
    }, [value])
    const classes = useStyles();
    const decreaseValue = (dishId) => {
        if(!buttonValue[dishId]){
        buttonValue[dishId] = 0
        }
        if(buttonValue[dishId] > 0){
        setButtonValue(prevbuttonValue=>({
            ...prevbuttonValue,[dishId]:buttonValue[dishId]-1
        }))
        };
    };
    const inreaseValue = (dishId) => {
        if(!buttonValue[dishId]){
            buttonValue[dishId] = 0
        }
        if(buttonValue[dishId] >= 0){
            setButtonValue(prevbuttonValue=>({
                ...prevbuttonValue,[dishId]:buttonValue[dishId]+1
            }))
        }
    };
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
                {menu
                    ? menu.category_dishes.map(item => (
                    <React.Fragment>
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
                                style={{ float: "left" }}
                                >
                                {item.dish_currency + " " + item.dish_price}
                                </Typography>
                                <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                                style={{ float: "right" }}
                                >
                                {item.dish_calories + " calories"}
                                </Typography>
                                <br />
                                <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textSecondary"
                                >
                                {item.dish_description}
                                </Typography>
                                <br />
                                <Fab
                                variant="extended"
                                size="small"
                                style={{ backgroundColor: "green", color: "white" }}
                                aria-label="contained primary button group"
                                >
                                <IconButton
                                    style={{ color: "white" }}
                                    onClick={() => decreaseValue(item.dish_id)}
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <Button style={{ color: "white" }}>
                                    {buttonValue[item.dish_id] ? buttonValue[item.dish_id] : 0}
                                </Button>
                                <IconButton
                                    style={{ color: "white" }}
                                    onClick={() => inreaseValue(item.dish_id)}
                                >
                                    <AddIcon />
                                </IconButton>
                                </Fab>
                                <br />
                                {item.addonCat.length > 0 ? (
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="secondary"
                                >
                                    Customization Available
                                </Typography>
                                ) : null}
                            </React.Fragment>
                            }
                        />

                        <ListItemAvatar style={{ float: "right" }}>
                            <img
                            alt="not available"
                            style={{ width: "120px", height: "150px" }}
                            src={item.dish_image}
                            />
                        </ListItemAvatar>
                        </ListItem>
                        <Divider /></React.Fragment>
                    ))
                    : null}
                </List>
            )}
            </div>
        );
}
