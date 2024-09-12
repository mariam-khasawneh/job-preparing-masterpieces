import Button from "../Components/Button/Button";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

// icons
import { FiSun, FiMoon } from "react-icons/fi";

// Font
import { Section } from "../Components/styles-components/containers";
import { H4 } from "../Components/Typography-components/Typography";

function Appointment() {
  return (
    <Section className="flex flex-col gap-8">
      <H4 className="font-semibold text-slate-700">Select Date & Time</H4>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <Calendar
          className="w-full rounded-2xl border-2 border-slate-200 p-8 bg-primarybackground"
          tileClassName=""
        />
        <TimeParts />
      </div>
    </Section>
  );
}

function TimeParts() {
  return (
    <div className="rounded-2xl border-2 border-slate-200 p-8 col-span-1 md:col-span-2 flex flex-col gap-8">
      <Morning />
      <hr />
      <Evening />
    </div>
  );
}

function Morning() {
  const morningSlots = [
    { slot: "08:00 AM" },
    { slot: "08:30 AM" },
    { slot: "09:00 AM" },
    { slot: "9:30 AM" },
    { slot: "10:00 AM" },
  ];

  return (
    <div className="flex flex-col gap-2">
      {/* /// */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-indigobackground text-primaryIndigo rounded-sm">
            <FiSun />
          </div>
          <div className="text-slate-600">
            <p>Morning</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2 mt-2">
          {morningSlots.map(({ slot }) => (
            <Button key={slot} children={slot} primaryOutlined extraSmall />
          ))}
        </div>
      </div>
    </div>
  );
}

function Evening() {
  const eveningSlots = [
    { slot: "04:00 PM" },
    { slot: "05:00 PM" },
    { slot: "06:00 PM" },
    { slot: "07:00 PM" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <div className="p-2 bg-indigobackground text-primaryIndigo rounded-sm">
          <FiMoon />
        </div>
        <div className="text-slate-600">
          <p>Evening</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
        {eveningSlots.map(({ slot }) => (
          <Button key={slot} children={slot} primaryOutlined extraSmall />
        ))}
      </div>
    </div>
  );
}

export default Appointment;
