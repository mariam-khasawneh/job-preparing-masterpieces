import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Slider } from "@/Components/ui/slider";
import { Grid, List, User, Clock, Tag, DollarSign } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Section } from "@/Components/styles-components/containers";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [duration, setDuration] = useState([0, 180]);
  const [price, setPrice] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/services");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const filteredAndSortedServices = useMemo(() => {
    let result = services.filter((service) => {
      const coachName = service.coachId.userId.full_name.toLowerCase();
      const serviceTypeMatch =
        serviceType === "" ||
        serviceType === "all" ||
        service.serviceType === serviceType;
      const durationMatch =
        parseInt(service.duration) >= duration[0] &&
        parseInt(service.duration) <= duration[1];
      const priceMatch = service.price >= price[0] && service.price <= price[1];

      return (
        coachName.includes(searchTerm.toLowerCase()) &&
        serviceTypeMatch &&
        durationMatch &&
        priceMatch
      );
    });

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "duration-asc":
        result.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      case "duration-desc":
        result.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
        break;
      default:
        // Keep original order
        break;
    }

    return result;
  }, [services, searchTerm, serviceType, duration, price, sortBy]);

  const ServiceCard = ({ service }) => (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <h3 className="text-lg font-semibold">{service.service}</h3>
        <p className="text-sm text-gray-500">{service.description}</p>
      </CardHeader>
      <CardContent className="flex-grow text-slate-600">
        <div className="space-y-2">
          <div className="flex items-center">
            <User className="w-5 h-5 mr-2 text-indigo-500" />
            <span>{service.coachId.userId.full_name}</span>
          </div>
          <div className="flex items-center">
            <Tag className="w-5 h-5 mr-2 text-indigo-500" />
            <span>{service.serviceType}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-indigo-500" />
            <span>
              {service.price} {service.currency}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-indigo-500" />
            <span>{service.duration}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );

  return (
    <Section>
      <Helmet>
        <title>JobReady | Services</title>
      </Helmet>
      <div>
        <div>
          <div className="container mx-auto p-4 min-h-screen grid grid-cols-4">
            {/* Left sidebar for filters */}
            <Card className="sticky top-4  mr-4 h-screen border-none w-full">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-10 w-full">
                <Input
                  type="text"
                  placeholder="Search by coach name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <Select onValueChange={setServiceType} value={serviceType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Interview Preparation">
                      Interview Preparation
                    </SelectItem>
                    <SelectItem value="Resume Review">Resume Review</SelectItem>
                  </SelectContent>
                </Select>

                <div>
                  <p>
                    Duration (minutes): {duration[0]} - {duration[1]}
                  </p>
                  <Slider
                    min={0}
                    max={180}
                    step={15}
                    value={duration}
                    onValueChange={setDuration}
                    className="w-full"
                  />
                </div>

                <div>
                  <p>
                    Price: {price[0]} - {price[1]}
                  </p>
                  <Slider
                    min={0}
                    max={100}
                    step={10}
                    value={price}
                    onValueChange={setPrice}
                  />
                </div>

                <Select onValueChange={setSortBy} value={sortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="duration-asc">
                      Duration: Short to Long
                    </SelectItem>
                    <SelectItem value="duration-desc">
                      Duration: Long to Short
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Right side for services display */}
            <div className=" col-span-3">
              <div
                className={
                  isGridView
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-4"
                }
              >
                {filteredAndSortedServices.map((service) => (
                  <ServiceCard key={service._id} service={service} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ServicesPage;
