import { Card } from "react-bootstrap";
import ButtonComponent from "Components/Button/Button";
import InterviewCandidatesHeader from "Components/Panel_compnent/InterviewCandidatesHeader";
import SpinnerComponent from "Components/Spinner/Spinner";
import useCommonState, { useDispatch } from "ResuableFunctions/CustomHooks";
import { Inputfunctions } from "ResuableFunctions/Inputfunctions";
import JsonData from "Utils/JsonData";
import { handleFellowshipRegisterCandidate } from "../Action/Common_action";

export default function FellowshipCandidatesRegistration() {
    const dispatch = useDispatch()
    const { commonState } = useCommonState();
    const { fellowshipCandidatesRegistration } = JsonData()?.jsxJson;

    return (
        <div className='overflow-hidden'>
            <InterviewCandidatesHeader />

            <section className='main'>
                <div className="h-100 d-flex flex-wrap align-items-center justify-content-center">

                    <div className="col-12 col-md-10 col-lg-8">
                        <Card className='w-100'>
                            <Card.Header className='py-3 '>
                                <h5 className='mb-0'>Fellowship Candidate Registration</h5>
                            </Card.Header>
                            <Card.Body className='py-3 registration-form-height d-flex flex-wrap align-content-start'>
                                {Inputfunctions(fellowshipCandidatesRegistration)}
                            </Card.Body>
                        </Card>

                        <div className='d-flex justify-content-end bg-transparent border-0 mt-3'>
                            <ButtonComponent
                                type="button"
                                className="btn btn-dark w-25"
                                buttonName={commonState?.buttonSpinner ?
                                    <SpinnerComponent />
                                    :
                                    "Continue"
                                }
                                clickFunction={() => dispatch(handleFellowshipRegisterCandidate({ fellowshipCandidatesRegistration, input_data: commonState?.fellowship_candidate_register || {} }))}
                                btnDisable={commonState?.buttonSpinner}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}