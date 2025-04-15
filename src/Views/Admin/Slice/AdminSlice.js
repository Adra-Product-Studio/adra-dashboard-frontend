import { createSlice } from "@reduxjs/toolkit";

const AdminSlice = createSlice({
    name: "Admin_slice",
    initialState: {
        placeholderGlow: false,
        spinnerGlow: false
    },
    reducers: {
        //                                create campaign onChange                                  //
        update_create_campaign_data(state, action) {
            return {
                ...state,
                create_campaign: {
                    ...state.create_campaign,
                    ...action.payload
                }
            }
        },

        //                                Get all campaign data                                  //
        getCampaign(state, action) {
            const { type, data } = action.payload
            let obj = { ...state };

            switch (type) {
                case "request":
                    obj.campaigns_data = {}
                    obj.campaign_placeholder = true
                    break;

                case "response":
                    obj.campaigns_data = data || {}
                    obj.campaign_placeholder = false
                    break;

                case "failure":
                    obj.campaigns_data = {}
                    obj.campaign_placeholder = false
                    break;

                default:
                    break;
            }

            return obj
        },

        // handle open create campaign modal
        updateCreateCampaign(state, action) {
            return {
                ...state,
                spinnerGlow: false
            }
        }
    }
})

const { actions, reducer } = AdminSlice;

export const {
    update_create_campaign_data, getCampaign, updateCreateCampaign,

} = actions;

export default reducer;