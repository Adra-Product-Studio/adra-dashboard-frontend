import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    placeholderGlow: false,
    spinnerGlow: false,
    create_campaign: {},
    campaigns_data: {},
    create_assigning_questions: {},
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

        create_individual_campaign_ques_pattern(state, action) {
            const { type, data } = action.payload;

            switch (type) {
                case "request":
                    state.add_pattern_spinner = true;
                    break;

                case "response":
                    state.campaigns_data.question_pattern = data || state.campaigns_data.question_pattern;
                    state.create_assigning_questions = {};
                    state.add_pattern_spinner = false;
                    state.available_questions_data.total_count = null
                    state.available_questions_data.difficulty_level = null
                    break;

                case "failure":
                    state.add_pattern_spinner = false;
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

        // Get individual campaign assigned questions
        getCampaignAssignedQuestions(state, action) {
            const { type, data } = action.payload;

            switch (type) {
                case "request":
                    state.available_questions_data = {};
                    state.create_assigning_questions = {};
                    state.get_question_types_placeholder = true;
                    break;

                case "response":
                    state.available_questions_data = data || {};
                    state.get_question_types_placeholder = false;
                    break;

                case "failure":
                    state.available_questions_data = {};
                    state.get_question_types_placeholder = false;
                    break;

                default:
                    break;
            }
        },

        //Assign or update question types and levels for campaign test
        assignQuestionTypes(state, action) {
            const [key, value] = Object.entries(action.payload)[0];
            state.create_assigning_questions[key] = value;

            if (key === "question_type") {
                let get_levels = state?.available_questions_data?.data
                    ?.filter(item => item.question_types === value) // filter by question_types
                    ?.map(item => item.difficulty_levels) // extract the difficulty_levels
                    .flat()

                state.available_questions_data.difficulty_level = get_levels || [];
                state.available_questions_data.total_count = 0;

                state.create_assigning_questions['difficulty_level'] = '';
                state.create_assigning_questions['questions_count'] = '';
            }


            if (key === "difficulty_level") {
                let get_count = state?.available_questions_data?.difficulty_level
                    ?.find(item => item.level === value)

                state.available_questions_data.total_count = get_count?.total_questions || 0;
                state.create_assigning_questions['questions_count'] = '';
            }
        },
    }
});

export const {
    update_create_campaign_data, getCampaign, postOrEditCampign,
    getCampaignAssignedQuestions, assignQuestionTypes, create_individual_campaign_ques_pattern


} = AdminSlice.actions;

export default AdminSlice.reducer;
