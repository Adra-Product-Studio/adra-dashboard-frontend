import axiosInstance from 'Services/axiosInstance';
import {
    update_create_campaign_data, getCampaign, postOrEditCampign, getCampaignAssignedQuestions,
    create_individual_campaign_ques_pattern, edit_individual_campaign_ques_pattern,
    delete_individual_campaign_ques_pattern, getCampaignCandidateDetails


} from 'Views/Admin/Slice/AdminSlice';
import { handleValidation } from 'Views/Common/Action/Common_action';

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

// Get question types
export const handleGetQuestionTypes = () => async (dispatch) => {
    try {
        dispatch(getCampaignAssignedQuestions({ type: "request" }))

        const { data } = await axiosInstance.get('/get_question_types')
        if (data?.error_code === 0) {
            dispatch(getCampaignAssignedQuestions({ type: "response", data: data?.data }))
        } else {
            dispatch(getCampaignAssignedQuestions({ type: "failure", message: data?.message }))
        }
    }
    catch (Err) {
        dispatch(getCampaignAssignedQuestions({ type: "failure", message: Err?.message }))
    }
}

export const handleAddOrUpdateQuestionPattern = (params) => async (dispatch) => {
    if (!params?.difficulty_level || !params?.question_type || !params?.questions_count) return dispatch(handleValidation)

    try {
        dispatch(create_individual_campaign_ques_pattern({ type: "request" }))

        const { data } = await axiosInstance.post('/campaign_question_pattern', params)
        if (data?.error_code === 0) {
            dispatch(create_individual_campaign_ques_pattern({ type: "response", data: data?.data?.question_pattern }))
        } else {
            dispatch(create_individual_campaign_ques_pattern({ type: "failure", message: data?.message }))
        }
    }
    catch (Err) {
        dispatch(create_individual_campaign_ques_pattern({ type: "failure", message: Err?.message }))
    }
}

export const handleEditQuestionPattern = (params) => async (dispatch) => {
    if (!params?.difficulty_level || !params?.question_type || !params?.questions_count) return dispatch(handleValidation)
    params.question_id = params?._id
    delete params?._id

    try {
        dispatch(edit_individual_campaign_ques_pattern({ type: "request" }))

        const { data } = await axiosInstance.put('/campaign_question_pattern', params)
        if (data?.error_code === 0) {
            dispatch(edit_individual_campaign_ques_pattern({ type: "response", data: data?.data?.question_pattern }))
        } else {
            dispatch(edit_individual_campaign_ques_pattern({ type: "failure", message: data?.message }))
        }
    }
    catch (Err) {
        dispatch(edit_individual_campaign_ques_pattern({ type: "failure", message: Err?.message }))
    }
}

export const handleDeleteQuestionPattern = (params) => async (dispatch) => {
    if (!params?.question_id || !params?.campaign_id) return

    try {
        dispatch(delete_individual_campaign_ques_pattern({ type: "request" }))

        const { data } = await axiosInstance.delete(`/campaign_question_pattern?question_id=${params?.question_id}&campaign_id=${params?.campaign_id}`)
        if (data?.error_code === 0) {
            dispatch(delete_individual_campaign_ques_pattern({ type: "response", data: data?.data?.question_pattern }))
        } else {
            dispatch(delete_individual_campaign_ques_pattern({ type: "failure", message: data?.message }))
        }
    }
    catch (Err) {
        dispatch(delete_individual_campaign_ques_pattern({ type: "failure", message: Err?.message }))
    }
}

export const handleGetIndividualCampaignCandidate = (params) => async (dispatch) => {
    try {
        dispatch(getCampaignCandidateDetails({ type: "request" }))
        const { data } = await axiosInstance.get(`/display_campaign_candidate_details/${params?.candidate_id}`)

        if (data?.error_code === 0) {
            dispatch(getCampaignCandidateDetails({ type: "response", data: data?.data }))
        } else {
            dispatch(getCampaignCandidateDetails({ type: "failure", message: data?.message }))
        }
    } catch (Err) {
        dispatch(getCampaignCandidateDetails({ type: "failure", message: Err?.message }))
    }
}