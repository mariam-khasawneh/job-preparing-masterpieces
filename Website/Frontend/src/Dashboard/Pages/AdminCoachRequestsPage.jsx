import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../Components/ui/table";
import { Eye, CheckCircle, SlidersHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../Components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../Components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../Components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Components/ui/select";
import Button from "@/Components/Button/Button";
import { useState, useEffect } from "react";
const AdminCoachRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewStatus, setReviewStatus] = useState("");
  const [comments, setComments] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/coach-request/"
      );
      setRequests(response.data.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setIsDetailsOpen(true);
  };

  const handleReview = (request) => {
    setSelectedRequest(request);
    setIsReviewOpen(true);
  };

  const sendEmail = async (to, subject, body) => {
    try {
      await axios.post("http://localhost:3000/api/send-email", {
        to,
        subject,
        body,
      });
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const submitReview = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/api/coach-request/${selectedRequest._id}/review`,
        {
          status: reviewStatus,
          comments: comments,
        }
      );

      // Send email based on the review status
      const emailSubject = `Your Coach Request has been ${reviewStatus}`;
      const emailBody = `Dear ${selectedRequest.userId.full_name},

Your coach request has been ${reviewStatus}.

${
  reviewStatus === "approved"
    ? "Congratulations! You are now a coach on our platform. Please log in to your account to set up your profile and start coaching."
    : "We appreciate your interest in becoming a coach on our platform. Unfortunately, we are unable to approve your request at this time. " +
      comments
}

Best regards,
The Coaching Team`;

      await sendEmail(selectedRequest.userId.email, emailSubject, emailBody);

      setIsReviewOpen(false);
      fetchRequests();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleFilterChange = (value) => {
    setStatusFilter(value);
  };

  const filteredRequests = requests.filter((request) =>
    statusFilter === "all" ? true : request.status === statusFilter
  );

  const StatusTag = ({ status }) => {
    let bgColor = "bg-gray-200";
    if (status === "approved") {
      bgColor = "bg-green-100 text-green-600 ";
    } else if (status === "rejected") {
      bgColor = "bg-red-100 text-red-600";
    } else if (status === "pending") {
      bgColor = "bg-yellow-100 text-yellow-600";
    }
    return (
      <span
        className={`px-2 py-1 justify-center rounded-full text-sm font-semibold ${bgColor}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Coach Requests</h1>
      <div className="mb-4 flex gap-2 items-center">
        <SlidersHorizontal />
        <Select onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[180px]" id="status-filter">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader className="bg-indigo-50">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Request Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Review</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRequests.map((request) => (
            <TableRow key={request._id}>
              <TableCell>{request.userId.full_name}</TableCell>
              <TableCell>{request.userId.email}</TableCell>
              <TableCell>
                {new Date(request.requestDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <StatusTag status={request.status} />
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Eye
                          className="cursor-pointer text-blue-500 hover:text-blue-700"
                          onClick={() => handleViewDetails(request)}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
              <TableCell>
                {request.status === "pending" && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CheckCircle
                          className="cursor-pointer text-green-500 hover:text-green-700"
                          onClick={() => handleReview(request)}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Review</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div>
              <p>
                <strong>Name:</strong> {selectedRequest.userId.full_name}
              </p>
              <p>
                <strong>Email:</strong> {selectedRequest.userId.email}
              </p>
              <p>
                <strong>Experience:</strong> {selectedRequest.experience}
              </p>
              <p>
                <strong>Educational Background:</strong>
              </p>
              <ul>
                {selectedRequest.educationalBackground.map((edu, index) => (
                  <li key={index}>
                    {edu.university} - {edu.major} ({edu.credential}) -{" "}
                    {edu.period}
                  </li>
                ))}
              </ul>
              <div className="flex gap-1">
                <a
                  href={selectedRequest.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button primary={true} extraSmall={true} className="flex">
                    {" "}
                    View CV
                  </Button>
                </a>

                <a
                  href={selectedRequest.introductoryVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button primary={true} extraSmall={true} className="flex">
                    View Video
                  </Button>
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <AlertDialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Review Request</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="mb-4">
                <label className="block mb-2">Status:</label>
                <select
                  value={reviewStatus}
                  onChange={(e) => setReviewStatus(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select status</option>
                  <option value="approved">Approve</option>
                  <option value="rejected">Reject</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Comments:</label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows="3"
                ></textarea>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={submitReview}>
              Submit Review
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminCoachRequestsPage;
