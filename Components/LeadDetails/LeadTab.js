import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PhoneIcon from '@mui/icons-material/Phone';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PostAddIcon from '@mui/icons-material/PostAdd';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LeadTimeline from './Tabs/LeadTimeline';
import LeadFollowUp from './Tabs/LeadFollowUp';
import LeadCommunicationLog from './Tabs/LeadCommunicationLog'
import { useState } from 'react';
import { useEffect } from 'react';
import CreateLead from '../Lead/Create/Create';

function TabPanel(props) {
  const { children, value, index, ...other } = props;


  const [age, setAge] = React.useState('');



  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({ data, refresh, setRefresh }) {
  const [value, setValue] = useState(0);
  const [editId, setEditId] = useState()


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEdit = () => {
    setEditId(data?.id)
  }

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <CreateLead editId={editId} setEditId={setEditId} refresh={refresh} setRefresh={setRefresh} />

      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
      >
        <Tabs
          className='lead-tab'
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab className='lead-tab-item' icon={<PermIdentityIcon />} label="Lead Details " {...a11yProps(0)} />
          <Tab className='lead-tab-item' icon={<AccessTimeIcon />} label="Timeline" {...a11yProps(1)} />
          <Tab className='lead-tab-item' icon={<ChecklistIcon />} label="Follow up & Notes" {...a11yProps(2)} />
          <Tab className='lead-tab-item' icon={<ChatBubbleOutlineIcon />} label="Communication Logs" {...a11yProps(3)} />
          <Tab className='lead-tab-item' icon={<FolderOpenIcon />} label="Document Locker" {...a11yProps(4)} />
          <Tab className='lead-tab-item' icon={<PostAddIcon />} label="Tickets" {...a11yProps(5)} />
          <Tab className='lead-tab-item' icon={<PhoneIcon />} label="Call Logs" {...a11yProps(6)} />
        </Tabs>
        <TabPanel className='lead-tabpanel' value={value} index={0}>
          {
            isClient && (
              <div className='lead-tabpanel-content-block'>
                <div className='lead-tabpanel-content-block-title'>
                  <h2>Lead Details</h2>
                  <a onClick={handleEdit} className='edit-btn' style={{ cursor: 'pointer' }}><EditNoteIcon /></a>
                </div>
                <div className='lead-tabpanel-content-item'>
                  <div className="lead-details-list">
                    <label>Form Interested In </label>: {data?.applyingForCourse?.name}
                  </div>

                  <div className="lead-details-list">
                    <label>Email Address </label>: {data?.email}
                  </div>

                  <div className="lead-details-list">
                    <label>Mobile Number  </label>: +{data?.phone_country_code} {data?.phone_number}
                  </div>

                  <div className="lead-details-list">
                    <label>Alternate Mobile Number </label>:
                    {
                      data?.alternate_phone_number ?
                        ` +${data?.alternate_phone_country_code} ${data?.alternate_phone_number}`
                        : ' NA'
                    }
                  </div>

                  <div className="lead-details-list">
                    <label>Name </label>: {data?.name}
                  </div>

                  <div className="lead-details-list">
                    <label>Country Applying For </label>: {data?.applyingForCountry?.name}
                  </div>

                  <div className="lead-details-list">

                    <label>University Applying For </label>: {data?.applyingForUniversity?.name}
                  </div>

                  <div className="lead-details-list">
                    <label>Lead Stage </label>: {data?.stage?.name}
                  </div>

                  <div className="lead-details-list">
                    <label>Forms Applied </label>: {data?.applyingForCourse?.name}
                  </div>

                </div>
              </div>
            )
          }
        </TabPanel>

        <TabPanel className='lead-tabpanel' value={value} index={1}>
          <LeadTimeline />
        </TabPanel>

        <TabPanel className='lead-tabpanel' value={value} index={2}>
          <LeadFollowUp />
        </TabPanel>
        <TabPanel className='lead-tabpanel' value={value} index={3}>
          <LeadCommunicationLog />
        </TabPanel>
        <TabPanel className='lead-tabpanel' value={value} index={4}>
          <div className='lead-tabpanel-content-block'>
            <div className='lead-tabpanel-content-block-title'>
              <h2>Lead Details</h2>
            </div>
            <div className='no-follw-up-block'>
              <h4>You have no follow-ups<br />
                and Remarks for Basma</h4>
            </div>
          </div>
        </TabPanel>
        <TabPanel className='lead-tabpanel' value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel className='lead-tabpanel' value={value} index={6}>
          Item Seven
        </TabPanel>
      </Box>
    </>
  );
}