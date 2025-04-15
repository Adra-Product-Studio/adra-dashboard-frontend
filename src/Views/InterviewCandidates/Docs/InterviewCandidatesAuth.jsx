import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useCommonState, { useDispatch } from 'ResuableFunctions/CustomHooks';
import { updateToast } from 'Views/Common/Slice/Common_slice';

const InterviewCandidatesAuth = () => {
    const { commonState } = useCommonState();
    const dispatch = useDispatch();

    useEffect(() => {
        if (commonState?.user_role !== "interview_candidate" || !commonState?.token) {
            dispatch(updateToast({ message: "Access Denied", type: "error" }))
        }
    }, [])

    return commonState?.user_role === "interview_candidate" && commonState?.token ? <Outlet /> : <Navigate to="/" />
}

export default InterviewCandidatesAuth