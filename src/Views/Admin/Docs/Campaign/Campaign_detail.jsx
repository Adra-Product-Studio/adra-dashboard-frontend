import ButtonComponent from 'Components/Button/Button'
import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useCustomNavigate, useDispatch } from 'ResuableFunctions/CustomHooks'
import { handleGetIndividualCampaign, handleGetQuestionTypes } from 'Views/Admin/Action/AdminAction';

const Campaign_detail = () => {
    const { campaign_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();

    useEffect(() => {
        dispatch(handleGetIndividualCampaign({ campaign_id }))
    }, [])

    return (
        <Fragment>
            <div className="campaign_header border-bottom">
                <div className="w-50">
                    <ButtonComponent type="button" buttonName="Back" className="btn btn-outline-dark mb-2" clickFunction={() => navigate("/dashboard/interview")} />
                    <h5 className='mb-0'>Interview</h5>
                </div>

                <div className="flex-grow-1 text-end">
                    <div className="w-100 h-100 d-flex justify-content-end align-items-center">
                        <div className="px-2">
                            <ButtonComponent type="button" buttonName="Generate Questions" className="btn btn-outline-dark" clickFunction={() => dispatch(handleGetQuestionTypes())} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="campaign_detail_body">

            </div>
        </Fragment>
    )
}

export default Campaign_detail