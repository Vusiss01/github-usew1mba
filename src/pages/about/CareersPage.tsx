import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search, MapPin, Code, Briefcase, Phone, Users } from "lucide-react";
import Logo from "../../components/layout/Logo";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Footer from "../../components/layout/Footer";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

const CareersPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - in a real app, this would come from an API
  const jobPostings: JobPosting[] = [
    {
      id: "1",
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "New York, NY",
      type: "Full-time",
      description: "Join our engineering team to build and scale our food delivery platform."
    },
    {
      id: "2",
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Lead product strategy and development for our consumer-facing applications."
    },
    {
      id: "3",
      title: "Customer Support Specialist",
      department: "Customer Service",
      location: "Remote",
      type: "Full-time",
      description: "Help our customers have the best possible experience with Bizibyte."
    },
    {
      id: "4",
      title: "Marketing Manager",
      department: "Marketing",
      location: "Los Angeles, CA",
      type: "Full-time",
      description: "Drive growth and brand awareness through innovative marketing campaigns."
    }
  ];

  const filteredJobs = jobPostings.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-3 p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <Logo />
            </div>
            <h1 className="text-xl font-bold">Careers</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Join Our Team
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Help us revolutionize the food delivery industry and make a
                difference in people's lives.
              </p>
              <Button
                className="bg-white text-orange-500 hover:bg-gray-100"
                onClick={() => document.getElementById("openings")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Open Positions
              </Button>
            </div>
          </div>
        </div>

        {/* Why Join Us */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Join Bizibyte?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-gray-600">
                  Work with cutting-edge technology and help shape the future of food delivery.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Great Culture</h3>
                <p className="text-gray-600">
                  Join a diverse team of passionate individuals working together to achieve big goals.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Growth</h3>
                <p className="text-gray-600">
                  Develop your skills and advance your career with our learning and development programs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Openings */}
        <div id="openings" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
              
              {/* Search */}
              <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search jobs by title, department, or location"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Job Listings */}
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                        <p className="text-gray-600">{job.department}</p>
                      </div>
                      <Button
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={() => navigate(`/careers/${job.id}`)}
                      >
                        Apply Now
                      </Button>
                    </div>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <div>•</div>
                      <div>{job.type}</div>
                    </div>
                  </div>
                ))}

                {filteredJobs.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg">
                    <p className="text-gray-500">No jobs found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Don't See the Right Fit?</h2>
              <p className="text-gray-600 mb-8">
                We're always looking for talented individuals to join our team.
                Send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <div className="flex items-center justify-center">
                <Phone className="h-5 w-5 text-orange-500 mr-2" />
                <a
                  href="mailto:careers@bizibyte.com"
                  className="text-orange-500 hover:text-orange-600"
                >
                  careers@bizibyte.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CareersPage; 