import React, { useState } from 'react';
import {Dialog, Stack, TextField} from "@mui/material";
import DatePicker from "../../reusable_components/DatePicker";
import {useDispatch, useSelector} from "react-redux";
import { setDateRange, setSpecies, setFilterApplied, setTimeRange} from "./LiveFilterSlice";
import MultiSelect from "../../reusable_components/MultiSelect";
import {selectOrganization} from "../organization/organizationSlice";
import FilterListIcon from '@mui/icons-material/FilterList';
import {DesktopTimePicker, LocalizationProvider} from "@mui/x-date-pickers-pro";
import {AdapterDateFns} from "@mui/x-date-pickers-pro/AdapterDateFns";


export function LiveFilter() {
    const [state, setState] = useState({open: false});
    const {species:availSpecies} = useSelector(selectOrganization);
    const speciesItems = availSpecies.map((v,i)=>({key:v.id,value:v.name}));
    const dispatch = useDispatch();
    const [newRange, setNewRange] = useState({
      startDate: null,
      endDate: new Date(),
      key: 'range'
    });
    const [startTime, setStartTime] = useState(new Date('2018-01-01T19:00:00.000Z'));
    const [endTime, setEndTime] = useState(new Date('2018-01-01T19:00:00.000Z'));
    const [newSpecies, setNewSpecies] = useState([]);

    const handleClose = () => {
        setState({open: false})
    }
    const handleOpen = (e) => {
        setState({open: true})
    }
    const handleDateChange = (range) => {
        setNewRange({startDate: range.range.startDate, endDate: range.range.endDate, key: 'range'})
    }
    const handleEndTimeChange = (newValue) => {
        setEndTime(newValue);
    }
    const handleStartTimeChange = (newValue) => {
        setStartTime(newValue);
    }
    const handleSpecieSelect = (e) => {
        setNewSpecies(e.target.value)
    }
    
    const handleApplyFilter = () => {
        dispatch(setDateRange(newRange));
        dispatch(setSpecies(newSpecies));
        dispatch(setFilterApplied(true));
        dispatch(setTimeRange({startTime: startTime, endTime: endTime}))
        setState({open: false});
    }
    return(
        <div >
            <button onClick={handleOpen} className="mdc-button mdc-top-app-bar__action-item mdc-button__ripple">
              <FilterListIcon className='v-mid mr2' style={{color:'black'}}/>
                <span style={{color:'black'}}>Filter</span>
            </button>
            <Dialog 
                open={state.open}
                onClose={handleClose}
                closeAfterTransition>
                        <DatePicker ranges={newRange} onChange={handleDateChange} sx={{marginBottom:0}}/>
                         <LocalizationProvider dateAdapter={AdapterDateFns}>
                             <Stack spacing={2}>
                                <DesktopTimePicker
                                  label="Start Date Time"
                                  value={startTime}
                                  onChange={handleStartTimeChange}
                                  renderInput={(params) => <TextField {...params} />}
                                />
                                <DesktopTimePicker style={{marginBottom:'30px'}}
                                  label="End Date Time"
                                  value={endTime}
                                  onChange={handleEndTimeChange}
                                  renderInput={(params) => <TextField  {...params} />}
                                />
                             </Stack>
                         </LocalizationProvider>
                         <br/>
                        <MultiSelect label={"Species"} onChange={handleSpecieSelect} values={newSpecies} items={speciesItems} />
                       
                       <br/> <div style={{display: 'flex', alignItems: 'center',justifyContent: 'center',flexWrap: 'wrap',paddingBottom:'12px'}}>
                            <button className="btn btn-outline-primary" onClick={handleApplyFilter}>Apply Filter</button>
                        </div>
            </Dialog>
        </div>
    );
}
