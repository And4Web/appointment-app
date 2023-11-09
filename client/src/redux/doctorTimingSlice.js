import { createSlice } from "@reduxjs/toolkit";

export const doctorTimingSlice = createSlice({
  name: "doctorTimings",
  initialState: {
    doctorTimings: []
  }, 
  reducers: {
    setDoctorTimings: (state, action)=>{
      state.doctorTimings = action.payload
    }
  }
})

export const {setDoctorTimings} = doctorTimingSlice.actions;
export default doctorTimingSlice.reducer;