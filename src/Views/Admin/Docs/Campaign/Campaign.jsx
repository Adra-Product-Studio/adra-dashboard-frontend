import React, { Fragment, useEffect } from 'react'
import ButtonComponent from 'Components/Button/Button'
import Img from 'Components/Img/Img'
import Image from 'Utils/Image'
import { updateOverallModalData } from 'Views/Common/Slice/Common_slice'
import useCommonState, { useCustomNavigate, useDispatch } from 'ResuableFunctions/CustomHooks'
import { handleGetCampaign } from '../../Action/AdminAction'
import CampaignCard from 'Components/Card/CampaignCard'

const Campaign = () => {
    const dispatch = useDispatch();
    const { adminState } = useCommonState();
    const navigate = useCustomNavigate();

    useEffect(() => {
        dispatch(handleGetCampaign())
    }, [])

    return (
        <Fragment>
            <div className="campaign_header border-bottom">
                <h5>Interview</h5>
                <div className="flex-grow-1 text-end">
                    <div className="w-100 d-flex justify-content-end">
                        <div className="px-2">
                            <ButtonComponent type="button" buttonName="Sort by" className="btn btn-outline-dark" />
                        </div>
                        <div className="px-2">
                            <ButtonComponent type="button" buttonName="Filter" className="btn btn-outline-dark" />
                        </div>
                        <div className="px-2">
                            <ButtonComponent type="button" buttonName="Create Campaign" className="btn btn-dark" clickFunction={() => dispatch(updateOverallModalData({ size: 'md', from: 'admin', type: 'create_campaign' }))} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="campaign_body">
                <div className={`d-flex flex-wrap py-4 ${!adminState?.campaign_placeholder && !adminState?.campaigns_data?.campaignCount ? 'justify-content-center align-items-center h-100' : ''}`}>
                    {
                        adminState?.campaign_placeholder ?
                            Array.from({ length: 6 }, (_, i) => (
                                <div className="col-12 col-md-6 col-lg-4 col-xxl-3 p-2">
                                    <CampaignCard cardClassName="w-100" placeholder={true} />
                                </div>
                            ))
                            :
                            adminState?.campaigns_data?.campaignCount ?
                                adminState?.campaigns_data?.campaign?.map((campaign, index) => (
                                    <div className="col-12 col-md-6 col-lg-4 col-xxl-3 p-2" key={index}>
                                        <CampaignCard cardClassName="w-100" campaign={campaign} clickFunction={() => navigate(campaign?._id)} />
                                    </div>
                                ))
                                :
                                <div className="col-md-9 col-lg-6 text-center">
                                    <Img src={Image?.Task_empty} alt="no_campaigns" width="170em" />
                                    <h6 className='mt-2'>No Campaigns are being created</h6>
                                    <div className="px-2 mt-3">
                                        <ButtonComponent type="button" buttonName="Create Campaign" className="btn btn-dark" clickFunction={() => dispatch(updateOverallModalData({ size: 'md', from: 'admin', type: 'create_campaign' }))} />
                                    </div>
                                </div>
                    }

                </div>
            </div>
        </Fragment>
    )
}

export default Campaign