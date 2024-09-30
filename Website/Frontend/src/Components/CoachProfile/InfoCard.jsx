import React from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

import avatar from "../../Images/coach.jpg";

function InfoCard() {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-5 p-8">
        <Avatar className="w-full h-auto rounded-lg">
          <AvatarImage src={avatar} alt="Coach" className="object-cover" />
        </Avatar>

        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-indigo-600">Coach Name</h2>
          <p className="text-sm text-slate-500">Senior HR Assistant</p>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
          <div className="col-span-3 md:col-span-4">
            <Button asChild className="w-full" size="lg">
              <Link to="/appointment">Book a Session</Link>
            </Button>
          </div>
          <div className="col-span-1">
            <Button variant="secondary" size="icon" className="w-full h-full">
              <MessageCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default InfoCard;
