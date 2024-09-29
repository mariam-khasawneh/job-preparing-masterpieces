import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Slider } from "@/Components/ui/slider";
import ServiceTypes from "@/Data/ServicesTypes";

const FilterComponent = ({
  searchTerm,
  setSearchTerm,
  serviceType,
  setServiceType,
  duration,
  setDuration,
  price,
  setPrice,
  sortBy,
  setSortBy,
}) => {
  return (
    // <Card className="sticky top-4 mr-4 h-screen border-none w-full">
    <Card className="w-80 border-none">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-10 ">
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
            {ServiceTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
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
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
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
  );
};

export default FilterComponent;
