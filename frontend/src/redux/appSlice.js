import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        open: false,
        user: null,
        emails: [],
        sentEmails: [],
        drafts: [], // State to hold all draft emails
        selectedEmail: null,
        selectedDraft: null, // State for the draft being edited
        searchText: "",
    },
    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload
        },
        setAuthUser: (state, action) => {
            state.user = action.payload;
        },
        setEmails: (state, action) => {
            state.emails = action.payload;
        },
        setSentEmails: (state, action) => {
            state.sentEmails = action.payload;
        },
        setDrafts: (state, action) => {
            state.drafts = action.payload;
        },
        setSelectedEmail: (state, action) => {
            state.selectedEmail = action.payload;
        },
        setSelectedDraft: (state, action) => {
            state.selectedDraft = action.payload;
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        }
    }
});

export const { setOpen, setAuthUser, setEmails, setSentEmails, setDrafts, setSelectedEmail, setSelectedDraft, setSearchText } = appSlice.actions;
export default appSlice.reducer;
