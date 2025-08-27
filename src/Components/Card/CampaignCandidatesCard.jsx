import Img from 'Components/Img/Img'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { PiClockCountdown } from "react-icons/pi";
import Icons from 'Utils/Icons';

const CampaignCandidatesCard = ({
    data, clickFunction,
    detail_view, card_className

}) => {
    const [timeLeft, setTimeLeft] = useState("");

    function apti_status(status) {
        if (status === "Test Completed") {
            return <span className='text-success'>Test Completed</span>
        } else if (status === "Not Started") {
            return <span className='text-danger'>Not Started</span>
        } else if (status === "Test Started") {
            return <span className='text-warning'>Test Started</span>
        }
    }

    function apti_status_colors(status) {
        if (status === "Test Completed") return 'test_completed_badge';
        else if (status === "Not Started") return 'test_not_started_badge';
        else if (status === "Test Started") return 'test_progress_badge';
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

    function test_score(score) {
        if (!score) return "0 / 0";

        const { scored } = Object.values(score).reduce(
            (acc, val) => {
                if (typeof val === "string") {
                    // case: "6 out of 15"
                    const match = val.match(/(\d+)\s*out of\s*(\d+)/i);
                    if (match) {
                        const [_, s, t] = match.map(Number);
                        return {
                            scored: acc.scored + (s || 0),
                            total: acc.total + (t || 0),
                        };
                    }
                }
                else if (typeof val === "number") {
                    // case: number only (unknown total)
                    return {
                        scored: acc.scored + val,
                        total: acc.total,
                    };
                }
                return acc;
            },
            { scored: 0, total: 0 }
        );

        return scored;
    }

    return (
        <Card className={`bg-white shadow-sm border-0 rounded-4 h-100 position-relative ${card_className || ''}`} onClick={!detail_view ? clickFunction : null}>
            <div className={`interview_candidate_badge ${apti_status_colors(data?.status || '')}`}>
                {apti_status(data?.status || '')}
            </div>
            <Card.Body className='pb-0'>
                <div className='row align-items-center border-bottom'>
                    <div className="col-12 text-center mt-3">
                        <Img src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" alt="candidate image" width="80rem" height="80rem" className="rounded-3" />
                        <h6>
                            <span className='border-end pe-2'>{data?.name || ''}</span>
                            {data?.experience && <span className='ps-2'>{data?.experience || ''}</span>}
                        </h6>

                        <p>
                            {data?.gender && <span className='border-end pe-2'>{data?.gender || ''}</span>}
                            {data?.age && <span className='ps-2'>{data?.age || ''}</span>}
                        </p>

                        {data?.test_EndedOn && timeLeft !== "Test time is over" ?
                            <p>
                                <PiClockCountdown size={22} />
                                <span className='ps-2'>{timeLeft}</span>
                            </p>
                            :
                            null
                        }
                        {timeLeft === "Test time is over" ? (
                            <p>
                                Test Score:{" "}
                                {test_score(data?.test_score)}
                            </p>
                        ) : null}

                    </div>
                </div>

                {detail_view && data?.test_score &&
                    <div className='py-3 border-bottom'>
                        <h5>Marks scored</h5>
                        <ul className='m-0'>
                            {Object.entries(data?.test_score || {}).map(([key, value], index) => (
                                <li key={index}>{key}: {value}</li>
                            ))}
                        </ul>
                    </div>
                }

                <div className="pt-3">
                    <table className='table table-borderless m-0'>
                        <tbody>
                            <tr>
                                <td className='col-1'>
                                    {Icons.mailIcon}
                                </td>
                                <td className='text-break'>{data?.email || ''}</td>
                            </tr>
                            <tr>
                                <td>
                                    {Icons.locationIcon}
                                </td>
                                <td className='text-break'>{data?.address || ''}</td>
                            </tr>
                            <tr>
                                <td>
                                    {Icons.phoneIcon}
                                </td>
                                <td className='text-break'>{data?.phoneNumber || ''}</td>
                            </tr>
                            <tr>
                                <td>
                                    {Icons.qualificationIcon}
                                </td>
                                <td className='text-break'>{data?.candidateQualification || ''}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card.Body>

            <Card.Footer className='border-0 bg-transparent'>
                {!detail_view && (
                    <table className={`table table-borderless m-0 ${detail_view ? 'border-top' : ''}`}>
                        <tbody className='text-center'>
                            <tr>
                                <th className='border-end'>Current salary</th>
                                <th>Expected salary</th>
                            </tr>
                            <tr>
                                <td className='border-end'>{data?.currentSalary || ''}</td>
                                <td>{data?.expectedSalary || ''}</td>
                            </tr>
                        </tbody>
                    </table>
                )}

                {detail_view && (
                    <div className="border-top py-3">
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <th>Current salary</th>
                                    <td>{data?.currentSalary || "-"}</td>
                                </tr>
                                <tr>
                                    <th>Expected salary</th>
                                    <td>{data?.expectedSalary || "-"}</td>
                                </tr>
                                <tr>
                                    <th>Marital status</th>
                                    <td>{data?.maritalStatus || "-"}</td>
                                </tr>
                                <tr>
                                    <th>Total Experience</th>
                                    <td>{data?.canditateExpType || "-"}</td>
                                </tr>
                                <tr>
                                    <th>Previous Company Name</th>
                                    <td>{data?.previousCompanyName || "-"}</td>
                                </tr>
                                <tr>
                                    <th>Parent Occupation</th>
                                    <td>{data?.parentOccupation || "-"}</td>
                                </tr>
                                <tr>
                                    <th>School (SSLC)</th>
                                    <td>{data?.sslcSchoolName || "-"}</td>
                                </tr>
                                <tr>
                                    <th>SSLC Marks</th>
                                    <td>{data?.sslcMarks || "-"}</td>
                                </tr>
                                <tr>
                                    <th>School (HSC)</th>
                                    <td>{data?.hscSchoolName || "-"}</td>
                                </tr>
                                <tr>
                                    <th>HSC Marks</th>
                                    <td>{data?.hscMarks || "-"}</td>
                                </tr>
                                <tr>
                                    <th>College Name</th>
                                    <td>{data?.collegeName || "-"}</td>
                                </tr>
                                <tr>
                                    <th>College Marks</th>
                                    <td>{data?.collegeMarks || "-"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

            </Card.Footer>
        </Card >
    )
}

export default CampaignCandidatesCard