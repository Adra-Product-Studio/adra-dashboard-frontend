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
        <Card className={`bg-transparent rounded-4 ${card_className || ''}`} onClick={clickFunction}>
            <Card.Body>
                <div className={`row align-items-center border-bottom pb-3`}>
                    <div className="col-3">
                        <Img src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" alt="candidate image" width="80rem" height="80rem" className="rounded-circle" />
                    </div>
                    <div className="col-9">
                        <h6>Name: <span className='ps-2'>{data?.name || ''}</span></h6>
                        <p className='mb-1'>Age: <span className='ps-2'>{data?.age || ''}</span></p>
                        <p className='mb-1'>Gender:<span className='ps-2'>{data?.gender || ''}</span></p>
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

                            <p className='mb-1'>Aptitude status:{apti_status(data?.status || '')}</p>
                            {data?.test_EndedOn && data?.status !== "Test Completed" ?
                                <p className='mb-1'>Time remaining: <span className='ps-2'>{timeLeft}</span></p>
                                :
                                null
                            }
                        </div>
                        :
                        null
                }
                <div className="pt-3">
                    <p className='mb-1'>Email:<span className='ps-2'>{data?.email || ''}</span></p>
                    <p className='mb-1'>phone number:<span className='ps-2'>{data?.phoneNumber || ''}</span></p>
                    <p className='mb-1'>Qualification:<span className='ps-2'>{data?.candidateQualification || ''}</span></p>
                    <p className='mb-1'>Experience:<span className='ps-2'>{data?.experience || ''}</span></p>
                    <p className='mb-1'>Address:<span className='ps-2'>{data?.address || ''}</span></p>
                    <p className='mb-1'>Current salary:<span className='ps-2'>{data?.currentSalary || ''}</span></p>
                    <p className='mb-1'>Expected salary:<span className='ps-2'>{data?.expectedSalary || ''}</span></p>
                    {
                        !detail_view ?
                            <Fragment>
                                <p className='mb-1'>Aptitude status:{apti_status(data?.status || '')}</p>
                                {data?.test_EndedOn && data?.status !== "Test Completed" ?
                                    <p className='mb-1'>Time remaining: <span className='ps-2'>{timeLeft}</span></p>
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
                            <p className='mb-1'>parent occupation:<span className='ps-2'>{data?.parentOccupation || ''}</span></p>

                            <p className='mb-1'>School name (SSLC):<span className='ps-2'>{data?.sslcSchoolName || ''}</span></p>
                            <p className='mb-1'>Sslc Marks:<span className='ps-2'>{data?.sslcMarks || ''}</span></p>

                            <p className='mb-1'>School name (HSC):<span className='ps-2'>{data?.hscSchoolName || ''}</span></p>
                            <p className='mb-1'>Hsc Marks:<span className='ps-2'>{data?.hscMarks || ''}</span></p>

                            <p className='mb-1'>college name:<span className='ps-2'>{data?.collegeName || ''}</span></p>
                            <p className='mb-1'>college Marks:<span className='ps-2'>{data?.collegeMarks || ''}</span></p>

                            <p className='mb-1'>Experience:<span className='ps-2'>{data?.experience || ''}</span></p>
                            <p className='mb-1'>Address:<span className='ps-2'>{data?.address || ''}</span></p>
                            <p className='mb-1'>Current salary:<span className='ps-2'>{data?.currentSalary || ''}</span></p>
                            <p className='mb-1'>Expected salary:<span className='ps-2'>{data?.expectedSalary || ''}</span></p>
                        </div>
                        :
                        null
                }

            </Card.Body>
        </Card >
    )
}

export default CampaignCandidatesCard