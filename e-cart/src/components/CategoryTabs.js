import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {AppBar,Typography,IconButton, Badge } from "@material-ui/core";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";
import axios from "axios";

function a11yProps(index) {
  return {
    className: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function CategoryTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = useState({
    value: 0,
    table_menu_list: [],
    menu_category_id: "",
    indexs: [],
    cartItems:0,
    restaurentName:''
  });
  const [buttonValue, setButtonValue] = useState({});
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
    const increaseValue = (dishId) => {
        if(!buttonValue[dishId]){
            buttonValue[dishId] = 0
        }
        if(buttonValue[dishId] >= 0){
            setButtonValue(prevbuttonValue=>({
                ...prevbuttonValue,[dishId]:buttonValue[dishId]+1
            }))
        }
    };
  useEffect(() => {
    getDishes();
    getMyOrders()
  }, [buttonValue]);
  const getMyOrders = ()=>{
    let orders = Object.values(buttonValue).reduce((a, b) => a + b, 0)
    setState(prevState=>({...prevState,cartItems:orders}))
  }
  const getDishes = () => {
    axios
      .get("https://www.mocky.io/v2/5dfccffc310000efc8d2c1ad")
      .then(response => {
        let categoriesLength = response.data[0].table_menu_list.length;
        let range = [];
        for (var i = 0; i < categoriesLength; i++) {
          range.push(i);
        }
        setState(prevState => ({
          ...prevState,
          restaurant_name:response.data[0].restaurant_name,
          table_menu_list: response.data[0].table_menu_list,
          menu_category_id:
            response.data[0].table_menu_list[0].menu_category_id,
          indexs: range
        }));
      })
      .catch(err => console.log(err));
  };
  const handleChange = (event, newValue) => {
    setState(prevState => ({
      ...prevState,
      value: newValue
    }));
  };
  return (
    <div className={classes.root}>
      {state.table_menu_list.length > 0 ? (
        <React.Fragment>
          <AppBar position="sticky" color="default">
          <div>
            <Typography style={{float:'left'}} > 
            <IconButton aria-label="delete" disabled color="primary">
              <KeyboardBackspaceIcon />
            </IconButton> {state.restaurant_name}
            </Typography>
            <Typography style={{float:'right'}} > My Orders 
              <IconButton aria-label="cart" >
                <Badge color="secondary" badgeContent={state.cartItems} showZero>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Typography>
          </div>
            <Tabs
              value={state.value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              
            >
              {state.table_menu_list.map((item, index) => {
                return (
                  <Tab
                    key={index}
                    label={item.menu_category}
                    {...a11yProps(Number(item.menu_category_id))}
                  />
                );
              })}
            </Tabs>
          </AppBar>
          {state.indexs.map(index => (
            <TabPanel
              key={index}
              value={state.value}
              index={index}
              dir={theme.direction}
              table_menu_list={state.table_menu_list}
              getMyOrders={getMyOrders}
              decreaseValue={decreaseValue}
              increaseValue={increaseValue}
              buttonValue={buttonValue}
            >
              Item {state.value}
            </TabPanel>
          ))}
        </React.Fragment>
      ) : null}
    </div>
  );
}
