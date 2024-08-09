// calendar
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

// icons
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";

//Font

import { Section } from "../../Components/styles-components/containers";

function Appointment() {
  return (
    <Section>
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
    <div className="rounded-2xl border-2 border-slate-200 p-8 col-span-1 md:col-span-2 flex flex-col gap-2">
      <Morning />
      <hr />
      <Evening />
    </div>
  );
}

function Morning() {
  return (
    <div className="flex gap-2 items-center">
      <div className="  p-2 bg-indigobackground text-primaryIndigo rounded-sm">
        <FiSun />
      </div>
      <div className="text-slate-600">
        <p>Morning</p>
      </div>
    </div>
  );
}

function Evening() {
  return (
    <div className="flex gap-2 items-center">
      <div className="  p-2 bg-indigobackground text-primaryIndigo rounded-sm">
        <FiMoon />
      </div>
      <div className="text-slate-600">
        <p>Evening</p>
      </div>
    </div>
  );
}

export default Appointment;
