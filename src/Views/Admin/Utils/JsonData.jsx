export function dateConvertor(date) {
    if (date) {
        const inputDate = new Date(date);

        const utcDateTime = inputDate.toISOString().slice(0, 19).replace("T", " ");
        console.log("UTC:", utcDateTime);

        const localDate = inputDate.toLocaleString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });
        return localDate;
    }
    else return '';
}


const JsonData = (params) => {
    // const dispatch = useDispatch();
    // const { commonState, interviewState, adminState } = useCommonState();

    const jsonOnly = {

    }

    const jsxJson = {
        fellowship_card_data: [
            {
                heading: 'Work Experience:',
                content: params?.work_experience || ''
            },
            {
                heading: 'Email:',
                content: params?.email_id || ''
            },
            {
                heading: 'Contact no:',
                content: params?.phone_no || ''
            },
            {
                heading: 'Address:',
                content: params?.address || ''
            },
            {
                heading: 'Applied on:',
                content: dateConvertor(params?.date)
            }
        ]
    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData;