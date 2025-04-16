import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { initializeDB } from "ResuableFunctions/CustomHooks";
import { loginResponse } from "Views/Common/Slice/Common_slice";

const interviewSlice = createSlice({
    name: "Interview_slice",
    initialState: {
        candidateData: {},
        buttonSpinner: false,
        initialGlow: false,
        generatedQuestions: [],
        isDataPresentInIndexedDb: true,
        selectedQuestionIndex: 0,
        answeredQuestionPercentage: 0,
        test_end_timeStamp: Cookies.get("testEndOn") || '',
        calculate_remaining_time: null,
        submit_test: false
    },
    reducers: {
        updateCandidateData(state, action) {
            const [key, value] = Object.entries(action.payload)[0];
            state.candidateData[key] = value;

            switch (key) {
                case "maritalStatus":
                    state.candidateData.childrens = "";
                    break;

                case "experience":
                    state.candidateData.previousCompanyName = "";
                    state.candidateData.designation = "";
                    state.candidateData.canditateExpType = "";
                    break;

                case "canditateRole":
                    const campaign_data = state?.registration_roles?.find(item => item?.job_title === value);
                    state.candidateData.campaign_id = campaign_data?._id || "";
                    break;
            }
        },
        getQuestionFromDb(state, action) {
            const answeredQues = action.payload?.filter((v) => v?.candidate_answer !== '')
            return {
                ...state,
                generatedQuestions: action.payload,
                isDataPresentInIndexedDb: action.payload?.length ? true : false,
                answeredQuestionPercentage: answeredQues?.length / action.payload?.length * 100
            }
        },

        //Register candidates
        registerCandidateRequest(state, action) {
            return {
                ...state,
                buttonSpinner: true
            }
        },
        registerCandidateResponse(state, action) {
            return {
                ...state,
                buttonSpinner: false,
                candidateData: {}
            }
        },
        registerCandidateFailure(state, action) {
            return {
                ...state,
                buttonSpinner: false
            }
        },


        //Get Generated Questions
        getQuestionsRequest(state, action) {
            return {
                ...state,
                initialGlow: true
            }
        },
        getQuestionsResponse(state, action) {
            initializeDB(process.env.REACT_APP_INDEXEDDB_DATABASE_NAME, process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION, process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME)
                .then((db) => {
                    const transaction = db.transaction(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME, "readwrite");
                    const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME);
                    const objects = action?.payload?.assigned_questions;

                    objects?.forEach((obj, ind) => store.put({ ...obj, id: ind })); // Add or update objects
                    transaction.oncomplete = () => console.log("Objects added successfully!");
                })
                .catch((error) => {
                    console.error("Database initialization failed:", error);
                })

            if (action?.payload?.test_EndedOn) {
                Cookies.set("testEndOn", action?.payload?.test_EndedOn)
            }

            return {
                ...state,
                generatedQuestions: action?.payload?.assigned_questions || [],
                test_end_timeStamp: action?.payload?.test_EndedOn || null,
                isDataPresentInIndexedDb: action?.payload?.assigned_questions ? true : false,
                initialGlow: false
            }
        },
        getQuestionsFailure(state, action) {
            return {
                ...state,
                initialGlow: false
            }
        },


        updateSelectedQuestionIndex(state, action) {
            return {
                ...state,
                selectedQuestionIndex: action.payload
            }
        },

        //Update answer and 
        updateAnswers(state, action) {
            const answeredQues = action.payload?.filter((v) => v?.candidate_answer !== '')

            return {
                ...state,
                generatedQuestions: action.payload,
                answeredQuestionPercentage: answeredQues?.length / action.payload?.length * 100
            }
        },


        updateRemainingTestTiming(state, action) {
            return {
                ...state,
                calculate_remaining_time: action.payload
            }
        },
        updateTimeOverCloseTest(state, action) {
            Cookies.remove("testEndOn")

            return {
                ...state,
                calculate_remaining_time: null,
                test_end_timeStamp: null,
                calculate_remaining_time: null,
                answeredQuestionPercentage: 0,
                selectedQuestionIndex: 0,
                generatedQuestions: []
            }
        },
        submitTestRequest(state, action) {
            return {
                ...state,
                buttonSpinner: true
            }
        },
        submitTestByManual(state, action) {
            return { ...state }
        },
        submitTestResponse(state, action) {
            return {
                ...state,
                buttonSpinner: false,
                submit_test: false
            }
        },
        submitTestFailure(state, action) {
            return {
                ...state,
                buttonSpinner: false
            }
        },
        submitTestRequestSpinner(state, action) {
            Cookies.remove("testEndOn")

            return {
                ...state,
                submit_test: true,
                calculate_remaining_time: null,
                test_end_timeStamp: null,
                calculate_remaining_time: null,
                answeredQuestionPercentage: 0,
                selectedQuestionIndex: 0,
                generatedQuestions: []
            }
        },
        getRegistrationRoles(state, action) {
            const { type, data } = action.payload;

            switch (type) {
                case 'request':
                    state.registration_placeholder = true;
                    state.registration_roles = [];
                    break;

                case 'response':
                    state.registration_placeholder = false;
                    state.registration_roles = data || [];
                    break;

                case 'failure':
                    state.registration_placeholder = false;
                    state.registration_roles = [];
                    break;
            }
        }

    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loginResponse, (state, action) => {
    //             state.isDataPresentInIndexedDb = false
    //             state.generatedQuestions = []
    //             state.test_end_timeStamp = null
    //             state.calculate_remaining_time = null
    //         })
    // }
})


export const { actions, reducer } = interviewSlice;

export const {
    updateCandidateData,
    getQuestionFromDb,
    registerCandidateRequest,
    registerCandidateResponse,
    registerCandidateFailure,
    getQuestionsRequest,
    getQuestionsResponse,
    getQuestionsFailure,
    updateSelectedQuestionIndex,
    updateAnswers,
    updateRemainingTestTiming,
    updateTimeOverCloseTest,
    submitTestByManual,
    submitTestRequest,
    submitTestResponse,
    submitTestFailure,
    submitTestRequestSpinner,
    getRegistrationRoles

} = actions;

export default reducer