import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getEvents,
  selectEvents,
  resetEvents,
  setEvents
} from "./LiveSlice";
import { selectFilters, setFilterApplied, resetFilters } from "../features/filters/LiveFilterSlice";
import { selectOrganization } from "../features/organization/organizationSlice";

import LiveWeather from './LiveWeather';
 function LiveEvents(props) {
  const [state, setState] = useState({ page: 0, rowsPerPage: 10 });
  const [selected, setSelected] = useState([]);
  const isFirstRender = useRef(true);
  const justRan = useRef(false);
  const { results: events, count } = useSelector(selectEvents);
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();
  const [row, setRow] = useState();
  const [view, setView] = useState('camera');

  const cam_id = props.cam_id ;
  const { page, rowsPerPage } = state;

  useEffect(() => {
    setSelected([]);
    dispatch(resetEvents());
    showChanges(true);
  }, [rowsPerPage]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (justRan.current) {
      justRan.current = false;
      return;
    }
  
    dispatch(getEvents(state.page + 1, filters.filterApplied, rowsPerPage, cam_id));
    justRan.current = true;
    let check = filters.filterApplied ? false : filters.filterApplied;
    dispatch(setFilterApplied(check));
  }, [filters, cam_id]); // Include cam_id as a dependency
  

  



  const showChanges = async (tabChange = false) => {
    if(!tabChange) {
      if (events.length <= rowsPerPage) {
        dispatch(resetEvents());
      } else {
        dispatch(setEvents({results: events.slice(0, rowsPerPage * page), count: count, filterApplied: true,cam_id}))
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    dispatch(getEvents(state.page + 1, filters.filterApplied,  rowsPerPage,cam_id));
  };

  const reloadEvents = (pageSize = 10) => {
    justRan.current = false;
    setState({ page: 0, rowsPerPage: pageSize });
    setSelected([]);
    dispatch(resetEvents());
    showChanges(true);
  };

  const handleChangePage = (event, newPage) => {
    if (newPage > state.page && newPage + 1 > events.length/rowsPerPage) dispatch(getEvents(newPage + 1, filters.filterApplied,  rowsPerPage,cam_id));
    setState({ page: newPage, rowsPerPage: state.rowsPerPage });
    setSelected([]);
  };

  const handleChangeRowsPerPage = (event) => {
    setState({ page: 0, rowsPerPage: parseInt(event.target.value, 10) });
  };

  
  return (
    <center>
    <h3 style={{ background: "#2c3e50", color: "#f39c12", width: "95%", marginBottom: '0px' }}>Events</h3>
    
    <div style={{ overflow: 'scroll', height: '48vh' }}>
      
      <TableContainer style={{ maxHeight: 1200 }}>
        <div style={{display:'flex',justifyContent:'center'}}>
             <Table size="small" stickyHeader aria-label="sticky table"  style={{width:'70%',boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'}}>
             

          {events.length !== 0 ? (
            <TableBody>
              {(rowsPerPage > 0 ? events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : events).map((row) => {
                // debugger;
                return (
                  <TableRow key={row.uuid}>
                 
                 <TableCell onClick={() => {
                  props.eventClick(row);
                  setRow(row.uuid);
                  setView("video");
                }}><LiveWeather data={row} /></TableCell>
                    
                </TableRow>
                );
              })}
            </TableBody>
          ) : (
            <div className="container tc">No event exists....</div>
          )}
        </Table></div>
           
        
      </TableContainer>{events.length !== 0 ? (
      <TablePagination
        rowsPerPageOptions={[10, 20, 50, 100]}
        component="div"
        count={count !== null ? count : "loading..."}
        rowsPerPage={rowsPerPage}
        page={page}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
        showFirstButton
      />):(<></>)}
    </div></center>
  );
}
export default  LiveEvents;