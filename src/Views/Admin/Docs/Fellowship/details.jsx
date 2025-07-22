import ButtonComponent from 'Components/Button/Button';
import Img from 'Components/Img/Img';
import SpinnerComponent from 'Components/Spinner/Spinner';
import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useCommonState, { useCustomNavigate, useDispatch } from 'ResuableFunctions/CustomHooks';
import { handleGetFellowshipCandidatesDetails } from 'Views/Admin/Action/AdminAction';
import { dateConvertor } from 'Views/Admin/Utils/JsonData';

export default function FellowshipDetails() {
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();
    const params = useParams();
    const { adminState } = useCommonState();

    useEffect(() => {
        dispatch(handleGetFellowshipCandidatesDetails({ candidate_id: params?.fellowship_candidate_id || '' }));
    }, [])

    return (
        <div className="card_content_height">
            <Card className="rounded-4 pt-2 border-0 shadow overflowY" style={{ height: "100%" }}>
                <Card.Header className="bg-transparent border-0 border-bottom d-flex align-items-center">
                    <ButtonComponent
                        type="button"
                        buttonName="Back"
                        className="btn btn-outline-dark mb-2 px-3"
                        clickFunction={() => navigate('/dashboard/fellowship_candidates')}
                    />

                    <h5 className='ps-3'>Fellowship Candidate Details</h5>
                </Card.Header>
                <Card.Body>
                    {adminState?.placeholderGlow ?
                        <div className="h-100 row align-items-center justify-content-center">
                            <SpinnerComponent />
                        </div>
                        :
                        adminState?.fellowship_candidates ?
                            <div className='row py-2'>
                                <div className="col-12 col-md-5 col-lg-4 p-1">
                                    <div className="w-100 text-center">
                                        <Img src={`${process.env.REACT_APP_CDN_URL}${adminState?.fellowship_candidates?.profile_photo_path || ''}`} alt="Fellowship Candidate" className="fellowship_candidate_image" />
                                        <h6 className='pt-4'>{adminState?.fellowship_candidates?.fullname || ''}</h6>
                                    </div>
                                    <div className="border-0 pt-3">
                                        <p className="text-dark">Age: <span className="text-muted">{adminState?.fellowship_candidates?.age || ''}</span></p>
                                        <p className="text-dark">Gender: <span className="text-muted">{adminState?.fellowship_candidates?.gender || ''}</span></p>
                                        <p className="text-dark">Email: <span className="text-muted">{adminState?.fellowship_candidates?.email_id || ''}</span></p>
                                        <p className="text-dark">Phone: <span className="text-muted">{adminState?.fellowship_candidates?.phone_no || ''}</span></p>
                                        <p className="text-dark">Work experience: <span className="text-muted">{adminState?.fellowship_candidates?.work_experience || ''}</span></p>
                                        <p className="text-dark">Have laptop: <span className="text-muted">{adminState?.fellowship_candidates?.have_laptop || ''}</span></p>
                                        <p className="text-dark">Address: <span className="text-muted">{adminState?.fellowship_candidates?.address || ''}</span></p>
                                        <p className="text-dark">Parent Name: <span className="text-muted">{adminState?.fellowship_candidates?.parent_name || ''}</span></p>
                                        <p className="text-dark">Parent Occupation: <span className="text-muted">{adminState?.fellowship_candidates?.parent_occupation || ''}</span></p>
                                        <p className="text-dark">Applied on: <span className="text-muted">{adminState?.fellowship_candidates?.date ? dateConvertor(adminState?.fellowship_candidates?.date) : ''}</span></p>
                                    </div>
                                </div>
                                <div className="col">
                                    <Card className="rounded-4 shadow-sm overflow-hidden border-1">
                                        <Card.Header className="bg-transparent border-0 border-bottom">
                                            <h6 className='mb-0 py-2'>Academic and Family Details</h6>
                                        </Card.Header>
                                        <Card.Body className='row'>
                                            <div className="col-md-6">
                                                <h5 className='py-2 mb-3 text-primary'>Education Details</h5>
                                                {Object.entries(adminState?.fellowship_candidates?.academics_education || {})?.map(([level, details]) => (
                                                    <div key={level} style={{ marginBottom: "1rem" }}>
                                                        <h6>{level.replace(/_/g, " ").toUpperCase()}</h6>
                                                        <ul>
                                                            {Object.entries(details).map(([key, value]) => (
                                                                <li key={key}>
                                                                    <strong>{key.replace(/_/g, " ")}:</strong> {value}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="col-md-6">
                                                <h5 className='py-2 mb-3 text-primary'>Family Details</h5>
                                                <ul>
                                                    {Object.entries(adminState?.fellowship_candidates?.family_profile || {}).map(([key, value]) => {
                                                        if (key === '_id') return null;

                                                        return (
                                                            <li key={key}>
                                                                <strong>{key.replace(/_/g, " ")}:</strong>{" "}
                                                                {typeof value === "object" && value !== null
                                                                    ? JSON.stringify(value)
                                                                    : String(value)}
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        </Card.Body>
                                    </Card>

                                    <Card className="rounded-4 shadow-sm overflow-hidden border-1 mt-3">
                                        <Card.Header className="bg-transparent border-0 border-bottom">
                                            <h6 className='mb-0 py-2'>Additional Information</h6>
                                        </Card.Header>
                                        <Card.Body>
                                            <div className="mb-3">
                                                <label htmlFor="software_interest_reason">Why are you interested in software development?</label>
                                                <textarea
                                                    id="software_interest_reason"
                                                    className="form-control pe-none"
                                                    rows="7"
                                                    value={adminState?.fellowship_candidates?.software_interest_reason || ''}
                                                    readOnly
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="reason_for_joining">Why do you want to join this fellowship?*</label>
                                                <textarea
                                                    id="reason_for_joining"
                                                    className="form-control pe-none"
                                                    rows="7"
                                                    value={adminState?.fellowship_candidates?.reason_for_joining || ''}
                                                    readOnly
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="commitment_balance_plan">If you are a college student (or) Currently working, how do you plan to balance your existing commitments with the fellowship?</label>
                                                <textarea
                                                    id="commitment_balance_plan"
                                                    className="form-control pe-none"
                                                    rows="7"
                                                    value={adminState?.fellowship_candidates?.commitment_balance_plan || ''}
                                                    readOnly
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="remarks">Remarks and Questions if any?</label>
                                                <textarea
                                                    id="remarks"
                                                    className="form-control pe-none"
                                                    rows="7"
                                                    value={adminState?.fellowship_candidates?.remarks || ''}
                                                    readOnly
                                                />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                            :
                            <div className="h-100 row align-items-center justify-content-center text-center">
                                <h6>No Fellowship Candidates Found</h6>
                            </div>
                    }
                </Card.Body>
            </Card>
        </div>
    );
}