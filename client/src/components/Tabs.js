import React from 'react';
import { Tabs, Tab, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

export default function MyTabs({ value, onChange, tabs }) {
  const classes = useStyles();

  return (
    <Tabs
      className={classes.root}
      value={value}
      onChange={onChange}
      indicatorColor="secondary"
      variant="scrollable"
      scrollButtons="auto"
    >
      {tabs.map((title, index) => (
        <Tab label={<Typography variant="body2">{title}</Typography>} key={index} />
      ))}
    </Tabs>
  );
}
