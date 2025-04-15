import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Custom function to determine bar color
const getBarColor = (name, value) => {
  return (name === "Quantitative" && value > 10) ||
    (name === "Technical" && value > 20)
    ? "#588B8B"
    : "#C8553D";
};

// Custom Label Renderer to prevent overlap
const renderCustomizedLabel = (props) => {
  const { x, y, width, value, name } = props;
  const radius = 15;

  const adjustedY = y - radius < 20 ? y + radius + 10 : y - radius;

  return (
    <g>
      <circle cx={x + width / 2} cy={adjustedY} r={radius} fill="#8884d8" />
      <text
        x={x + width / 2}
        y={adjustedY}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};

// Candidate Card component
const CandidateCard = ({ candidate }) => {
    const [timeLeft, setTimeLeft] = useState("");

    console.log(candidate)
  
    useEffect(() => {
      const calculateTimeLeft = () => {
        const testStartedOn = new Date(candidate.test_StartedOn);
        const testEndsOn = new Date(testStartedOn.getTime() + 60 * 60 * 1000); // 1 hour later
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
    }, [candidate.test_StartedOn]);
  
    const chartData = [
      { name: "Quantitative", value: candidate.aptitude_score + candidate.reasoning_score || 0 },
      { name: "Technical", value: Number.isNaN(candidate.tech_hard_score + candidate.tech_moderate_score) ? 0 :  candidate.tech_hard_score + candidate.tech_moderate_score },
    ];
  
    const totalCapacity = 50;
    const appliedCount = candidate.aptitude_score + candidate.reasoning_score + candidate.tech_hard_score;
    const progressWidth = (appliedCount / totalCapacity) * 100;
  
    // Calculate the time left as a percentage of 60 minutes (1 hour)
    const testDuration = 60 * 60 * 1000; // 1 hour in milliseconds
    const timeRemainingMs = new Date(candidate.test_StartedOn).getTime() + testDuration - new Date().getTime();
    const timeLeftPercentage = timeRemainingMs > 0 ? (timeRemainingMs / testDuration) * 100 : 0;
  
    // Determine progress bar color based on time left (e.g., red for time running out, green for more time)
    const progressBarColor = timeLeftPercentage > 30 ? "#4CAF50" : "#F44336"; // Green if more than 30%, Red if less
  
    return (
      <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
        <div className="card p-3 mb-2">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <div className="ms-2 c-details">
                <h6 className="mb-2">{candidate.candidate_details[0].name.toUpperCase()}</h6>
                <span className="fw-bold">{candidate.candidate_role}</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 50]} />
                <Tooltip />
                <Bar dataKey="value" barSize={50}>
                  {chartData.map((entry, i) => (
                    <Cell
                      key={`cell-${i}`}
                      fill={getBarColor(entry.name, entry.value)}
                    />
                  ))}
                  <LabelList
                    dataKey="value"
                    position="insideTop"
                    content={renderCustomizedLabel}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-3">
              {/* Progress bar container */}
             
  
              {/* Display the remaining time */}
              <div className="mt-2">
                <strong>{timeLeft}</strong> {/* Display time left */}
              </div>
  
              <div className="mt-2">
                Test Status: <span className="text1">{candidate.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  
  
  
  
  
  
  
// Main component to fetch and render candidate status
const CandidateStatus = () => {
  const [candidates, setCandidates] = useState([]);

  const [refresh, setRefresh] = useState(false)

  const refreshList = () => {
    setRefresh(!refresh)
  }

  useEffect(() => {
    const getCandidateStatusDetails = async () => {
      try {
        const response = await axios.get(
          "http://10.10.24.16:8000/api/v1/get_interview_candidate_status"
        );
        if (response.data.error_code === 0) {
            console.log(response.data)
          setCandidates(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching candidate data:", error);
      }
    };

    getCandidateStatusDetails();
  }, [refresh]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="#">
            ADRA
          </a>
          <div className="d-flex">
            <button
              className="btn btn-sm btn-danger"
              type="button"
              onClick={refreshList}
            >
              Refresh
            </button>
          </div>
        </div>
      </nav>

      <div className="container-fluid mt-3">
        <div className="row">
          {candidates.map((candidate) => (
            <CandidateCard key={candidate._id} candidate={candidate} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CandidateStatus;
