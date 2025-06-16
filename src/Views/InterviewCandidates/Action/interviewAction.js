import axiosInstance from "Services/axiosInstance";
import { handleValidation } from "Views/Common/Action/Common_action";
import { closeTestMode } from "Views/Common/Slice/Common_slice";
import {
    updateCandidateData,
    registerCandidateRequest,
    registerCandidateResponse,
    registerCandidateFailure,
    getQuestionsRequest,
    getQuestionsResponse,
    getQuestionsFailure,
    updateAnswers,
    submitTestByManual,
    submitTestRequest,
    submitTestResponse,
    submitTestFailure,
    submitTestRequestSpinner,
    updateTimeOverCloseTest,
    getRegistrationRoles

} from "Views/InterviewCandidates/Slice/interviewSlice";
import { IndexedDbDeleteFun } from "Views/InterviewCandidates/IndexedDbDeleteFun";
import { initializeDB } from "ResuableFunctions/CustomHooks";
import axios from "axios";

//                                                                 candidate registration on change 
export const handleInterviewRegistrationOnChange = ipVal => dispatch => {
    dispatch(updateCandidateData(ipVal))
}

//                                                                  candidate registration endpoint
export const handleGetRegistrationRoles = () => async (dispatch) => {
    try {
        dispatch(getRegistrationRoles({ type: 'request' }))
        const { data } = await axios.post("/get_registration_roles", { check_campaign: new Date() })

        if (data?.error_code === 0) dispatch(getRegistrationRoles({ type: 'response', data: data?.data }))
        else dispatch(getRegistrationRoles({ type: 'failure', message: data?.message }))
    } catch (Err) {
        dispatch(getRegistrationRoles({ type: 'failure', message: Err?.message }))
    }
}

export const handleRegisterCandidate = params => async (dispatch) => {
    if (params?.candidateData?.name && params?.candidateData?.age && params?.candidateData?.phoneNumber && params?.candidateData?.email &&
        params?.candidateData?.gender && params?.candidateData?.address && params?.candidateData?.parentName && params?.candidateData?.parentOccupation &&
        params?.candidateData?.maritalStatus && params?.candidateData?.siblings && params?.candidateData?.addressIfAnyCbe && params?.candidateData?.sslcSchoolName &&
        params?.candidateData?.sslcMarks && params?.candidateData?.hscSchoolName && params?.candidateData?.hscMarks && params?.candidateData?.collegeName &&
        params?.candidateData?.collegeMarks && params?.candidateData?.experience && params?.candidateData?.canditateRole && params?.candidateData?.expectedSalary &&
        params?.candidateData?.currentSalary) {

        if (params?.candidateData?.maritalStatus === "Married" || params?.candidateData?.experience === "experienced") {
            if (params?.candidateData?.maritalStatus === "Married" && !params?.candidateData?.childrens) return dispatch(handleValidation)
            if (params?.candidateData?.experience === "experienced" && !params?.candidateData?.previousCompanyName && !params?.candidateData?.designation && !params?.candidateData?.canditateExpType) return dispatch(handleValidation)
            dispatch(registerCandidateCall(params?.candidateData))
        }
        else dispatch(registerCandidateCall(params?.candidateData))
    } else {
        dispatch(handleValidation)
    }
}

const registerCandidateCall = params => async (dispatch) => {

    try {
        dispatch(registerCandidateRequest())
        const { data } = await axios.post("/register_candidate", params)

        if (data?.error_code === 0) {
            dispatch(registerCandidateResponse(data?.data))
            IndexedDbDeleteFun();
        }
        else dispatch(registerCandidateFailure(data?.message))

    } catch (Err) {
        dispatch(registerCandidateFailure(Err?.message))
    }
}

//                                                                   get generated questions                                                                       
export const handleGetQuestions = async (dispatch) => {
    try {
        dispatch(getQuestionsRequest())
        const { data } = await axiosInstance.get("/generate_random_question")

        if (data?.error_code === 0) dispatch(getQuestionsResponse(data?.data))
        else dispatch(getQuestionsFailure(data?.message))
    } catch (Err) {
        dispatch(getQuestionsFailure(Err?.message))
    }
}

//                                                                   update answers in index db                                                                     
export const handleUpdateAnswer = (data) => (dispatch) => {
    initializeDB(process.env.REACT_APP_INDEXEDDB_DATABASE_NAME, process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION, process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME)
        .then((db) => {
            const transaction = db.transaction(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME, "readwrite");
            const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME);

            const targetIndex = data?.updationInd;
            const updatedAnswer = data?.ans;

            const getRequest = store.get(targetIndex);

            getRequest.onsuccess = function () {
                const targetObject = getRequest.result;
                if (targetObject) {
                    targetObject.candidate_answer = updatedAnswer;

                    const putRequest = store.put(targetObject);

                    putRequest.onsuccess = function () {
                        const getAllRequest = store.getAll();
                        getAllRequest.onsuccess = function () {
                            dispatch(updateAnswers(getAllRequest.result));
                        };
                    };

                    putRequest.onerror = function (event) {
                        console.error("Failed to update object:", event.target.error);
                    };
                } else {
                    console.error(`No object found with id: ${targetIndex}`);
                }
            };

            getRequest.onerror = function (event) {
                console.error("Failed to fetch object:", event.target.error);
            };

            transaction.oncomplete = function () {
                console.log("Transaction completed successfully.");
            };

            transaction.onerror = function (event) {
                console.error("Transaction failed:", event.target.error);
            };
        })
        .catch((error) => {
            console.error("Failed to open database:", error);
        })
};

export const handleCloseTestAndNavigate = dispatch => {
    dispatch(closeTestMode());
}

export const handleCloseTestAutomatic = candidate_answers => async dispatch => {
    dispatch(updateTimeOverCloseTest())
    try {
        let sendCandidateAnswers = []
        for (let i = 0; i < candidate_answers?.length; i++) {
            sendCandidateAnswers[sendCandidateAnswers?.length] = { _id: candidate_answers[i]?._id, candidate_answer: candidate_answers[i]?.candidate_answer }
        }

        dispatch(submitTestRequest())
        const { data } = await axiosInstance.post("/validate_answers", sendCandidateAnswers)
        if (data?.error_code === 0) {
            dispatch(submitTestResponse())
            IndexedDbDeleteFun();
        } else dispatch(submitTestFailure(data?.message))
    }
    catch (Err) {
        dispatch(submitTestFailure(Err?.message))
    }
}

export const handleCloseTestManual = dispatch => {
    dispatch(submitTestByManual())
}

export const handleCloseTestEndpoint = candidate_answers => async dispatch => {
    try {
        let sendCandidateAnswers = []
        for (let i = 0; i < candidate_answers?.length; i++) {
            sendCandidateAnswers[sendCandidateAnswers?.length] = { _id: candidate_answers[i]?._id, candidate_answer: candidate_answers[i]?.candidate_answer }
        }

        dispatch(submitTestRequestSpinner())
        const { data } = await axiosInstance.post("/validate_answers", sendCandidateAnswers)
        if (data?.error_code === 0) {
            dispatch(submitTestResponse())
            IndexedDbDeleteFun();
        }
        else dispatch(submitTestFailure(data?.message))
    }
    catch (Err) {
        dispatch(submitTestFailure(Err?.message))
    }
}