import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './App.css';
import { Button, TextField } from '@mui/material';
import { collections } from './schema';

//admins - alovelace, users - 2bRwvKD2z4QPNLpxRfwRxbjJN2r1

const dataView = (keys, data) => (
  data ? (<Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'start' }}>
    {
      keys.map(key =>
        <Typography style={{ color: 'black' }} key={key}>{`${key}: ${JSON.stringify(data[key])}`}</Typography>
      )
    }
  </Box>) : null
)

function CustomTabPanel(props) {
  const { value, index, data, collection, onClick, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} >
          <Box style={{ display: 'flex' }}>
            <TextField id="outlined-basic" label="document ID" variant="outlined" />
            <Button variant="contained" onClick={() => onClick(document.getElementById('outlined-basic').value)}>Search</Button>
          </Box>
          <Box style={{ display: 'flex', marginTop: '10px' }}>
            {dataView(collections[collection], data)}
          </Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function ReactApp() {
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function getData(key, uid) {
    fetch(`http://localhost:3000/${key}?uid=${uid}`)
      .then(async (response) => {
        var body = await response.json();
        console.log(JSON.stringify(body))
        setData({ [key]: body, ...data })
      })
      .catch(err => {
        console.log(err)
        alert(err)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <Box sx={{ width: '100%', flex: 1 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              {Object.entries(collections).map(([key], index) => <Tab label={key} {...a11yProps(index)} />)}
            </Tabs>
          </Box>
          {Object.entries(collections).map(([key], index) => (
            <CustomTabPanel
              value={value}
              index={index}
              data={data[key]}
              collection={key}
              onClick={(uid) => getData(key, uid)}
            />
          ))}
        </Box>
      </header>
    </div>
  );
}

export default ReactApp;
