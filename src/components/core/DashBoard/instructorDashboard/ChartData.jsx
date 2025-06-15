import { Chart, registerables } from "chart.js";
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

const ChartData = ({ courses }) => {
  const [currChart, setCurrChart] = useState("student");

  // function to generate random colors
  const getRandomColors = (noOfColors) => {
    const colors = [];
    for (let i = 0; i < noOfColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "white",
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text:
          currChart === "student"
            ? "Students Enrolled per Course"
            : "Income per Course",
        color: "white",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
  };

  // creating data for student info chart
  const studentDataSet = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.studentsEnrolled?.length || 0),
        backgroundColor: getRandomColors(courses.length),
        borderWidth: 1,
        borderColor: "white",
      },
    ],
  };

  // creating data for income chart
  const incomeDataSet = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map(
          (course) =>
            parseFloat(course.price || 0) *
            (course.studentsEnrolled?.length || 0)
        ),
        backgroundColor: getRandomColors(courses.length),
        borderWidth: 1,
        borderColor: "white",
      },
    ],
  };

  return (
    <div className="w-full bg-richblack-800 rounded-lg">
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded-lg font-bold ${
            currChart === "student"
              ? "bg-yellow-50 text-richblack-900"
              : "bg-richblack-700 text-yellow-50"
          }`}
          onClick={() => setCurrChart("student")}
        >
          Students
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-bold ${
            currChart === "income"
              ? "bg-yellow-50 text-richblack-900"
              : "bg-richblack-700 text-yellow-50"
          }`}
          onClick={() => setCurrChart("income")}
        >
          Income
        </button>
      </div>
      <div className="h-[300px]">
        <Pie
          data={currChart === "student" ? studentDataSet : incomeDataSet}
          options={chartOptions}
        />
      </div>
    </div>
  );
};

export default ChartData;
