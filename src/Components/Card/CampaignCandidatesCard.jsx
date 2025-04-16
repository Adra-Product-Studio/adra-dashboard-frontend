import ButtonComponent from 'Components/Button/Button';
import Img from 'Components/Img/Img'
import React, { Fragment, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'

const CampaignCandidatesCard = ({
    data, clickFunction,
    detail_view, card_className

}) => {
    const [timeLeft, setTimeLeft] = useState("");

    function apti_status(status) {
        if (status === "Test Completed") {
            return <span className='text-success ps-2'>Test Completed</span>
        } else if (status === "Not Started") {
            return <span className='text-danger ps-2'>Not Started</span>
        } else if (status === "Test Started") {
            return <span className='text-warning ps-2'>Test Started</span>
        }
    }

    useEffect(() => {
        const calculateTimeLeft = () => {
            const testStartedOn = new Date(data?.test_EndedOn);
            const testEndsOn = new Date(testStartedOn.getTime()); // 1 hour later
            const now = new Date();
            const timeLeftMs = testEndsOn - now;

            if (timeLeftMs <= 0) {
                setTimeLeft("Test time is over");
            } else {
                const minutes = Math.floor(timeLeftMs / 60000);
                const seconds = ((timeLeftMs % 60000) / 1000).toFixed(0);
                setTimeLeft(`${minutes}m ${seconds}s left`);
            }
        };

        // Initial calculation
        calculateTimeLeft();

        // Update every second
        const timer = setInterval(calculateTimeLeft, 1000);

        // Cleanup timer on unmount
        return () => clearInterval(timer);
    }, [data?.test_EndedOn]);

    return (
        <Card className={`bg-transparent rounded-4 ${card_className || ''}`}>
            <Card.Body className='pb-0'>
                <div className={`row align-items-center border-bottom pb-3`}>
                    <div className="col-3">
                        <Img src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" alt="candidate image" width="80rem" height="80rem" className="rounded-circle" />
                    </div>
                    <div className="col-9">
                        <h6><b>Name:</b> <span className='ps-2'>{data?.name || ''}</span></h6>
                        {
                            detail_view ?
                                <p className='mb-1'><b>Age:</b> <span className='ps-2'>{data?.age || ''}</span></p>
                                :
                                null
                        }
                        <p className='mb-1'><b>Gender:</b> <span className='ps-2'>{data?.gender || ''}</span></p>
                    </div>
                </div>
                {
                    detail_view ?
                        <div className="py-3 border-bottom">
                            <h6>Test Score</h6>
                            {
                                Object.entries(data?.test_score || {}).map(([key, value]) => (
                                    <p key={key}>{key}: {value}</p>
                                ))
                            }

                            <p className='mb-1'><b>Aptitude status:</b>{apti_status(data?.status || '')}</p>
                            {data?.test_EndedOn && data?.status !== "Test Completed" ?
                                <p className='mb-1'><b>Time remaining:</b> <span className='ps-2'>{timeLeft}</span></p>
                                :
                                null
                            }
                        </div>
                        :
                        null
                }
                <div className="pt-3">
                    <p className='mb-1'><b>Email:</b><span className='ps-2'>{data?.email || ''}</span></p>
                    <p className='mb-1'><b>phone number:</b><span className='ps-2'>{data?.phoneNumber || ''}</span></p>
                    <p className='mb-1'><b>Qualification:</b><span className='ps-2'>{data?.candidateQualification || ''}</span></p>
                    <p className='mb-1'><b>Experience:</b><span className='ps-2'>{data?.experience || ''}</span></p>
                    <p className='mb-1'><b>Address:</b><span className='ps-2'>{data?.address || ''}</span></p>
                    <p className='mb-1'><b>Current salary:</b><span className='ps-2'>{data?.currentSalary || ''}</span></p>
                    <p className='mb-1'><b>Expected salary:</b><span className='ps-2'>{data?.expectedSalary || ''}</span></p>
                    {
                        !detail_view ?
                            <Fragment>
                                <p className='mb-1'><b>Aptitude status:</b>{apti_status(data?.status || '')}</p>
                                {data?.test_EndedOn && data?.status !== "Test Completed" ?
                                    <p className='mb-1'><b>Time remaining:</b> <span className='ps-2'>{timeLeft}</span></p>
                                    :
                                    null
                                }
                            </Fragment>
                            :
                            null
                    }
                </div>
                {
                    detail_view ?
                        <div className="border-bottom">
                            <p className='mb-1'><b>parent occupation:</b><span className='ps-2'>{data?.parentOccupation || ''}</span></p>

                            <p className='mb-1'><b>School name (SSLC):</b><span className='ps-2'>{data?.sslcSchoolName || ''}</span></p>
                            <p className='mb-1'><b>Sslc Marks:</b><span className='ps-2'>{data?.sslcMarks || ''}</span></p>

                            <p className='mb-1'><b>School name (HSC):</b><span className='ps-2'>{data?.hscSchoolName || ''}</span></p>
                            <p className='mb-1'><b>Hsc Marks:</b><span className='ps-2'>{data?.hscMarks || ''}</span></p>

                            <p className='mb-1'><b>college name:</b><span className='ps-2'>{data?.collegeName || ''}</span></p>
                            <p className='mb-1'><b>college Marks:</b><span className='ps-2'>{data?.collegeMarks || ''}</span></p>

                            <p className='mb-1'><b>Experience:</b><span className='ps-2'>{data?.experience || ''}</span></p>
                            <p className='mb-1'><b>Address:</b><span className='ps-2'>{data?.address || ''}</span></p>
                            <p className='mb-1'><b>Current salary:</b><span className='ps-2'>{data?.currentSalary || ''}</span></p>
                            <p className='mb-1'><b>Expected salary:</b><span className='ps-2'>{data?.expectedSalary || ''}</span></p>
                        </div>
                        :
                        null
                }
            </Card.Body>
            <Card.Footer className='border-0 bg-transparent pt-0 text-end'>
                <ButtonComponent
                    type="button"
                    className="text-secondary"
                    buttonName="View details..."
                    clickFunction={clickFunction}
                />
            </Card.Footer>
        </Card >
    )
}

export default CampaignCandidatesCard