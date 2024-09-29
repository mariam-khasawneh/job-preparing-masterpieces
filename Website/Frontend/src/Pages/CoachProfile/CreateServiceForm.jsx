import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import Cookies from "js-cookie";
import axios from "axios";
import { Helmet } from "react-helmet-async";
// data
import ServiceTypes from "@/Data/ServicesTypes";

const CreateServiceForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // <-- This is used to manually set form values
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found in cookies");
      }

      const response = await axios.post(
        "http://localhost:3000/api/services",
        {
          service: data.service,
          description: data.description,
          serviceType: data.serviceType,
          price: data.price,
          currency: data.currency,
          duration: data.duration,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("Service created:", response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>JobReady | Create Service</title>
      </Helmet>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Service</CardTitle>
          <CardDescription>
            Fill in the details to create a new coaching service.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Service Name & Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="service">Service Name</Label>
                <Input
                  id="service"
                  {...register("service", {
                    required: "Service name is required",
                  })}
                />
                {errors.service && (
                  <p className="text-red-500 text-sm">
                    {errors.service.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceType">Service Type</Label>
                <Select
                  onValueChange={(value) => setValue("serviceType", value)} // Manually set value
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ServiceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.serviceType && (
                  <p className="text-red-500 text-sm">
                    {errors.serviceType.message}
                  </p>
                )}
              </div>
            </div>

            {/* Service Price and Currency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  id="price"
                  {...register("price", {
                    required: "Price is required",
                    min: 0,
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  onValueChange={(value) => setValue("currency", value)} // Manually set value
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "USD",
                      "EUR",
                      "GBP",
                      "JOD",
                      "AUD",
                      "CAD",
                      "INR",
                      "JPY",
                      "CNY",
                    ].map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.currency && (
                  <p className="text-red-500 text-sm">
                    {errors.currency.message}
                  </p>
                )}
              </div>
            </div>

            {/*Service Duration*/}
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select
                onValueChange={(value) => setValue("duration", value)} // Manually set value
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30 minutes">30 minutes</SelectItem>
                  <SelectItem value="1 hour">1 hour</SelectItem>
                  <SelectItem value="90 minutes">90 minutes</SelectItem>
                  <SelectItem value="2 hours">2 hours</SelectItem>
                </SelectContent>
              </Select>
              {errors.duration && (
                <p className="text-red-500 text-sm">
                  {errors.duration.message}
                </p>
              )}
            </div>

            {/* Service Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Service"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateServiceForm;
