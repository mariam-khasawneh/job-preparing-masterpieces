import { Section } from "../../Components/styles-components/containers";
import { ScheduleMeeting } from "react-schedule-meeting";
import styles from "./Schedule.module.css"; // Import CSS Module

function Schedule() {
  const handleTimeslotClicked = (startTimeEventEmit) => {
    startTimeEventEmit.resetDate();
    startTimeEventEmit.resetSelectedTimeState();
    alert(
      `Time selected: ${format(
        startTimeEventEmit.startTime,
        "cccc, LLLL do h:mm a"
      )}`
    );
  };

  const availableTimeslots = [0, 1, 2, 3, 4, 5].map((id) => {
    return {
      id,
      startTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          9,
          0,
          0,
          0
        )
      ),
      endTime: new Date(
        new Date(new Date().setDate(new Date().getDate() + id)).setHours(
          17,
          0,
          0,
          0
        )
      ),
    };
  });

  return (
    <Section>
      <ScheduleMeeting
        availableTimeslots={availableTimeslots}
        backgroundColor="#f7fbfb"
        borderRadius={16}
        primaryColor="#655de9"
        eventDurationInMinutes={30}
        selectedDateDayTitleFormatString="cccc, LLLL do"
        selectedDateMonthTitleFormatString="cccc, LLLL do"
        onStartTimeSelect={handleTimeslotClicked}
        startTimeListStyle="grid"
        className={styles.customShadowNone} // Applying the custom class from CSS Module
      />
    </Section>
  );
}

export default Schedule;
