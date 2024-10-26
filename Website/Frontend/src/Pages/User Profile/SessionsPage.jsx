function SessionsPage() {
  return <div>SessionsPages</div>;
}

export default SessionsPage;

// import React, { useState } from "react";
// import { format } from "date-fns";
// import { Calendar } from "../../Components/ui/calendar";
// import { Button } from "../../Components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../../Components/ui/card";
// import { Badge } from "../../Components/ui/badge";
// import { ScrollArea } from "../../Components/ui/scroll-area";

// const timeSlots = [
//   "09:00",
//   "10:00",
//   "11:00",
//   "12:00",
//   "13:00",
//   "14:00",
//   "15:00",
//   "16:00",
//   "17:00",
// ];

// const SessionsPage = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [availability, setAvailability] = useState({});
//   const [savedRecords, setSavedRecords] = useState([]);

//   const handleDateSelect = (date) => {
//     setSelectedDate(date);
//   };

//   const handleTimeSlotToggle = (timeSlot) => {
//     const dateKey = format(selectedDate, "yyyy-MM-dd");
//     setAvailability((prev) => ({
//       ...prev,
//       [dateKey]: {
//         ...prev[dateKey],
//         [timeSlot]: !prev[dateKey]?.[timeSlot],
//       },
//     }));
//   };

//   const handleSaveAvailability = () => {
//     const dateKey = format(selectedDate, "yyyy-MM-dd");
//     const selectedSlots = Object.entries(availability[dateKey] || {})
//       .filter(([_, isSelected]) => isSelected)
//       .map(([slot]) => slot);

//     if (selectedSlots.length > 0) {
//       const newRecord = {
//         date: dateKey,
//         slots: selectedSlots,
//       };
//       setSavedRecords((prev) => [...prev, newRecord]);
//     }

//     // Clear the selection for the current date
//     setAvailability((prev) => ({
//       ...prev,
//       [dateKey]: {},
//     }));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Set Your Availability</h1>
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
//             <div className="flex flex-wrap gap-2">
//               {timeSlots.map((slot) => (
//                 <Badge
//                   key={slot}
//                   variant={
//                     availability[format(selectedDate, "yyyy-MM-dd")]?.[slot]
//                       ? "default"
//                       : "outline"
//                   }
//                   className="cursor-pointer"
//                   onClick={() => handleTimeSlotToggle(slot)}
//                 >
//                   {slot}
//                 </Badge>
//               ))}
//             </div>
//             <Button className="mt-4 w-full" onClick={handleSaveAvailability}>
//               Save Availability
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
//             {savedRecords.map((record, index) => (
//               <div key={index} className="mb-4">
//                 <h3 className="font-semibold">{record.date}</h3>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {record.slots.map((slot) => (
//                     <Badge key={slot} variant="secondary">
//                       {slot}
//                     </Badge>
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

// export default SessionsPage;
