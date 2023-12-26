import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './App.css';
import { Button, TextField } from '@mui/material';
import { collections } from './schema';

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
  const { activeIndex, index, data, dataKey, path, onClick, ...other } = props;
  const collectionPath = dataKey ? dataKey : path;

  const dataKeys = collections.find((element) => element.key == collectionPath || element.path == path).props

  return (
    <div
      role="tabpanel"
      hidden={activeIndex !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {activeIndex === index && (
        <Box sx={{ p: 3 }} >
          <Box style={{ display: 'flex' }}>
            <TextField id="outlined-basic" label="document ID" variant="outlined" />
            <Button
              variant="contained"
              onClick={() => {
                const input = document.getElementById('outlined-basic').value
                const urlPath = dataKey ? `custom?path=${input}` : `${path}/${input}`
                onClick(urlPath, collectionPath)
              }}>
              Search
            </Button>
          </Box>
          <Box style={{ display: 'flex', marginTop: '10px' }}>
            {dataView(dataKeys, data)}
          </Box>
        </Box>
      )}
    </div>
  );
}

function TabProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function ReactApp() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [data, setData] = React.useState({});

  const handleChange = (event, newIndex) => {
    setActiveIndex(newIndex);
  };

  /**
   * Fetches data from the API, 
   * urlPath is attached to the base API, e.g. users/xyz or users/xyz/roles/123
   * collectionPath is used to keep store data, e.g. users
   * @param {string} urlPath 
   * @param {string} collectionPath 
   */
  function getData(urlPath, collectionPath) {
    fetch(`http://localhost:3000/${urlPath}`)
      .then(async (response) => {
        var body = await response.json();
        console.log(JSON.stringify(body))
        setData({ [collectionPath]: body, ...data })
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
            <Tabs value={activeIndex} onChange={handleChange} aria-label="tabs">
              {collections.map((collection, index) => <Tab label={collection.label} {...TabProps(index)} />)}
            </Tabs>
          </Box>
          {collections.map((collection, index) => (
            <CustomTabPanel
              activeIndex={activeIndex}
              index={index}
              data={collection.path == 'custom' ? data[collection.key] : data[collection.path]}
              dataKey={collection.key}
              path={collection.path}
              onClick={(urlPath, collectionPath) => getData(urlPath, collectionPath)}
            />
          ))}
        </Box>
      </header>
    </div>
  );
}

export default ReactApp;
