import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Calendar, Clock, Users, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import BottomNavBar from "../layout/BottomNavBar";

const CateringRequestScreen = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    location: "",
    guestCount: "",
    budget: "",
    dietaryRestrictions: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      nutFree: false,
      dairyFree: false,
      other: false,
    },
    otherDietaryRestrictions: "",
    additionalNotes: "",
  });

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (restriction: string) => {
    setFormData((prev) => ({
      ...prev,
      dietaryRestrictions: {
        ...prev.dietaryRestrictions,
        [restriction]:
          !prev.dietaryRestrictions[
            restriction as keyof typeof prev.dietaryRestrictions
          ],
      },
    }));
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to a backend
    alert("Catering request submitted successfully!");
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-6">
          {/* Back button and title */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="mr-3 p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold">Event Catering Request</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Event Details */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Event Details</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="eventName">Event Name</Label>
                      <Input
                        id="eventName"
                        name="eventName"
                        placeholder="Corporate Lunch, Birthday Party, etc."
                        value={formData.eventName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="eventDate">Event Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="eventDate"
                            name="eventDate"
                            type="date"
                            className="pl-10"
                            value={formData.eventDate}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="eventTime">Event Time</Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="eventTime"
                            name="eventTime"
                            type="time"
                            className="pl-10"
                            value={formData.eventTime}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Event Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="location"
                          name="location"
                          placeholder="Address"
                          className="pl-10"
                          value={formData.location}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="guestCount">Number of Guests</Label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="guestCount"
                            name="guestCount"
                            type="number"
                            placeholder="50"
                            className="pl-10"
                            value={formData.guestCount}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="budget">Budget (Optional)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            $
                          </span>
                          <Input
                            id="budget"
                            name="budget"
                            type="number"
                            placeholder="1000"
                            className="pl-8"
                            value={formData.budget}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dietary Restrictions */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    Dietary Restrictions
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="vegetarian"
                        checked={formData.dietaryRestrictions.vegetarian}
                        onCheckedChange={() =>
                          handleCheckboxChange("vegetarian")
                        }
                      />
                      <Label htmlFor="vegetarian">Vegetarian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="vegan"
                        checked={formData.dietaryRestrictions.vegan}
                        onCheckedChange={() => handleCheckboxChange("vegan")}
                      />
                      <Label htmlFor="vegan">Vegan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="glutenFree"
                        checked={formData.dietaryRestrictions.glutenFree}
                        onCheckedChange={() =>
                          handleCheckboxChange("glutenFree")
                        }
                      />
                      <Label htmlFor="glutenFree">Gluten-Free</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="nutFree"
                        checked={formData.dietaryRestrictions.nutFree}
                        onCheckedChange={() => handleCheckboxChange("nutFree")}
                      />
                      <Label htmlFor="nutFree">Nut-Free</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="dairyFree"
                        checked={formData.dietaryRestrictions.dairyFree}
                        onCheckedChange={() =>
                          handleCheckboxChange("dairyFree")
                        }
                      />
                      <Label htmlFor="dairyFree">Dairy-Free</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="other"
                        checked={formData.dietaryRestrictions.other}
                        onCheckedChange={() => handleCheckboxChange("other")}
                      />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </div>

                  {formData.dietaryRestrictions.other && (
                    <div className="mt-3">
                      <Label htmlFor="otherDietaryRestrictions">
                        Please specify other dietary restrictions
                      </Label>
                      <Input
                        id="otherDietaryRestrictions"
                        name="otherDietaryRestrictions"
                        placeholder="Please specify"
                        value={formData.otherDietaryRestrictions}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                </div>

                {/* Additional Notes */}
                <div>
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    placeholder="Any special requests or additional information..."
                    rows={4}
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  Submit Catering Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Bar - Mobile Only */}
      <div className="md:hidden">
        <BottomNavBar />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CateringRequestScreen;
