import { FellowshipCandidateCard } from "Components/Card/FellowshipCanddiateCard";
import ReactPaginateComp from "Components/Pagination/ReactPaginateComp";
import SpinnerComponent from "Components/Spinner/Spinner";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import useCommonState, { useDispatch } from "ResuableFunctions/CustomHooks";
import { handleGetFellowshipCandidates } from "Views/Admin/Action/AdminAction";

export default function Fellowship() {
    const dispatch = useDispatch();
    const { adminState } = useCommonState();

    useEffect(() => {
        dispatch(handleGetFellowshipCandidates({ page: 1, limit: 10 }));
    }, [])

    return (
        <div className="card_content_height">
            <Card className="rounded-4 pt-2 bg-transparent border-0" style={{ height: "100%" }}>
                <Card.Header className="bg-transparent border-0 border-bottom" >
                    <h5>Fellowship Candidates</h5>
                </Card.Header>
                <Card.Body>
                    {adminState?.placeholderGlow ?
                        <div className="h-100 row align-items-center justify-content-center">
                            <SpinnerComponent />
                        </div>
                        :
                        adminState?.fellowship_candidates?.candidates?.length ?
                            <div className="row">
                                <p>Showing {adminState?.fellowship_candidates?.candidates?.length} - {adminState?.fellowship_candidates?.totalCount} Candidates</p>
                                {adminState?.fellowship_candidates?.candidates?.map((candidate, index) => (
                                    <div className="col-12 col-md-6 col-xxl-4 p-1" key={index}>
                                        <FellowshipCandidateCard cardClassName="h-100" params={candidate} />
                                    </div>
                                ))}
                            </div>
                            :
                            <div className="h-100 row align-items-center justify-content-center text-center">
                                <h6>No Fellowship Candidates Found</h6>
                            </div>
                    }
                </Card.Body>
                {!adminState?.placeholderGlow && adminState?.fellowship_candidates?.candidates?.length ?
                    <Card.Footer className="bg-transparent border-0 border-top">
                        <ReactPaginateComp
                            currentPage={adminState?.page_number}
                            pageCount={adminState?.fellowship_candidates?.totalCount}
                            onPageChange={({ selected }) => dispatch(handleGetFellowshipCandidates({ page: selected + 1, limit: 10 }))}
                        />
                    </Card.Footer>
                    :
                    null
                }
            </Card>
        </div>
    );
}