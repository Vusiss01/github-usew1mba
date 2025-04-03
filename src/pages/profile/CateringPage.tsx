import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useNavigate } from 'react-router-dom';

interface CateringRequest {
  eventType: string;
  guestCount: string;
  date: string;
  time: string;
  location: string;
  additionalNotes: string;
}

export default function CateringPage() {
  const navigate = useNavigate();
  const [request, setRequest] = useState<CateringRequest>({
    eventType: '',
    guestCount: '',
    date: '',
    time: '',
    location: '',
    additionalNotes: ''
  });

  const eventTypes = [
    'Corporate Event',
    'Wedding',
    'Birthday Party',
    'Conference',
    'Social Gathering',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit catering request to backend
    navigate('/profile');
  };

  const handleInputChange = (field: keyof CateringRequest, value: string) => {
    setRequest(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="ml-1">Back to Profile</span>
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h1 className="mb-6 text-2xl font-semibold text-gray-900">Catering Request</h1>
          <p className="mb-6 text-gray-600">
            Fill out the form below to request catering services for your event.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Event Type</label>
              <select
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={request.eventType}
                onChange={(e) => handleInputChange('eventType', e.target.value)}
                required
              >
                <option value="">Select Event Type</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Number of Guests</label>
              <Input
                type="number"
                placeholder="Enter number of guests"
                value={request.guestCount}
                onChange={(e) => handleInputChange('guestCount', e.target.value)}
                required
                min="1"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Event Date</label>
                <Input
                  type="date"
                  value={request.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Event Time</label>
                <Input
                  type="time"
                  value={request.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Event Location</label>
              <Input
                placeholder="Enter event location"
                value={request.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Additional Notes</label>
              <textarea
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                rows={4}
                placeholder="Any dietary restrictions, special requirements, or preferences"
                value={request.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/profile')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 text-white hover:bg-orange-600"
              >
                Submit Request
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 