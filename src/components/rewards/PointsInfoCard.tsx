import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Gift, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface PointsInfoCardProps {
  points?: number;
  totalPointsNeeded?: number;
  availablePromotions?: {
    id: string;
    title: string;
    pointsRequired: number;
    type: "discount" | "freeItem" | "special";
  }[];
  categoryName?: string;
}

const PointsInfoCard = ({
  points = 750,
  totalPointsNeeded = 1000,
  availablePromotions = [
    {
      id: "promo1",
      title: "Free Delivery",
      pointsRequired: 500,
      type: "discount",
    },
    {
      id: "promo2",
      title: "10% Off Next Order",
      pointsRequired: 800,
      type: "discount",
    },
    {
      id: "promo3",
      title: "Free Side Dish",
      pointsRequired: 1200,
      type: "freeItem",
    },
  ],
  categoryName = "Burgers",
}: PointsInfoCardProps) => {
  const progressPercentage = Math.min(
    Math.round((points / totalPointsNeeded) * 100),
    100,
  );

  // Filter promotions that are achievable with current points
  const availableRewards = availablePromotions.filter(
    (promo) => promo.pointsRequired <= points,
  );

  return (
    <Card className="w-full max-w-[350px] bg-white shadow-md overflow-hidden border-2 border-amber-100">
      <CardHeader className="pb-2 bg-gradient-to-r from-amber-50 to-amber-100">
        <CardTitle className="text-lg flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          <span>Rewards & Points</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">
                {points} points
              </span>
              <span className="text-xs text-gray-500">
                {totalPointsNeeded} needed for next tier
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-gray-100" />
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-1">
              <Gift className="h-4 w-4 text-amber-500" />
              <span>Available Rewards for {categoryName}</span>
            </h4>

            {availableRewards.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {availableRewards.map((promo) => (
                  <Badge
                    key={promo.id}
                    className={cn(
                      "cursor-pointer",
                      promo.type === "discount"
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : promo.type === "freeItem"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                          : "bg-purple-100 text-purple-800 hover:bg-purple-200",
                    )}
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    {promo.title}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">
                Earn more points to unlock rewards!
              </p>
            )}
          </div>

          <div className="text-xs text-gray-500 pt-1">
            Earn 10 points for every $1 spent on {categoryName}!
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PointsInfoCard;
