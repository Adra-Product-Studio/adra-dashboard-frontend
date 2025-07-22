import Img from "Components/Img/Img"
import { Card } from "react-bootstrap"
import { useCustomNavigate } from "ResuableFunctions/CustomHooks";
import JsonData from "Views/Admin/Utils/JsonData"

export const FellowshipCandidateCard = ({
    cardClassName = "h-100 rounded-4 pt-2 shadow-sm cursor-pointer",
    params = {},
}) => {
    const navigate = useCustomNavigate();
    const { jsxJson } = JsonData(params);

    return (
        <Card className={cardClassName} onClick={() => navigate(`${params?._id || ''}`)}>
            <Card.Body>
                <Card.Title className="mb-3 text-center pt-4">
                    <Img src={`${process.env.REACT_APP_CDN_URL}${params?.profile_photo_path || ''}`} alt="Fellowship Candidate" className="fellowship_candidate_image" />
                </Card.Title>
                <Card.Text className="text-center"> <h6>{params?.fullname || ''}</h6> </Card.Text>

                {jsxJson?.fellowship_card_data?.map((item, index) => (
                    <p className="text-muted row" key={index}>
                        <strong className="text-dark pe-2 col-4"> {item?.heading} </strong>
                        <span className="col text-break"> {item?.content}  </span>
                    </p>
                ))}
            </Card.Body>
        </Card>
    )
}