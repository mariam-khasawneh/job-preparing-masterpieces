import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

const StyledCalendar = styled(Calendar)`
  &.react-calendar {
    width: 100%;
    border: none;
    font-family: Arial, Helvetica, sans-serif;
  }

  .react-calendar__tile {
    background: none;
    border: none;
    border-radius: 8px;
    margin: 5px;
    padding: 10px;
    text-align: center;
    font-weight: bold;
    color: #000000;

    &:hover {
      background-color: #f0f0f0;
    }

    &--active {
      background-color: #007bff;
      color: #fff;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  .react-calendar__month-view__days__day--weekend {
    color: red;
  }

  .react-calendar__tile--now {
    background: #ffeb3b;
    font-weight: bold;
  }
`;

const CalendarComponent = () => {
  return <StyledCalendar />;
};

export default CalendarComponent;
