import React from 'react';
import Card from 'react-bootstrap/Card';
import IsoStringDateConverter from 'ResuableFunctions/IsoStringDateConverter';
import Icons from 'Utils/Icons';


const CampaignCard = ({
    componentFrom,
    placeholder,
    campaign,
    clickFunction
}) => {
    const card_content = [
        {
            icon: Icons.campaign_calender_icon,
            title: 'Interview Schedule Date',
            value: campaign?.interview_date ? IsoStringDateConverter(campaign?.interview_date)?.date : ''
        },
        {
            icon: Icons.campaign_total_candidate_icon,
            title: 'No of Candidates',
            value: campaign?.no_of_candidates || 0
        },
        {
            icon: Icons.campaign_confirm_candidate_icon,
            title: 'Confirm Candidates',
            value: campaign?.confirmed_candidates || 0
        }
    ]

    return (
        <Card className='border rounded-4 h-100'>
            <Card.Header className='bg-transparent py-3'>
                <h6 className={placeholder ? "placeholder w-75 py-3 rounded" : ''}>{campaign?.job_title || ''}</h6>
                <p className={placeholder ? "placeholder w-50 py-3 rounded mb-0" : 'mb-0 text-secondary fs-13'}>
                    Posted on :
                    {
                        campaign?.created_at ? IsoStringDateConverter(campaign?.created_at)?.date
                            :
                            ''
                    }
                </p>
            </Card.Header>
            <Card.Body className='row gy-3 cursor-pointer' onClick={clickFunction}>
                {
                    card_content.map((item, index) => (
                        <div className="col-12 d-flex flex-wrap mb-4" key={index}>
                            <div className={placeholder ? "placeholder w-75 py-2 rounded" : ''} style={{ width: '70%' }}>
                                {placeholder ? null : item.icon}
                                <span className='ps-2 text-secondary fs-14'>{placeholder ? '' : item.title}</span>
                            </div>
                            <div className={placeholder ? "placeholder col py-2 rounded ms-2" : 'col'}>
                                <span>
                                    :
                                    <span className={placeholder ? "placeholder w-50 rounded" : 'fs-14 ps-2'}>
                                        {item.value}
                                    </span>
                                </span>
                            </div>
                        </div>
                    ))
                }
            </Card.Body>
        </Card >
    )
}

export default CampaignCard