import Icons from './Icons';
import useCommonState, { useDispatch } from 'ResuableFunctions/CustomHooks';
import ShortUniqueId from 'short-unique-id';
import { handleInterviewRegistrationOnChange } from 'Views/InterviewCandidates/Action/interviewAction';
import { handleCreateCampaignOnChnage } from 'Views/Admin/Action/AdminAction';

const readFile = (file) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onloadend = () => {
            resolve({
                id: new ShortUniqueId({ length: 10 }),
                filename: file.name,
                filetype: file.type,
                fileimage: reader.result,
                datetime: file.lastModifiedDate.toLocaleString("en-IN"),
                filesize: filesizes(file.size),
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

function formatDateForInput(date) {
    if (!date) return ""; // Return empty if date is null
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const JsonData = () => {
    const dispatch = useDispatch();
    const { commonState, interviewState, adminState } = useCommonState();

    const jsonOnly = {
        adminSidebarMenus: [
            {
                icon: Icons.dashboardIcon,
                name: "Dashboard",
                route: "/dashboard/home"
            },
            {
                icon: Icons?.employeeIcon,
                name: "Employees",
                route: "/dashboard/employees"
            },
            {
                icon: Icons.attendanceIcon,
                name: "Attendance",
                route: "/dashboard/attendance"
            },
            {
                icon: Icons.payrollIcon,
                name: "Payroll",
                route: "/dashboard/payroll"
            },
            {
                icon: Icons.interviewIcon,
                name: "Interview",
                route: "/dashboard/interview"
            },
            {
                icon: Icons.circularIcon,
                name: "Circular",
                route: "/dashboard/circular"
            },
            {
                icon: Icons.invoicesIcon,
                name: "Invoices",
                route: "/dashboard/invoices"
            },
            {
                icon: Icons.notesIcon,
                name: "Notes",
                route: "/dashboard/notes"
            },
            {
                icon: Icons.doocumentIcon,
                name: "Documents",
                route: "/dashboard/documents"
            }
        ],
        states: [
            { value: 1, label: 'Andaman and Nicobar Islands' },
            { value: 2, label: 'Andhra Pradesh' },
            { value: 3, label: 'Arunachal Pradesh' },
            { value: 4, label: 'Assam' },
            { value: 5, label: 'Bihar' },
            { value: 6, label: 'Chandigarh' },
            { value: 7, label: 'Chhattisgarh' },
            { value: 8, label: 'Dadra and Nagar Haveli' },
            { value: 9, label: 'Delhi' },
            { value: 10, label: 'Goa' },
            { value: 11, label: 'Gujarat' },
            { value: 12, label: 'Haryana' },
            { value: 13, label: 'Himachal Pradesh' },
            { value: 14, label: 'Jammu and Kashmir' },
            { value: 15, label: 'Jharkhand' },
            { value: 16, label: 'Karnataka' },
            { value: 17, label: 'Kerala' },
            { value: 18, label: 'Madhya Pradesh' },
            { value: 19, label: 'Maharashtra' },
            { value: 20, label: 'Manipur' },
            { value: 21, label: 'Meghalaya' },
            { value: 22, label: 'Mizoram' },
            { value: 23, label: 'Nagaland' },
            { value: 24, label: 'Odisha' },
            { value: 25, label: 'Puducherry' },
            { value: 26, label: 'Punjab' },
            { value: 27, label: 'Rajasthan' },
            { value: 28, label: 'Tamil Nadu' },
            { value: 29, label: 'Telangana' },
            { value: 30, label: 'Tripura' },
            { value: 31, label: 'Uttar Pradesh' },
            { value: 32, label: 'Uttarakhand' },
            { value: 33, label: 'West Bengal' }
        ],
        gender: [
            "Male",
            "Female"
        ],
        maritalStatus: [
            "Married",
            "Un Married"
        ],
        canditateRole: [
            "Front-End-Developer",
            "MERN-Stack-Developer"
        ],
        yearOfExp: [
            "0 to 6 Months",
            "6 Months & Above"
        ],
        interviewRound: [
            "HR Round",
            "Apptitude Round",
            "Technical Round",
            "Machine Test",
            "Face to Face Interview",
        ]

    }

    const jsxJson = {
        //                                                              candidate registration form                                                                  //
        candidateRegistration: [
            //                                                                       Candidate details                                                               //
            {
                category: "heading",
                title: "Candidate details",
                divClassName: 'col-12 p-1 mt-2',
            },
            {
                name: "Full Name",
                type: "text",
                category: "input",
                placeholder: "",
                divClassName: 'col-12 col-md-6 col-lg-4 p-1 mt-2',
                value: interviewState?.candidateData?.name || '',
                change: (e) => dispatch(handleInterviewRegistrationOnChange({ name: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.name ? "Full Name required" : null
            },
            {
                name: "Age",
                type: "text",
                category: "input",
                placeholder: "",
                divClassName: 'col-12 col-md-6 col-lg-4 p-1 mt-2',
                value: interviewState?.candidateData?.age || '',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value)) {
                        console.log("/^\d*$/.test(e.target.value)")
                        dispatch(handleInterviewRegistrationOnChange({ age: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.age ? "Age required" : null
            },
            {
                name: "Phone Number",
                type: "text",
                category: "input",
                placeholder: "",
                value: interviewState?.candidateData?.phoneNumber || '',
                divClassName: 'col-12 col-md-6 col-lg-4 p-1 mt-2',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value)) {
                        dispatch(handleInterviewRegistrationOnChange({ phoneNumber: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.phoneNumber ? "Phone number required" : null
            },
            {
                name: "Email",
                type: "email",
                category: "input",
                placeholder: "",
                value: interviewState?.candidateData?.email || '',
                divClassName: 'col-12 col-md-6 col-lg-4 p-1 mt-2',
                change: (e) => dispatch(handleInterviewRegistrationOnChange({ email: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.email ? "Email required" : null
            },
            {
                name: "Gender",
                type: "normal_select",
                category: "select",
                placeholder: "",
                value: interviewState?.candidateData?.gender || '',
                divClassName: 'col-12 col-md-6 col-lg-4 p-1 mt-2',
                options: jsonOnly.gender,
                change: (e) => dispatch(handleInterviewRegistrationOnChange({ gender: e.target.value })),
                Err: commonState?.validated && !interviewState?.candidateData?.gender ? "Gender required" : null,
                isMandatory: true
            },
            {
                name: "Address",
                type: "textbox",
                category: "textbox",
                placeholder: "",
                value: interviewState?.candidateData?.address || '',
                divClassName: 'col-12 p-1 mt-2',
                change: (e) => dispatch(handleInterviewRegistrationOnChange({ address: e.target.value })),
                Err: commonState?.validated && !interviewState?.candidateData?.address ? "Address required" : null,
                isMandatory: true
            },

            //                                                                      Family details                                                                 //
            {
                category: "heading",
                title: "Family details",
                divClassName: 'col-12 p-1 mt-2',
            },
            {
                name: `Parent ${interviewState?.candidateData?.gender === "Female" ? "/ Husband " : ""} name`,
                type: "text",
                category: "input",
                placeholder: "",
                value: interviewState?.candidateData?.parentName || '',
                divClassName: 'col-12 col-md-6 col-lg-4 p-1 mt-2',
                change: (e) => dispatch(handleInterviewRegistrationOnChange({ parentName: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.parentName ? "Parent / Husband name required" : null
            },
            {
                name: `Parent ${interviewState?.candidateData?.gender === "Female" ? "/ Husband " : ""} occupation`,
                type: "text",
                category: "input",
                placeholder: "",
                value: interviewState?.candidateData?.parentOccupation || '',
                divClassName: 'col-12 col-md-6 col-lg-4 p-1 mt-2',
                change: (e) => dispatch(handleInterviewRegistrationOnChange({ parentOccupation: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.parentOccupation ? "Parent / Husband occupation required" : null
            },
            {
                name: "Marital status",
                type: "normal_select",
                category: "select",
                placeholder: "",
                value: interviewState?.candidateData?.maritalStatus || '',
                divClassName: 'col-12 col-md-6 col-lg-4 p-1 mt-2',
                options: jsonOnly?.maritalStatus,
                change: (e) => dispatch(handleInterviewRegistrationOnChange({ maritalStatus: e.target.value })),
                Err: commonState?.validated && !interviewState?.candidateData?.maritalStatus ? "Marital status required" : null,
                isMandatory: true
            },
            {
                name: "Childrens",
                type: "text",
                category: "input",
                placeholder: "",
                value: interviewState?.candidateData?.childrens || '',
                divClassName: `col-12 col-md-6 col-lg-4 p-1 mt-2 ${interviewState?.candidateData?.maritalStatus ? interviewState?.candidateData?.maritalStatus === "Married" ? "" : "d-none" : "d-none"}`,
                change: (e) => {
                    // if (/^\d*$/.test(e.target.value)) {
                    dispatch(handleInterviewRegistrationOnChange({ childrens: e.target.value }))
                    // }
                },
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.childrens ? "Childrens required" : null
            },
            {
                name: "Brother / Sister name",
                type: "text",
                category: "input",
                placeholder: "",
                value: interviewState?.candidateData?.siblings || '',
                divClassName: 'col-12 col-md-6 col-lg-4 p-1 mt-2',
                change: (e) => dispatch(handleInterviewRegistrationOnChange({ siblings: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.name ? "Brother / Sister name required" : null
            },
            {
                name: "Address (Cbe if Any)",
                type: "text",
                category: "input",
                placeholder: "",
                value: interviewState?.candidateData?.addressIfAnyCbe || '',
                divClassName: 'col-12 col-md-6 col-lg-4 p-1 mt-2',
                change: (e) => dispatch(handleInterviewRegistrationOnChange({ addressIfAnyCbe: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.addressIfAnyCbe ? "Address (Cbe if Any) required" : null
            },

            //                                                                Academics & Education                                                                //
            {
                category: "heading",
                title: "Academics & Education",
                divClassName: 'col-12 p-1 mt-2',
            },
            {
                name: "School Name (SSLC)",
                sub_heading: "school/college",
                type: "text",
                category: "input",
                placeholder: "",
                value: interviewState?.candidateData?.sslcSchoolName || '',
                divClassName: 'col-6 p-1 mt-2',
                change: (e) => dispatch(handleInterviewRegistrationOnChange({ sslcSchoolName: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.name ? "School Name required" : null
            },
            {
                name: "Marks/Percentage",
                type: "text",
                category: "input",
                placeholder: "",
                value: interviewState?.candidateData?.sslcMarks || '',
                divClassName: 'col-6 p-1 mt-2',
                change: (e) => {
                    if (/^\d*\.?\d*$/.test(e.target.value)) {
                        dispatch(handleInterviewRegistrationOnChange({ sslcMarks: e.target.value }));
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.sslcMarks ? "Marks/Percentage required" : null
            },
            {
                name: "School Name (HSC)",
                sub_heading: "school/college",
                type: "text",
                category: "input",
                placeholder: "",
                value: interviewState?.candidateData?.hscSchoolName || '',
                divClassName: 'col-6 p-1 mt-2',
                change: (e) => dispatch(handleInterviewRegistrationOnChange({ hscSchoolName: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.hscSchoolName ? "School Name required" : null
            },
            {
                name: "Marks/Percentage",
                type: "text",
                category: "input",
                placeholder: "",
                value: interviewState?.candidateData?.hscMarks || '',
                divClassName: 'col-6 p-1 mt-2',
                change: (e) => {
                    if (/^\d*\.?\d*$/.test(e.target.value)) {
                        dispatch(handleInterviewRegistrationOnChange({ hscMarks: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.hscMarks ? "Marks/Percentage required" : null
            },
            {
                name: "College",
                type: "text",
                category: "input",
                placeholder: "",
                value: interviewState?.candidateData?.collegeName || '',
                divClassName: 'col-12 col-md-6 col-lg-4 p-1 mt-2',
                change: (e) => dispatch(handleInterviewRegistrationOnChange({ collegeName: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.collegeName ? "College Name required" : null
            },
            {
                name: "Qualification",
                type: "text",
                category: "input",
                placeholder: "",
                value: interviewState?.candidateData?.candidateQualification || '',
                divClassName: 'col-12 col-md-6 col-lg-4 p-1 mt-2',
                change: (e) => dispatch(handleInterviewRegistrationOnChange({ candidateQualification: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.candidateQualification ? "Qualification required" : null
            },
            {
                name: "CGPA/Percentage",
                type: "text",
                category: "input",
                placeholder: "",
                value: interviewState?.candidateData?.collegeMarks || '',
                divClassName: 'col-12 col-md-6 col-lg-4 p-1 mt-2',
                change: (e) => {
                    if (/^\d*\.?\d*$/.test(e.target.value)) {
                        dispatch(handleInterviewRegistrationOnChange({ collegeMarks: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.collegeMarks ? "Marks/Percentage required" : null
            },

            //                                                                Fresher or Experienced                                                              //
            {
                category: "heading",
                title: "Fresher / Experience",
                divClassName: 'col-12 p-1 mt-2',
            },
            {
                name: "Fresher",
                type: "radio",
                category: "Checkbox",
                placeholder: "",
                value: "fresher",
                divClassName: 'col-6 col-md-4 col-lg-2 col-xl-1 p-1 mt-2',
                change: (e) => dispatch(handleInterviewRegistrationOnChange({ experience: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.experience ? "Experience type required" : null
            },
            {
                name: "Experienced",
                type: "radio",
                category: "Checkbox",
                placeholder: "",
                value: "experienced",
                divClassName: 'col-6 col-md-4 col-lg-2 col-xl-1 p-1 mt-2',
                change: (e) => dispatch(handleInterviewRegistrationOnChange({ experience: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.experience ? "Experience type required" : null
            },


            //                                                                       Role                                                                         //
            {
                category: "heading",
                title: "Role",
                divClassName: 'col-12 p-1 mt-2',
            },
            {
                type: "normal_select",
                category: "select",
                placeholder: "",
                value: interviewState?.candidateData?.canditateRole || '',
                options: interviewState?.registration_roles?.map((item) => item?.job_title) || [],
                divClassName: 'col-12 col-md-8 col-lg-4 col-xl-3 p-1 mt-2',
                change: (e) => dispatch(handleInterviewRegistrationOnChange({ canditateRole: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.canditateRole ? "Experience type required" : null
            },

            //                                                                  Work Experience                                                                   //
            {
                category: "heading",
                title: "Work Experience",
                divClassName: `col-12 p-1 mt-2 ${interviewState?.candidateData?.experience !== "experienced" ? "d-none" : ""}`,
            },
            {
                name: "Organization name",
                type: "text",
                category: "input",
                placeholder: "",
                value: interviewState?.candidateData?.previousCompanyName || '',
                divClassName: `col-12 col-md-8 col-lg-4 p-1 mt-2 ${interviewState?.candidateData?.experience !== "experienced" ? "d-none" : ""}`,
                change: (e) => dispatch(handleInterviewRegistrationOnChange({ previousCompanyName: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.previousCompanyName ? "Organization name required" : null
            },
            {
                name: "Desigination",
                type: "text",
                category: "input",
                placeholder: "",
                value: interviewState?.candidateData?.designation || '',
                divClassName: `col-12 col-md-8 col-lg-4 p-1 mt-2 ${interviewState?.candidateData?.experience !== "experienced" ? "d-none" : ""}`,
                change: (e) => dispatch(handleInterviewRegistrationOnChange({ designation: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.designation ? "Organization name required" : null
            },
            {
                name: "Years of Experience",
                type: "normal_select",
                category: "select",
                placeholder: "",
                value: interviewState?.candidateData?.canditateExpType || '',
                options: jsonOnly?.yearOfExp,
                divClassName: `col-12 col-md-8 col-lg-4 p-1 mt-2 ${interviewState?.candidateData?.experience !== "experienced" ? "d-none" : ""}`,
                change: (e) => dispatch(handleInterviewRegistrationOnChange({ canditateExpType: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.canditateExpType ? "Years of Experience required" : null
            },


            //                                                             Expected Salary (if any)                                                              //
            {
                category: "heading",
                title: "Expected Salary (if any)",
                divClassName: 'col-12 p-1 mt-2',
            },
            {
                name: "Present Salary if applicable",
                type: "text",
                category: "input",
                placeholder: "",
                value: interviewState?.candidateData?.currentSalary || '',
                divClassName: 'col-12 col-md-8 col-lg-4 p-1 mt-2',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value)) {
                        dispatch(handleInterviewRegistrationOnChange({ currentSalary: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.currentSalary ? "Present Salary required" : null
            },
            {
                name: "Expected Salary",
                type: "text",
                category: "input",
                placeholder: "",
                value: interviewState?.candidateData?.expectedSalary || '',
                divClassName: 'col-12 col-md-8 col-lg-4 p-1 mt-2',
                change: (e) => {
                    if (/^\d*$/.test(e.target.value)) {
                        dispatch(handleInterviewRegistrationOnChange({ expectedSalary: e.target.value }))
                    }
                },
                isMandatory: true,
                Err: commonState?.validated && !interviewState?.candidateData?.expectedSalary ? "Expected Salary required" : null
            },

            //                                                                      Remarks                                                                      //
            {
                category: "heading",
                title: "Remarks and Questions if any",
                divClassName: 'col-12 p-1 mt-2',
            },
            {
                name: "Write here",
                type: "textbox",
                category: "textbox",
                placeholder: "",
                value: interviewState?.candidateData?.remarks || '',
                divClassName: 'col-12 p-1 mt-2',
                change: (e) => dispatch(handleInterviewRegistrationOnChange({ remarks: e.target.value })),
                isMandatory: false
            },
        ],

        create_campaign_inputs: [
            {
                name: "Job title",
                type: "text",
                category: "input",
                placeholder: "",
                divClassName: 'col-12 p-1',
                value: adminState?.create_campaign?.job_title || '',
                change: (e) => dispatch(handleCreateCampaignOnChnage({ job_title: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !adminState?.create_campaign?.job_title ? "Job title required" : ''
            },
            {
                name: "Interview date",
                type: "date",
                is_min: true,
                category: "input",
                placeholder: "",
                divClassName: 'col-12 p-1',
                value: adminState?.create_campaign?.interview_date || '',
                change: (e) => dispatch(handleCreateCampaignOnChnage({ interview_date: e.target.value })),
                isMandatory: true,
                Err: commonState?.validated && !adminState?.create_campaign?.interview_date ? "Interview date required" : ''
            },
        ]
    }

    return {
        "jsonOnly": jsonOnly,
        "jsxJson": jsxJson
    }
}

export default JsonData