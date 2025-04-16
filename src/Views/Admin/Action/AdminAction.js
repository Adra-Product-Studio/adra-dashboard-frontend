import axiosInstance from 'Services/axiosInstance';
import {
    update_create_campaign_data, getCampaign, postOrEditCampign


} from 'Views/Admin/Slice/AdminSlice';

export const handleCreateCampaignOnChnage = (ipData) => dispatch => {
    dispatch(update_create_campaign_data(ipData))
}

// Get Campaign
export const handleGetCampaign = () => async (dispatch) => {
    try {
        dispatch(getCampaign({ type: "request" }))
        const { data } = await axiosInstance.get("/campaign")

        if (data?.error_code === 0) {
            dispatch(getCampaign({ type: "response", data: data?.data }))
        } else {
            dispatch(getCampaign({ type: "failure", message: data?.message }))
        }
    } catch (Err) {
        dispatch(getCampaign({ type: "failure", message: Err?.message }))
    }
}


// Create Campaign
export const handleCreateCampaign = (params) => async (dispatch) => {
    try {
        dispatch(postOrEditCampign({ type: "request" }))
        const { data } = await axiosInstance.post("/campaign", params)

        if (data?.error_code === 0) {
            dispatch(postOrEditCampign({ type: "response", data: data?.data }))
        } else {
            dispatch(postOrEditCampign({ type: "failure", message: data?.message }))
        }
    } catch (Err) {
        dispatch(postOrEditCampign({ type: "failure", message: Err?.message }))
    }
}


// Get individual Campaign
export const handleGetIndividualCampaign = (params) => async (dispatch) => {
    try {
        dispatch(getCampaign({ type: "request" }))
        const { data } = await axiosInstance.get(`/campaign/${params?.campaign_id}`)

        if (data?.error_code === 0) {
            dispatch(getCampaign({ type: "response", data: data?.data }))
        } else {
            dispatch(getCampaign({ type: "failure", message: data?.message }))
        }
    } catch (Err) {
        dispatch(getCampaign({ type: "failure", message: Err?.message }))
    }
}