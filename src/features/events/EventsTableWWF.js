import React, { useEffect, useState, useRef } from "react";
import GridViewIcon from '@mui/icons-material/GridView';
import ReorderIcon from '@mui/icons-material/Reorder';
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  Tab,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel, Grid,Typography, Tooltip
} from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import StarIcon from "@mui/icons-material/Star";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  getEvents,
  selectEvents,
  resetEvents,
  updateEventStatus,
  deleteEvent,
  annotateEvents,
  removeAnnotations,
  setEvents
} from "./eventsSlice";
import { selectFilters, setFilterApplied} from "../filters/filterSlice";
import { selectOrganization } from "../organization/organizationSlice";
import WeatherCard from './WeatherCard';
import WeatherGrid from './WeatherGrid';

export function EventsTableWWF() {
  const [state, setState] = useState({ page: 0, rowsPerPage: 10 });
  const [selected, setSelected] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [listView, setListView] = useState(true);
  const [reload, setReload] = useState(false);
  const [tab, setTab] = useState(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showAnnotateMenu, setShowAnnotateMenu] = useState(false);
  const [selectedAnnotations, setSelectedAnnotations] = useState([]);
  const { species: allSpecies } = useSelector(selectOrganization);
  const prevTab = useRef(tab);
  const isFirstRender = useRef(true);
  const justRan = useRef(false);
  const { results: events, count } = useSelector(selectEvents);
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();
  const isFirstRun = useRef(true);


  const status = (tab) => {
    switch (tab) {
      case 0:
        return "";
      case 1:
        return "ARCHIVED";
      case 2:
        return "FEATURED";
      default:
        return "NONE";
    }
  };

  const { page, rowsPerPage } = state;

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
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
    dispatch(getEvents(state.page + 1, filters.filterApplied, status(tab), rowsPerPage));
    justRan.current = true;
    let check = filters.filterApplied ? false : filters.filterApplied;
    dispatch(setFilterApplied(check));
  }, [filters]);

  useEffect(() => {
    if (prevTab !== tab && reload == true) {
      prevTab.current = tab;
      reloadEvents();
    }
    else {
      setReload(true)
    }
  }, [tab]);

  useEffect(() => {
    reloadEvents()
  }, []);

  useEffect(() => {
    if(selectMode == false){
      setSelected([]);
    }
  }, [selectMode]);

  const showChanges = async (tabChange = false) => {
    if(!tabChange) {
      if (events.length <= rowsPerPage) {
        dispatch(resetEvents());
      } else {
        dispatch(setEvents({results: events.slice(0, rowsPerPage * page), count: count, filterApplied: true}))
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    dispatch(getEvents(state.page + 1, filters.filterApplied, status(tab), rowsPerPage));
  };

  const reloadEvents = (pageSize = 10) => {
    justRan.current = false;
    setState({ page: 0, rowsPerPage: pageSize });

    setSelected([]);
    dispatch(resetEvents());
    showChanges(true);

  };

  const handleChangePage = (event, newPage) => {
    if (newPage > state.page && newPage + 1 > events.length/rowsPerPage) dispatch(getEvents(newPage + 1, filters.filterApplied, status(tab), rowsPerPage));
    setState({ page: newPage, rowsPerPage: state.rowsPerPage });
    setSelected([]);
  };

  const handleChangeRowsPerPage = (event) => {
    setState({ page: 0, rowsPerPage: parseInt(event.target.value, 10) });
  };

  const handleArchive = () => {
    if (tab !== 1) {
      dispatch(updateEventStatus(selected, "archive"));
    } else {
      dispatch(updateEventStatus(selected, "restore"));
    }
    setSelected([])
    if(tab == 2 || tab == 1){
      showChanges();
    }
  };

  const handleStar = () => {
    if (tab !== 2) {
      dispatch(updateEventStatus(selected, "feature"));
    } else {
      dispatch(updateEventStatus(selected, "restore"));
    }
    setSelected([])
    if(tab == 2 || tab == 1){
      showChanges();
    }
  };

  const handleDelete = () => {
    debugger;
    dispatch(deleteEvent(selected));
    setShowDeleteConfirmation(false);
    setSelected([]);
    showChanges();
  };

  const handleAnnotate = () => {
    dispatch(annotateEvents(selected, selectedAnnotations));
    setShowAnnotateMenu(false);
    setSelected([]);
    showChanges();
  };

  const handleUnAnnotate = () => {
    dispatch(removeAnnotations(selected, selectedAnnotations));
    setShowAnnotateMenu(false);
    setSelected([]);
    showChanges();
  }
  const changeUrl=(img)=>{
    //img= img.replaceAll("http://127.0.0.1:8000","https://api.forestwatch.org.pk");
    return img;

  }

  const changeName=(name)=>{
    let nameC
    if(name.includes('PTZ')){
      nameC=name.split('-');
      name=nameC[1];
    }
    return name;

  }

  return (
    <Paper className="mb4">
      <Dialog
        open={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Event?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete {selected.length} selected event(s)?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteConfirmation(false)}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showAnnotateMenu}
        onClose={() => setShowAnnotateMenu(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Annotate Event(s)</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">Select all the labels you want to apply (or remove)!</DialogContentText>
          <FormGroup>
            {allSpecies.map((species) => (
              <FormControlLabel
                control={<Checkbox name={species.name} />}
                label={species.name}
                key={species.name}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedAnnotations([...selectedAnnotations, species.name]);
                  } else {
                    setSelectedAnnotations(selectedAnnotations.filter((item) => item !== species.name));
                  }
                }}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAnnotateMenu(false);
              setSelectedAnnotations([]);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleUnAnnotate}>UnAnnotate</Button>
          <Button onClick={handleAnnotate} autoFocus>
            Annotate
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer style={{ maxHeight: 1200 }}>
        <Box style={{ borderBottom: '1px solid', borderColor: "divider", display: "flex" }}>
          <Tabs value={tab} onChange={(e, v) => setTab(v)} aria-label="basic tabs example" sx={{ flex: 9.3 }}>
            <Tab label="All" />
            {/*<Tab label="Archived" />*/}
            {/*<Tab label="Featured" />*/}
            {/*<Button onClick={()=>setSelectMode(!selectMode)} variant="text" style={{border:'1px solid #1a76d2'}} sx={{position: 'absolute', right: 45, top: 5}}>Select</Button>*/}
            {listView ?
            ( <Tooltip title="Grid View">
              <GridViewIcon style={{ position: 'absolute', right: '15', top: '12', color: "#1a76d2", '&:hover': {boxShadow: '0 0 5px 2px skyblue'} }} onClick={() => setListView(!listView)} /></Tooltip>
             ):( <Tooltip title="List view">
              <ReorderIcon style={{ position: 'absolute', right:'15', top: '12', color: "#1a76d2", '&:hover': {boxShadow: '0 0 5px 2px skyblue'} }} onClick={() => setListView(!listView)}/></Tooltip>)}
          </Tabs>
          {selected.length > 0 && (
            <div style={{ flex: 5.5, alignSelf: "center", display: "flex", justifyContent: "space-between", paddingRight: "3vw" }}>
              <h6 style={{alignSelf: "center"}}>{selected.length > 0 && (`${selected.length} selected`)}</h6>
              <Button
                onClick={() => {
                  setShowAnnotateMenu(true);
                  setSelectedAnnotations([]);
                }}
              >
                Annotations Menu
              </Button>
              <div style={{ alignSelf: "center", flex: 0.7, display: "flex", justifyContent: "space-between" }}>
                <div onClick={handleArchive}>{tab === 1 ? <UnarchiveIcon style={{ color: "red" }} /> : <ArchiveIcon />}</div>
                <StarIcon onClick={handleStar} style={{ color: tab === 2 ? "red" : "black" }} />
                <DeleteIcon onClick={() => setShowDeleteConfirmation(true)} style={{ color: "red" }} />
              </div>
            </div>
          )}
        </Box>
        {listView ?
             // List View
          (<div style={{display:'flex',justifyContent:'center'}}>
             <Table size="small" stickyHeader aria-label="sticky table"  style={{width:'70%',boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'}}>
             <TableHead>
             <TableRow>
             <TableCell>
                {selectMode ? (
                <Checkbox
                  checked={events
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((event) => event.uuid)
                    .every((item) => selected.includes(item))}
                  onChange={() => {
                    if (selected.length === rowsPerPage) setSelected([]);
                    else setSelected(events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event) => event.uuid));
                  }}
                /> ) : null}
              </TableCell>
              <TableCell>Event</TableCell>

            </TableRow>
          </TableHead>

          {events.length !== 0 ? (
            <TableBody>
              {(rowsPerPage > 0 ? events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : events).map((row) => {
                return (
                  <TableRow key={row.uuid}>
                  <TableCell>
                  {selectMode ? (
                      <Checkbox
                        checked={selected.includes(row.uuid)}
                        onChange={() => {
                          if (selected.includes(row.uuid)) {
                            setSelected(selected.filter((item) => item !== row.uuid));
                          } else {
                            setSelected([...selected, row.uuid]);
                          }
                        }}
                      /> ) : null}
                  </TableCell>


                  <TableCell>
                    <WeatherCard
                    data={row}/></TableCell>

                </TableRow>
                );
              })}
            </TableBody>
          ) : (
            <div className="container tc">Loading Data....</div>
          )}
        </Table></div>)
            :
        (
         <div>
                {selectMode ? (
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              <Checkbox
                checked={events
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((event) => event.uuid)
                  .every((item) => selected.includes(item))}
                onChange={() => {
                  if (selected.length === rowsPerPage) setSelected([]);
                  else setSelected(events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event) => event.uuid));
                }}
              />
              <span><h4>Select All</h4></span>
            </span>
          ) : null}
          <Grid container spacing={2} style={{ justifyContent: "center" }}>
          {events.slice(state.page * state.rowsPerPage, state.page * state.rowsPerPage + state.rowsPerPage).map((event) => {
       return (
        <div className="card rounded my-3 shadow-lg back-card" style={{width:"275px",margin:'10px',height:"fit-content",maxHeight: '460px'}} key={event.uuid} >
        <Typography variant="subtitle2" gutterBottom component="div"  style={{display: 'inline-flex', marginTop:'1',
        marginLeft: '0px',
        justifyContent: 'center',alignItems:'flex-start'}}>
        {selectMode ? (
              <Checkbox style={{marginBottom: '-6px', color: "black",padding:'0px'}}
                checked={selected.includes(event.uuid)}
                onChange={() => {
                  if (selected.includes(event.uuid)) {
                    setSelected(selected.filter((item) => item !== event.uuid));
                  } else {
                    setSelected([...selected, event.uuid]);
                  }
                }}
              />) : null}
                  <span>{changeName(event.camera_name)}</span></Typography>
        <div className="card-top text-center">
        <img src={changeUrl(event.thumbnail)}  alt='' className="card-img-top time" style={{width:'200px',height:'200px'}}/>

         </div>

      <WeatherGrid data={event}  />

         </div>)
        })}
        </Grid>
      </div>
        )
        }
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50, 100]}
        component="div"
        count={count !== null ? count : "loading..."}
        rowsPerPage={rowsPerPage}
        page={page}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
        showFirstButton
      />
    </Paper>
  );
}