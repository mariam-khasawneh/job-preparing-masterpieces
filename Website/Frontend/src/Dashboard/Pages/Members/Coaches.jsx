import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "../../../Components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../Components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../Components/ui/select";
import { Switch } from "../../../Components/ui/switch";
import { Checkbox } from "../../../Components/ui/checkbox";
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
import { toast } from "react-hot-toast";
import useSendEmail from "@/Hooks/useSendEmail";
import { ArrowUpDown } from "lucide-react";

const Coaches = () => {
  const [coaches, setCoaches] = useState([]);
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoaches, setSelectedCoaches] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState("activate");
  const { sendEmail, loading } = useSendEmail();

  useEffect(() => {
    fetchCoaches();
  }, []);

  useEffect(() => {
    filterAndSortCoaches();
  }, [coaches, filter, sortOrder, searchTerm]);

  const fetchCoaches = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/coaches");
      setCoaches(response.data);
    } catch (error) {
      console.error("Error fetching coaches:", error);
      toast.error("Failed to fetch coaches");
    }
  };

  const filterAndSortCoaches = () => {
    let filtered = [...coaches];

    if (filter === "active") {
      filtered = filtered.filter((coach) => coach.isActivated);
    } else if (filter === "inactive") {
      filtered = filtered.filter((coach) => !coach.isActivated);
    }

    if (searchTerm) {
      filtered = filtered.filter((coach) =>
        coach.userId.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      const nameA = a.userId.full_name.toLowerCase();
      const nameB = b.userId.full_name.toLowerCase();
      if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
      if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredCoaches(filtered);
  };

  const handleStatusChange = (coach) => {
    setSelectedCoaches([coach._id]);
    setBulkAction(coach.isActivated ? "deactivate" : "activate");
    setIsAlertOpen(true);
  };

  const handleCheckboxChange = (coachId) => {
    setSelectedCoaches((prev) =>
      prev.includes(coachId)
        ? prev.filter((id) => id !== coachId)
        : [...prev, coachId]
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedCoaches(filteredCoaches.map((coach) => coach._id));
    } else {
      setSelectedCoaches([]);
    }
  };

  const handleBulkActionChange = (checked) => {
    if (selectedCoaches.length === 0) {
      toast.error(
        "Please select at least one coach before applying an action."
      );
      return;
    }
    setBulkAction(checked ? "activate" : "deactivate");
    setIsAlertOpen(true);
  };

  const confirmBulkAction = async () => {
    setIsAlertOpen(false);
    const toastId = toast.loading(
      `Updating ${selectedCoaches.length} coaches...`
    );

    try {
      await Promise.all(
        selectedCoaches.map((coachId) =>
          axios.patch(
            `http://localhost:3000/api/coaches/${coachId}/toggle-activation`
          )
        )
      );

      await Promise.all(
        selectedCoaches.map((coachId) => {
          const coach = coaches.find((c) => c._id === coachId);
          return sendEmail({
            to: coach.userId.email,
            subject: `Your account status has been updated`,
            body: `Dear ${
              coach.userId.full_name
            },\n\nYour account status has been changed to ${
              bulkAction === "activate" ? "active" : "inactive"
            }.\n\nBest regards,\nThe Admin Team`,
          });
        })
      );

      toast.success(
        `${selectedCoaches.length} coach(es) updated and emails sent`,
        { id: toastId }
      );
      fetchCoaches();
      setSelectedCoaches([]);
    } catch (error) {
      console.error("Error performing bulk action:", error);
      toast.error("Failed to update coaches", { id: toastId });
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Coaches Dashboard</h1>

      <div className="flex gap-4 mb-4 items-center">
        <Input
          placeholder="Search by coach name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Switch
            checked={bulkAction === "activate"}
            onCheckedChange={handleBulkActionChange}
          />
          <span>
            {bulkAction === "activate" ? "Activate" : "Deactivate"} Selected
          </span>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={
                  selectedCoaches.length === filteredCoaches.length &&
                  filteredCoaches.length > 0
                }
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>
              <div
                className="flex items-center cursor-pointer"
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCoaches.map((coach) => (
            <TableRow key={coach._id}>
              <TableCell>
                <Checkbox
                  checked={selectedCoaches.includes(coach._id)}
                  onCheckedChange={() => handleCheckboxChange(coach._id)}
                />
              </TableCell>
              <TableCell>{coach.userId.full_name}</TableCell>
              <TableCell>{coach.userId.email}</TableCell>
              <TableCell>
                <Switch
                  checked={coach.isActivated}
                  onCheckedChange={() => handleStatusChange(coach)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Action</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {bulkAction} {selectedCoaches.length}{" "}
              selected coach(es)? Emails will be sent to notify the users.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBulkAction}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Coaches;
