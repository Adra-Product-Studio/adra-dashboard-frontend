import ButtonComponent from "Components/Button/Button";
import useCommonState, { useCustomNavigate, useDispatch } from "ResuableFunctions/CustomHooks";
import ModalComponent from "Components/Modal/Modal";
import SpinnerComponent from "Components/Spinner/Spinner";
import JsonData from "Utils/JsonData";
import Icons from "Utils/Icons";
import { resetModalBox, updateModalShow } from "Views/Common/Slice/Common_slice";
import { handleCloseTestAndNavigate, handleCloseTestEndpoint } from "Views/InterviewCandidates/Action/interviewAction";
import Img from "Components/Img/Img";
import Image from "Utils/Image";
import { Inputfunctions } from "./Inputfunctions";
import { handleAddOrUpdateQuestionPattern, handleCreateCampaign, handleDeleteQuestionPattern, handleEditQuestionPattern } from "Views/Admin/Action/AdminAction";
import { edit_campaign_data } from "Views/Admin/Slice/AdminSlice";

export function OverallModel() {
    const { commonState, interviewState, adminState } = useCommonState();

    const dispatch = useDispatch();
    const JsonJsx = JsonData()?.jsxJson;
    const navigate = useCustomNavigate();

    function modalHeaderFun() {
        switch (commonState?.modal_from) {
            case "admin":
                switch (commonState?.modal_type) {
                    case "create_campaign":
                        return <h6 className='mb-0'>Create campaign</h6>;

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }

    function modalBodyFun() {
        switch (commonState?.modal_from) {
            case "interview_candidate":
                switch (commonState?.modal_type) {
                    case "registration_completed":
                        return <div className="w-100">
                            <div className="row py-5 align-items-center justify-content-center h-100 w-100">
                                <div className="col-12 text-center">
                                    {Icons.testSucccess}
                                    <h5 className="text-center my-3">Registration successfull</h5>
                                    <p className="text-secondary">Your Login credentials</p>

                                    <div className="py-3 border rounded-4">
                                        <h5 className="text-center my-3 fs-17">Username : <span>{commonState?.usernamee}</span></h5>
                                        <h5 className="text-center my-3 fs-17">Password : <span>{commonState?.passwordd}</span></h5>

                                        <ButtonComponent
                                            buttonName="Click to login"
                                            className="btn-outline-secondary px-5"
                                            clickFunction={() => {
                                                dispatch(resetModalBox())
                                                navigate("/")
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    case "test_completed":
                        return <div className="w-100 interview_candidate_height">
                            <div className="row py-5 align-items-center justify-content-center h-100 w-100">
                                <div className="col-6 text-center">
                                    <Img
                                        src={Image?.CompanyLogo}
                                        className="cursor-pointer"
                                        width="100rem"
                                        height="67rem"
                                    />

                                    <h5 className="text-center my-3">Test completed</h5>
                                    <p className="text-secondary">Thank you for your commitment, and best of luck with your next steps!....</p>
                                    <ButtonComponent
                                        buttonName="Close"
                                        className="btn-outline-secondary px-5"
                                        clickFunction={() => dispatch(handleCloseTestAndNavigate)}
                                    />
                                </div>
                            </div>
                        </div>

                    case "time_finished":
                        return <div className="w-100 interview_candidate_height">
                            <div className="row py-5 align-items-center justify-content-center h-100 w-100">
                                <div className="col-6 text-center">
                                    <h5 className="text-center my-3">Time up</h5>
                                    <p className="text-secondary">Submitting your response....</p>
                                    <SpinnerComponent />
                                </div>
                            </div>
                        </div>

                    case "submit_confirmation":
                        return <div className="w-100 submit_confirmation_height">
                            <div className="row py-5 align-items-center justify-content-center h-100 w-100">
                                <div className="col-6 text-center">
                                    {Icons?.closeTestIcon}
                                    <h5 className="text-center my-3">Are you sure do you want to submit the test</h5>
                                </div>
                            </div>
                        </div>

                    default:
                        break;
                }
                break;

            case "admin":
                switch (commonState?.modal_type) {
                    case "create_campaign":
                        return <div className="col-11 mx-auto py-2">
                            {Inputfunctions(JsonJsx?.create_campaign_inputs)}
                            <ButtonComponent
                                type="button"
                                className="btn btn-dark text-center w-100 mt-3"
                                buttonName="Create"
                                clickFunction={() => dispatch(handleCreateCampaign({ job_title: adminState?.create_campaign?.job_title, interview_date: adminState?.create_campaign?.interview_date }))}
                            />
                        </div>

                    case "assign_question":
                        return <div className="col-12 mx-auto py-2 row h-100 align-items-center">
                            <div className="col-lg-5 row align-items-center border-end pe-4">
                                {Inputfunctions(JsonJsx?.admin_create_assigning_questions)}

                                <ButtonComponent
                                    type="button"
                                    className="btn btn-dark text-center w-100 mt-3"
                                    buttonName={adminState?.create_assigning_questions?._id ? "Update" : "Add"}
                                    clickFunction={
                                        adminState?.create_assigning_questions?._id ?
                                            () => dispatch(handleEditQuestionPattern({ ...adminState?.create_assigning_questions, campaign_id: adminState?.campaigns_data?._id }))
                                            :
                                            () => dispatch(handleAddOrUpdateQuestionPattern({ ...adminState?.create_assigning_questions, campaign_id: adminState?.campaigns_data?._id }))
                                    }
                                />
                            </div>

                            <div className="col-lg-7 row align-items-center ps-2">
                                {
                                    adminState?.campaigns_data?.question_pattern?.length ?
                                        <table className="col-12 table table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Type</th>
                                                    <th scope="col">Level</th>
                                                    <th scope="col">Count</th>
                                                    <th scope="col">Edit</th>
                                                    <th scope="col">Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {adminState?.campaigns_data?.question_pattern?.map((item, index) => (
                                                    <tr className="py-2">
                                                        <td className="col text-secondary">{item?.question_type}</td>
                                                        <td className="col text-secondary">{item?.difficulty_level}</td>
                                                        <td className="col text-secondary">{item?.questions_count}</td>
                                                        <td className="col text-secondary">
                                                            <ButtonComponent
                                                                type="button"
                                                                className="btn-transparent"
                                                                buttonName={Icons?.editIcon}
                                                                clickFunction={() => dispatch(edit_campaign_data(item))}
                                                            />
                                                        </td>
                                                        <td className="col text-secondary">
                                                            <ButtonComponent
                                                                type="button"
                                                                className="btn-transparent"
                                                                buttonName={Icons?.deleteIcon}
                                                                clickFunction={() => dispatch(handleDeleteQuestionPattern({ question_id: item?._id, campaign_id: adminState?.campaigns_data?._id }))}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan={5}>
                                                        <span>Total number of Questions: {
                                                            adminState?.campaigns_data?.question_pattern?.reduce(
                                                                (acc, curr) => acc + Number(curr.questions_count || 0),
                                                                0
                                                            )}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                        :
                                        <div className="col-12 text-center">
                                            <p className="text-secondary">Question pattern not added. its looks like empty!!!</p>
                                        </div>
                                }
                            </div>
                        </div>
                    default:
                        break;
                }
        }
    }

    function modalFooterFun() {
        switch (commonState?.modal_from) {
            case "interview_candidate":
                switch (commonState?.modal_type) {
                    case "submit_confirmation":
                        return <div className='col-12 d-flex flex-wrap px-2'>
                            <div className="col-6 p-1 pb-0">
                                <ButtonComponent
                                    className="btn-secondary w-100 py-2"
                                    buttonName="Close"
                                    clickFunction={() => dispatch(updateModalShow())}
                                    btnDisable={interviewState?.submit_test}
                                />
                            </div>
                            <div className="col-6 p-1 pb-0">
                                <ButtonComponent
                                    buttonName={
                                        interviewState?.submit_test ?
                                            <SpinnerComponent />
                                            :
                                            "Submit test"
                                    }
                                    className="btn-outline-secondary w-100"
                                    clickFunction={() => dispatch(handleCloseTestEndpoint(interviewState?.generatedQuestions))}
                                />
                            </div>
                        </div>

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }

    return (
        <ModalComponent
            show={commonState?.modalShow}
            modalSize={commonState?.modalSize}
            modalCentered={true}
            modalCloseButton={commonState?.modal_close_btn}
            showModalHeader={true}
            modalHeaderClassname="border-0"
            modalHeader={modalHeaderFun()}
            modalBodyClassname={`${/lg|xl/.test(commonState?.modalSize) && commonState?.enable_lg_autoScroll ? "model_height_lg rounded-4" : ''} py-2`}
            modalBody={<div className='d-flex flex-wrap p-3 py-0 h-100'>{modalBodyFun()}</div>}
            showModalFooter={true}
            modalFooterClassname="border-0"
            modalFooter={modalFooterFun()}
            modalClassname={'rounded-4'}
        />
    )
}