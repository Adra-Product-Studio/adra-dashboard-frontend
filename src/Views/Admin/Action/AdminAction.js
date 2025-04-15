import axiosInstance from 'Services/axiosInstance';
import {
    update_create_campaign_data, getCampaign,


} from 'Views/Admin/Slice/AdminSlice';


export const handleCreateCampaignOnChnage = (ipData) => dispatch => {
    dispatch(update_create_campaign_data(ipData))
}

export const handleGetCampaign = () => async (dispatch) => {
    try {
        dispatch(getCampaign({ type: "request" }))
        const { data } = await axiosInstance.get("/display_campaign")

        if (data?.error_code === 0) {
            dispatch(getCampaign({ type: "response", data: data?.data }))
        } else {
            dispatch(getCampaign({ type: "failure", Err: data?.message }))
        }
    } catch (Err) {
        dispatch(getCampaign({ type: "failure", Err: Err?.message }))
    }
}

export const handleCreateCampaign = (params) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.post("/create_campaign", params)
        if (data?.error_code === 0) {

        } else {

        }
    } catch (Err) {

    }
}