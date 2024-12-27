import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "@/lib/axiosInstance";
import { Profile, Project } from "@/common/constants";

interface RecommendationsState {
  profiles: Profile[];
  profilesToFollow: Profile[];
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  hasFetched: boolean;
}

const initialState: RecommendationsState = {
  profiles: [],
  projects: [],
  profilesToFollow: [],
  isLoading: false,
  error: null,
  hasFetched: false,
};

export const fetchRecommendations = createAsyncThunk(
  "recommendations/fetchRecommendations",
  async () => {
    const response = await axiosInstance.get("/api/proxy/recommendations");

    return response.data?.data;
  }
);

const recommendationsSlice = createSlice({
  name: "recommendations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRecommendations.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRecommendations.fulfilled, (state, action: any) => {
      state.isLoading = false;
      const { profiles, projects, profilesToFollow } = action.payload;
      state.profiles = profiles || [];
      state.projects = projects || [];
      state.profilesToFollow = profilesToFollow || [];
      state.hasFetched = true;
      state.error = null;
    });
    builder.addCase(fetchRecommendations.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch recommendations";
    });
  },
});

export default recommendationsSlice.reducer;
