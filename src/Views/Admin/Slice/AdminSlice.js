import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    placeholderGlow: false,
    spinnerGlow: false,
    create_campaign: {},
    campaigns_data: {},
    campaign_placeholder: false,
    create_update_campaign_spinner: false,
};

const AdminSlice = createSlice({
    name: "Admin_slice",
    initialState,
    reducers: {
        // Update create campaign data (onChange)
        update_create_campaign_data(state, action) {
            Object.assign(state.create_campaign, action.payload);
        },

        // Get all campaign data
        getCampaign(state, action) {
            const { type, data } = action.payload;

            switch (type) {
                case "request":
                    state.campaigns_data = {};
                    state.campaign_placeholder = true;
                    break;

                case "response":
                    state.campaigns_data = data || {};
                    state.campaign_placeholder = false;
                    break;

                case "failure":
                    state.campaigns_data = {};
                    state.campaign_placeholder = false;
                    break;

                default:
                    break;
            }
        },

        // Create or update campaign
        postOrEditCampign(state, action) {
            const { type, data } = action.payload;

            switch (type) {
                case "request":
                    state.create_update_campaign_spinner = true;
                    break;

                case "response":
                    state.create_update_campaign_spinner = false;
                    state.campaigns_data.campaignCount = state.campaigns_data.campaignCount || 0 + 1;
                    state.campaigns_data.campaign.push(data);
                    state.create_campaign = {}
                    break;

                case "failure":
                    state.create_update_campaign_spinner = false;
                    break;

                default:
                    break;
            }
        },

        // Handle open create campaign modal
        updateCreateCampaign(state) {
            state.spinnerGlow = false;
        }
    }
});

export const {
    update_create_campaign_data,
    getCampaign,
    updateCreateCampaign,
    postOrEditCampign
} = AdminSlice.actions;

export default AdminSlice.reducer;
