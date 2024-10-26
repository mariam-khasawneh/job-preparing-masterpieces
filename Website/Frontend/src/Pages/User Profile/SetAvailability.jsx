// import React, { useState, useEffect } from "react";
// import { format, isBefore, startOfDay, parseISO } from "date-fns";
// import { Calendar } from "../../Components/ui/calendar";
// import { Button } from "../../Components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../../Components/ui/card";
// import { ScrollArea } from "../../Components/ui/scroll-area";
// import Badges from "@/Components/Badges";
// import { Sun, Moon } from "lucide-react";
// import { Caption } from "@/Components/Typography-components/Typography";
// import { availabilityApi } from "../../Api/availability";

// const morningSlots = ["08:00", "09:00", "10:00", "11:00", "12:00"];
// const eveningSlots = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

// const SetAvailability = ({ coachId }) => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedSlots, setSelectedSlots] = useState({});
//   const [availabilityRecords, setAvailabilityRecords] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch availability records
//   useEffect(() => {
//     const fetchAvailability = async () => {
//       if (!coachId) return;

//       setIsLoading(true);
//       setError(null);
//       try {
//         const data = await availabilityApi.getAvailability(coachId);
//         setAvailabilityRecords(data);
//       } catch (err) {
//         setError(err.toString());
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAvailability();
//   }, [coachId]);

//   const handleDateSelect = (date) => {
//     setSelectedDate(date); // Keep this as a Date object
//     const dateStr = format(date, "yyyy-MM-dd");
//     const existingRecord = availabilityRecords.find(
//       (record) => format(parseISO(record.date), "yyyy-MM-dd") === dateStr
//     );

//     if (existingRecord) {
//       const slots = {};

//       existingRecord.timeSlots.forEach((slot) => {
//         slots[slot.time] = slot.status;
//       });
//       setSelectedSlots(slots);
//     } else {
//       setSelectedSlots({});
//     }
//   };

//   const handleTimeSlotToggle = (time) => {
//     setSelectedSlots((prev) => ({
//       ...prev,
//       [time]: !prev[time],
//     }));
//   };

//   const handleSaveAvailability = async () => {
//     const formattedDate = format(selectedDate, "yyyy-MM-dd"); // Proper date formatting

//     const availabilityData = {
//       date: formattedDate, // Sending date as a formatted string
//       timeSlots: Object.entries(selectedSlots)
//         .filter(([_, isSelected]) => isSelected)
//         .map(([time]) => ({
//           time,
//           status: true,
//         })),
//     };

//     if (availabilityData.timeSlots.length === 0) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const existingRecord = availabilityRecords.find(
//         (record) =>
//           format(new Date(record.date), "yyyy-MM-dd") === formattedDate
//       );

//       let updatedRecord;
//       if (existingRecord) {
//         updatedRecord = await availabilityApi.updateAvailability(
//           existingRecord._id,
//           availabilityData
//         );
//         setAvailabilityRecords((records) =>
//           records.map((record) =>
//             record._id === existingRecord._id ? updatedRecord : record
//           )
//         );
//       } else {
//         const newRecord = await availabilityApi.createAvailability({
//           ...availabilityData,
//           coachId,
//         });
//         setAvailabilityRecords((records) => [...records, newRecord]);
//       }
//     } catch (err) {
//       setError(err.toString());
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderTimeSlots = (slots) => (
//     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
//       {slots.map((slot) => (
//         <Button
//           key={slot}
//           variant={selectedSlots[slot] ? "secondary" : "outline"}
//           size={"sm"}
//           className="text-sm"
//           onClick={() => handleTimeSlotToggle(slot)}
//           disabled={isLoading}
//         >
//           {slot}
//         </Button>
//       ))}
//     </div>
//   );

//   const disablePastDates = (date) => {
//     return isBefore(startOfDay(date), startOfDay(new Date()));
//   };

//   if (isLoading && !availabilityRecords.length) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Set Your Availability</h1>
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//           <strong className="font-bold">Error:</strong>
//           <span className="block sm:inline"> {error}</span>
//         </div>
//       )}
//       <div className="flex flex-col md:flex-row gap-4">
//         <Card className="flex-1">
//           <CardHeader>
//             <CardTitle>Select Date</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Calendar
//               mode="single"
//               selected={selectedDate}
//               onSelect={handleDateSelect}
//               className="rounded-md border"
//               disabled={disablePastDates}
//             />
//           </CardContent>
//         </Card>
//         <Card className="flex-1">
//           <CardHeader>
//             <CardTitle>
//               Set Time Slots for {format(selectedDate, "MMMM d, yyyy")}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Caption className="font-semibold mb-2 flex gap-1">
//               <Sun size={"20"} />
//               Morning
//             </Caption>
//             {renderTimeSlots(morningSlots)}
//             <Caption className="font-semibold mt-4 mb-2 flex gap-1">
//               <Moon size={"20"} />
//               Evening
//             </Caption>
//             {renderTimeSlots(eveningSlots)}
//             <Button
//               className="mt-6 w-full"
//               onClick={handleSaveAvailability}
//               disabled={
//                 isLoading ||
//                 Object.values(selectedSlots).filter(Boolean).length === 0
//               }
//             >
//               {isLoading ? "Saving..." : "Save Availability"}
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//       <Card className="mt-4">
//         <CardHeader>
//           <CardTitle>Saved Availability Records</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ScrollArea className="h-[200px] w-full rounded-md border p-4">
//             {availabilityRecords.map((record) => (
//               <div key={record._id} className="mb-4">
//                 <h3 className="font-semibold">
//                   {format(parseISO(record.date), "MMMM d, yyyy")}
//                 </h3>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {record.timeSlots.map((slot) => (
//                     <Badges key={slot.time} variant="secondary" size="sm">
//                       {slot.time}
//                     </Badges>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </ScrollArea>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default SetAvailability;

///////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { format, isBefore, startOfDay, parseISO } from "date-fns";
import { Calendar } from "../../Components/ui/calendar";
import { Button } from "../../Components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";
import { ScrollArea } from "../../Components/ui/scroll-area";
import Badges from "@/Components/Badges";
import { Sun, Moon } from "lucide-react";
import { Caption } from "@/Components/Typography-components/Typography";
import { availabilityApi } from "../../Api/availability";

const morningSlots = ["08:00", "09:00", "10:00", "11:00", "12:00"];
const eveningSlots = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const SetAvailability = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState({});
  const [availabilityRecords, setAvailabilityRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const fetchAvailabilityRecords = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await availabilityApi.getAvailability();
      setAvailabilityRecords(data);
    } catch (err) {
      console.error("Error fetching availability:", err);
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailabilityRecords();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const dateStr = format(date, "yyyy-MM-dd");
    const existingRecord = availabilityRecords.find(
      (record) => format(parseISO(record.date), "yyyy-MM-dd") === dateStr
    );

    if (existingRecord) {
      setEditMode(true);
      const slots = {};
      existingRecord.timeSlots.forEach((slot) => {
        slots[slot.time] = slot.status;
      });
      setSelectedSlots(slots);
    } else {
      setEditMode(false);
      setSelectedSlots({});
    }
  };

  const handleTimeSlotToggle = (time) => {
    setSelectedSlots((prev) => ({
      ...prev,
      [time]: !prev[time],
    }));
  };

  const handleSaveAvailability = async () => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    const availabilityData = {
      date: formattedDate,
      timeSlots: Object.entries(selectedSlots)
        .filter(([_, isSelected]) => isSelected)
        .map(([time]) => ({
          time,
          status: true,
        })),
    };

    if (availabilityData.timeSlots.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      if (editMode) {
        // Update existing availability
        await availabilityApi.updateAvailability(availabilityData);
      } else {
        // Create new availability
        await availabilityApi.createAvailability(availabilityData);
      }

      // Refresh the records after successful save
      await fetchAvailabilityRecords();

      // Reset state
      setSelectedSlots({});
      setEditMode(false);

      // Show success message or notification if needed
    } catch (err) {
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }

    // try {
    //   const existingRecord = availabilityRecords.find(
    //     (record) =>
    //       format(new Date(record.date), "yyyy-MM-dd") === formattedDate
    //   );

    //   if (existingRecord) {
    //     await availabilityApi.updateAvailability(
    //       existingRecord._id,
    //       availabilityData
    //     );
    //   } else {
    //     await availabilityApi.createAvailability(availabilityData);
    //   }

    //   // Refresh the records after successful save
    //   await fetchAvailabilityRecords();

    //   // Clear selected slots after successful save
    //   setSelectedSlots({});
    // } catch (err) {
    //   setError(err.toString());
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const renderTimeSlots = (slots) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
      {slots.map((slot) => (
        <Button
          key={slot}
          variant={selectedSlots[slot] ? "secondary" : "outline"}
          size="sm"
          className="text-sm"
          onClick={() => handleTimeSlotToggle(slot)}
          disabled={isLoading}
        >
          {slot}
        </Button>
      ))}
    </div>
  );

  const disablePastDates = (date) => {
    return isBefore(startOfDay(date), startOfDay(new Date()));
  };

  if (isLoading && !availabilityRecords.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Set Your Availability</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
              // disabled={disablePastDates}
              disabled={(date) =>
                isBefore(startOfDay(date), startOfDay(new Date()))
              }
            />
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            {/* <CardTitle>
              Set Time Slots for {format(selectedDate, "MMMM d, yyyy")}
            </CardTitle> */}
            <CardTitle>
              {editMode ? "Edit" : "Set"} Time Slots for{" "}
              {format(selectedDate, "MMMM d, yyyy")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Caption className="font-semibold mb-2 flex gap-1">
              <Sun size={20} />
              Morning
            </Caption>
            {renderTimeSlots(morningSlots)}

            <Caption className="font-semibold mt-4 mb-2 flex gap-1">
              <Moon size={20} />
              Evening
            </Caption>
            {renderTimeSlots(eveningSlots)}

            <Button
              className="mt-6 w-full"
              onClick={handleSaveAvailability}
              disabled={
                isLoading ||
                Object.values(selectedSlots).filter(Boolean).length === 0
              }
            >
              {isLoading ? "Saving..." : "Save Availability"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Saved Availability Records</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <span>Loading records...</span>
              </div>
            ) : availabilityRecords.length === 0 ? (
              <div className="text-center text-gray-500 py-4">
                No availability records found
              </div>
            ) : (
              availabilityRecords
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((record) => (
                  <div
                    key={record._id}
                    className="mb-4 p-3 border-b last:border-b-0"
                  >
                    <h3 className="font-semibold text-gray-900">
                      {format(parseISO(record.date), "MMMM d, yyyy")}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {record.timeSlots
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map((slot, index) => (
                          <Badges
                            key={`${record._id}-${index}`}
                            variant="secondary"
                            size="sm"
                            className="text-sm"
                          >
                            {slot.time}
                          </Badges>
                        ))}
                    </div>
                  </div>
                ))
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetAvailability;
