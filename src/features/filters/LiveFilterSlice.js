import { createSlice } from "@reduxjs/toolkit";
import dateRange from "react-date-range/dist/components/DateRange";

export const LiveFilterSlice = createSlice({
  name: "filters",
  initialState: {
    filterApplied: false,
    range: {
      startDate: null,
      endDate: new Date(),
      key: "range",
    },
    startTime: new Date(),
    endTime: new Date(),
    species: [],
  },
  reducers: {
    setTimeRange: (state, action) => {
      state.startTime = action.payload.startTime;
      state.endTime = action.payload.endTime;
    },
    setFilterApplied: (state, action) => {
      state.filterApplied = action.payload;
    },
    setDateRange: (state, action) => {
      state.range = action.payload;
    },
    setSpecies: (state, action) => {
      state.species = action.payload;
    },
    resetFilters: (state) => {
      state.filterApplied = false;
      state.range = {
        startDate: null,
        endDate: new Date(),
        key: "range",
      };
      state.startTime = new Date();
      state.endTime = new Date();
      state.species = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDateRange,  setSpecies, setFilterApplied, setTimeRange, resetFilters } = LiveFilterSlice.actions;
export const selectFilters = (state) => state.filters;

export default LiveFilterSlice.reducer;
