import InterviewCandidatesHeader from 'Components/Panel_compnent/InterviewCandidatesHeader'
import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import ButtonComponent from "Components/Button/Button";
import useCommonState, { useCustomNavigate, useDispatch } from 'ResuableFunctions/CustomHooks';
import JsonData from 'Utils/JsonData';
import { Inputfunctions } from 'ResuableFunctions/Inputfunctions';
import { handleGetRegistrationRoles, handleRegisterCandidate } from '../Action/interviewAction';
import SpinnerComponent from 'Components/Spinner/Spinner';
import Img from 'Components/Img/Img';
import Image from 'Utils/Image';
import { generateDeviceIdentifier } from 'ResuableFunctions/Device_details';

const InterviewCandidatesRegistration = () => {
    const { interviewState } = useCommonState();
    const { candidateRegistration } = JsonData()?.jsxJson;
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();

    useEffect(() => {
        const deviceId = generateDeviceIdentifier();
        console.log(deviceId)
        dispatch(handleGetRegistrationRoles())
    }, [])

    return (
        <div className='overflow-hidden'>
            <InterviewCandidatesHeader />

            <section className='main'>
                <div className="h-100 d-flex flex-wrap align-items-center justify-content-center">
                    {
                        interviewState?.registration_placeholder ?
                            <div className="campaign_detail_body d-flex flex-column justify-content-center align-items-center">
                                <div className="col-5 text-center">
                                    <SpinnerComponent />
                                    <p className='mt-2'>Checking for interview process</p>
                                </div>
                            </div>
                            :
                            interviewState?.registration_roles?.length ?
                                <div className="col-12 col-md-10 col-lg-8">
                                    <Card className='w-100'>
                                        <Card.Header className='py-3'>
                                            <h5 className='mb-0'>Candidate Registration</h5>
                                        </Card.Header>
                                        <Card.Body className='py-3 registration-form-height d-flex flex-wrap'>
                                            {Inputfunctions(candidateRegistration)}
                                        </Card.Body>
                                    </Card>

                                    <div className='d-flex justify-content-end bg-transparent border-0 mt-3'>
                                        <ButtonComponent
                                            type="button"
                                            className="btn btn-dark w-25"
                                            buttonName={interviewState?.buttonSpinner ?
                                                <SpinnerComponent />
                                                :
                                                "Continue"
                                            }
                                            clickFunction={() => dispatch(handleRegisterCandidate(interviewState))}
                                            btnDisable={interviewState?.buttonSpinner}
                                        />
                                    </div>
                                </div>
                                :
                                <div className="col-12 col-md-10 col-lg-8 text-center">
                                    <Img src={Image?.Task_empty} alt="no_campaigns" width="170em" />
                                    <p>Sorry, No openings are available for registration</p>
                                    <ButtonComponent type="button" buttonName="Back to home" className="btn btn-dark" clickFunction={() => navigate("/")} />
                                </div>
                    }
                </div>
            </section>
        </div >
    )
}

export default InterviewCandidatesRegistration