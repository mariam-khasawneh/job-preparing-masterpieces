import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../Components/ui/table";
import { Button } from "../../../Components/ui/button";
import { Switch } from "../../../Components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../Components/ui/select";
import { Input } from "../../../Components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../../Components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../Components/ui/alert-dialog";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import useSendEmail from "@/Hooks/useSendEmail";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    username: "",
    fullName: "",
    email: "",
    currentStatus: false,
    comment: "",
  });

  const {
    sendEmail,
    loading: emailLoading,
    error: emailError,
    success: emailSuccess,
  } = useSendEmail();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to fetch users. Please try again.");
    }
  };

  const handleActivationToggle = async (
    username,
    fullName,
    email,
    currentStatus
  ) => {
    setConfirmDialog({
      isOpen: true,
      username,
      fullName,
      email,
      currentStatus,
      comment: "",
    });
  };

  const confirmActivationToggle = async () => {
    const { username, fullName, email, currentStatus, comment } = confirmDialog;
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/users/${username}/toggle-activation`
      );
      if (response.status === 200) {
        setUsers(
          users.map((user) =>
            user.user_name === username
              ? { ...user, isActivated: !currentStatus }
              : user
          )
        );

        // Send email
        const newStatus = !currentStatus ? "activated" : "deactivated";
        await sendEmail({
          to: email,
          subject: `Your account has been ${newStatus}`,
          body: `Dear ${fullName},\n\nYour account has been ${newStatus}. \n\nComment: ${comment}\n\nIf you have any questions, please contact our support team.\n\nBest regards,\nJob Ready Team`,
        });

        toast.success(
          `User ${fullName} has been ${newStatus} and notified via email.`
        );
      }
    } catch (error) {
      console.error("Failed to update user status:", error);
      toast.error("Failed to update user status. Please try again.");
    } finally {
      setConfirmDialog({
        isOpen: false,
        username: "",
        fullName: "",
        email: "",
        currentStatus: false,
        comment: "",
      });
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedAndFilteredUsers = users
    .filter((user) => {
      if (filter === "active") return user.isActivated;
      if (filter === "inactive") return !user.isActivated;
      return true;
    })
    .filter(
      (user) =>
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.user_name.localeCompare(b.user_name);
      } else {
        return b.user_name.localeCompare(a.user_name);
      }
    });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedAndFilteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  const totalPages = Math.ceil(sortedAndFilteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Helmet>
        <title>JobReady | Users</title>
      </Helmet>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4 items-center">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter users" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="active">Active Users</SelectItem>
                <SelectItem value="inactive">Inactive Users</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={toggleSortOrder}
                  >
                    Username
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user) => (
                <TableRow key={user.user_name}>
                  <TableCell>{user.full_name}</TableCell>
                  <TableCell>{user.user_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Switch
                      checked={user.isActivated}
                      onCheckedChange={() =>
                        handleActivationToggle(
                          user.user_name,
                          user.full_name,
                          user.email,
                          user.isActivated
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div>
            Showing {indexOfFirstUser + 1}-
            {Math.min(indexOfLastUser, sortedAndFilteredUsers.length)} of{" "}
            {sortedAndFilteredUsers.length}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>

        <AlertDialog
          open={confirmDialog.isOpen}
          onOpenChange={(isOpen) =>
            !isOpen &&
            setConfirmDialog({
              isOpen: false,
              username: "",
              fullName: "",
              email: "",
              currentStatus: false,
              comment: "",
            })
          }
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm User Status Change</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to{" "}
                {confirmDialog.currentStatus ? "deactivate" : "activate"} the
                user <strong>{confirmDialog.fullName}</strong> (
                {confirmDialog.username})? An email will be sent to notify the
                user.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <Input
              placeholder="Add a comment (optional)"
              value={confirmDialog.comment}
              onChange={(e) =>
                setConfirmDialog({ ...confirmDialog, comment: e.target.value })
              }
              className="mt-4"
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-indigo-500 hover:bg-indigo-600"
                onClick={confirmActivationToggle}
                disabled={emailLoading}
              >
                {emailLoading ? "Processing..." : "Confirm"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </>
  );
};

export default Users;
