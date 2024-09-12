// import React from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import styled from "styled-components";

// const StyledCalendar = styled(Calendar)`
//   &.react-calendar {
//     padding: 32px;
//     border-radius: 16px;
//     border: solid #dde1ff 2px;
//     width: 100%;
//     border: none;
//     font-family: Arial, Helvetica, sans-serif;
//     background-color: #dde1ff;
//   }

//   .react-calendar__tile {
//     background: none;
//     border: none;
//     border-radius: 8px;
//     margin: 5px;
//     padding: 10px;
//     text-align: center;
//     font-weight: bold;
//     color: #000000;

//     &:hover {
//       background-color: #f0f0f0;
//     }

//     &--active {
//       background-color: #007bff;
//       color: #fff;

//       &:hover {
//         background-color: #0056b3;
//       }
//     }
//   }

//   .react-calendar__month-view__days__day--weekend {
//     color: red;
//   }

//   .react-calendar__tile--now {
//     background: #ffeb3b;
//     font-weight: bold;
//   }
// `;

// const CalendarComponent = () => {
//   return <StyledCalendar />;
// };

// export default CalendarComponent;

import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

const StyledCalendar = styled(Calendar)`
  &.react-calendar {
    padding: 32px;
    border-radius: 16px;
    border: solid #dde1ff 2px; /* Ensure this is the only border property */
    width: 100%;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #dde1ff;
    display: block; /* Ensure it's displayed as a block-level element */
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
