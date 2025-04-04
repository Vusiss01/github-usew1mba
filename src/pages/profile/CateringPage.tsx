import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CateringCompanies } from '@/components/catering/CateringCompanies';
import { CateringMenu } from '@/components/catering/CateringMenu';
import { Card } from '@/components/ui/card';

interface CateringRequest {
  eventType: string;
  guestCount: number;
  date: string;
  time: string;
  location: string;
  additionalNotes: string;
  selectedCompany: string;
  selectedItems: { [key: string]: number };
}

export default function CateringPage() {
  const navigate = useNavigate();
  const [request, setRequest] = useState<CateringRequest>({
    eventType: '',
    guestCount: 0,
    date: '',
    time: '',
    location: '',
    additionalNotes: '',
    selectedCompany: '',
    selectedItems: {}
  });

  const eventTypes = [
    'Wedding',
    'Corporate Event',
    'Birthday Party',
    'Anniversary',
    'Graduation',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the request to your backend
    console.log('Submitting request:', request);
    navigate('/profile');
  };

  const handleCompanySelect = (companyId: string) => {
    setRequest(prev => ({
      ...prev,
      selectedCompany: companyId,
      selectedItems: {} // Reset selected items when company changes
    }));
  };

  const handleUpdateItem = (itemId: string, quantity: number) => {
    if (quantity < 0) return;
    setRequest(prev => ({
      ...prev,
      selectedItems: {
        ...prev.selectedItems,
        [itemId]: quantity
      }
    }));
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Catering Request</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Event Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Event Type</label>
              <select
                className="w-full p-2 border rounded-md"
                value={request.eventType}
                onChange={(e) => setRequest({ ...request, eventType: e.target.value })}
                required
              >
                <option value="">Select Event Type</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Guests</label>
              <Input
                type="number"
                value={request.guestCount || ''}
                onChange={(e) => setRequest({ ...request, guestCount: parseInt(e.target.value) || 0 })}
                required
                min="1"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Event Date</label>
              <Input
                type="date"
                value={request.date}
                onChange={(e) => setRequest({ ...request, date: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Event Time</label>
              <Input
                type="time"
                value={request.time}
                onChange={(e) => setRequest({ ...request, time: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Event Location</label>
              <Input
                value={request.location}
                onChange={(e) => setRequest({ ...request, location: e.target.value })}
                placeholder="Enter event location"
                required
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <CateringCompanies
            selectedCompanyId={request.selectedCompany}
            onSelectCompany={handleCompanySelect}
          />
        </Card>

        {request.selectedCompany && (
          <Card className="p-6">
            <CateringMenu
              companyId={request.selectedCompany}
              selectedItems={request.selectedItems}
              onUpdateItem={handleUpdateItem}
            />
          </Card>
        )}

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Additional Notes</h2>
          <Textarea
            value={request.additionalNotes}
            onChange={(e) => setRequest({ ...request, additionalNotes: e.target.value })}
            placeholder="Any special requests or dietary requirements?"
            className="min-h-[100px]"
          />
        </Card>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/profile')}
          >
            Cancel
          </Button>
          <Button type="submit">
            Submit Request
          </Button>
        </div>
      </form>
    </div>
  );
} 