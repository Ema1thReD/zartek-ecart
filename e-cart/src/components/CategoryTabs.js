import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TabPanel from './TabPanel';
import axios from 'axios';

function a11yProps(index) {
  return {
    className: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CategoryTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState();
  const [state,setState] = useState({
    value: 0,
    table_menu_list: [],
    menu_category_id: '',
    indexs:[]
  })
  
  useEffect(()=>{
    getDishes()
  },[])
  const getDishes = () =>{
    axios.get('https://www.mocky.io/v2/5dfccffc310000efc8d2c1ad').then(response=>{
      let categoriesLength = response.data[0].table_menu_list.length
      let range = []
      for(var i=0;i<categoriesLength;i++){
        range.push(i)
      }
      setState(prevState=>({
        ...prevState,
        table_menu_list: response.data[0].table_menu_list,
        menu_category_id:response.data[0].table_menu_list[0].menu_category_id,
        indexs: range
      })
      )
    }).catch(err=>console.log(err))
  }
  const handleChange = (event, newValue) => {
    console.log(event,'what it is')
    setState(prevState=>({
      ...prevState,
      value: newValue
    }))
    console.log(newValue,event)
  };
  return (
    <div className={classes.root}>
      {state.table_menu_list.length>0?
      <React.Fragment>
      <AppBar position="static" color="default">
        <Tabs
          value={state.value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {state.table_menu_list.map((item,index)=>{
            return <Tab key= {index} label={item.menu_category}  {...a11yProps(Number(item.menu_category_id))} />})}
        </Tabs>
      </AppBar>
        {state.indexs.map(index=><TabPanel key= {index} value={state.value} index={index} dir={theme.direction} table_menu_list={state.table_menu_list} >
          Item {state.value}
        </TabPanel>)}
      </React.Fragment>:null}

    </div>
  );
}