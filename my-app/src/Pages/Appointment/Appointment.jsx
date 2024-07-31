import Calendar from "../../Components/Calendar/Calendar";
import { Section } from "../../Components/styles-components/containers";
function Appointment() {
  return (
    <Section>
      <div className="w-full">
        <Calendar className="w-full" />
      </div>
    </Section>
  );
}

export default Appointment;
