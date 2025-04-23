import React, { useState } from "react";
import {
  PlusCircle,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Send,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface Survey {
  id: string;
  title: string;
  status: "draft" | "pending" | "completed" | "rejected";
  suppliers: string[];
  deadline: string;
  createdAt: string;
  responses: number;
  totalSuppliers: number;
}

const SurveyWorkflow = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [createSurveyOpen, setCreateSurveyOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Mock data for surveys
  const mockSurveys: Survey[] = [
    {
      id: "1",
      title: "Raw Material Quality Assessment",
      status: "pending",
      suppliers: ["Supplier A", "Supplier B", "Supplier C"],
      deadline: "2023-06-15",
      createdAt: "2023-06-01",
      responses: 1,
      totalSuppliers: 3,
    },
    {
      id: "2",
      title: "Packaging Materials Evaluation",
      status: "completed",
      suppliers: ["Supplier D", "Supplier E"],
      deadline: "2023-05-20",
      createdAt: "2023-05-05",
      responses: 2,
      totalSuppliers: 2,
    },
    {
      id: "3",
      title: "New Supplier Onboarding Survey",
      status: "draft",
      suppliers: ["Supplier F"],
      deadline: "",
      createdAt: "2023-06-10",
      responses: 0,
      totalSuppliers: 1,
    },
    {
      id: "4",
      title: "Quarterly Supplier Performance Review",
      status: "rejected",
      suppliers: ["Supplier A", "Supplier D"],
      deadline: "2023-04-30",
      createdAt: "2023-04-15",
      responses: 2,
      totalSuppliers: 2,
    },
  ];

  const getStatusBadge = (status: Survey["status"]) => {
    switch (status) {
      case "draft":
        return (
          <Badge variant="outline" className="bg-gray-100">
            Draft
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const filteredSurveys =
    activeTab === "all"
      ? mockSurveys
      : mockSurveys.filter((survey) => survey.status === activeTab);

  const resetSurveyCreation = () => {
    setCurrentStep(1);
    setCreateSurveyOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Survey Management</h1>
          <p className="text-gray-500">
            Create, assign, and review supplier surveys
          </p>
        </div>
        <Dialog open={createSurveyOpen} onOpenChange={setCreateSurveyOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <PlusCircle size={16} />
              Create New Survey
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Survey</DialogTitle>
              <DialogDescription>
                Create a new survey to send to suppliers for evaluation.
              </DialogDescription>
            </DialogHeader>

            {/* Multi-step form */}
            <div className="py-4">
              {/* Progress indicator */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">
                    Step {currentStep} of 4
                  </span>
                  <span className="text-sm text-gray-500">
                    {currentStep === 1
                      ? "Basic Info"
                      : currentStep === 2
                        ? "Select Suppliers"
                        : currentStep === 3
                          ? "Configure Questions"
                          : "Review & Send"}
                  </span>
                </div>
                <Progress value={currentStep * 25} className="h-2" />
              </div>

              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="survey-title"
                      className="text-sm font-medium"
                    >
                      Survey Title
                    </label>
                    <Input id="survey-title" placeholder="Enter survey title" />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="survey-description"
                      className="text-sm font-medium"
                    >
                      Description
                    </label>
                    <textarea
                      id="survey-description"
                      className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="Describe the purpose of this survey"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="survey-deadline"
                      className="text-sm font-medium"
                    >
                      Deadline
                    </label>
                    <div className="flex items-center gap-2">
                      <Input id="survey-deadline" type="date" />
                      <Calendar className="text-gray-400" size={20} />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Select Suppliers */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Input
                      placeholder="Search suppliers..."
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon">
                      <Search size={16} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Filter size={16} />
                    </Button>
                  </div>

                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">Select</TableHead>
                          <TableHead>Supplier Name</TableHead>
                          <TableHead>Region</TableHead>
                          <TableHead>Rating</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          "Supplier A",
                          "Supplier B",
                          "Supplier C",
                          "Supplier D",
                          "Supplier E",
                        ].map((supplier, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <input
                                type="checkbox"
                                className="rounded border-gray-300"
                              />
                            </TableCell>
                            <TableCell>{supplier}</TableCell>
                            <TableCell>
                              {
                                ["East", "West", "North", "South", "Central"][
                                  index
                                ]
                              }
                            </TableCell>
                            <TableCell>
                              {"★".repeat(Math.floor(Math.random() * 5) + 1)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-500">
                      5 suppliers available
                    </span>
                    <span className="text-sm font-medium">
                      3 suppliers selected
                    </span>
                  </div>
                </div>
              )}

              {/* Step 3: Configure Questions */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Survey Questions</h3>
                    <Button variant="outline" size="sm" className="gap-1">
                      <PlusCircle size={14} />
                      Add Question
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {[1, 2, 3].map((q, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-sm font-medium">
                              Question {index + 1}
                            </CardTitle>
                            <Select defaultValue="text">
                              <SelectTrigger className="w-[120px] h-7 text-xs">
                                <SelectValue placeholder="Type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="multiple">
                                  Multiple Choice
                                </SelectItem>
                                <SelectItem value="rating">Rating</SelectItem>
                                <SelectItem value="file">
                                  File Upload
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Input
                            placeholder={
                              index === 0
                                ? "What is the quality standard of your materials?"
                                : index === 1
                                  ? "What is your production capacity per month?"
                                  : "Do you have any certifications for your products?"
                            }
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Review & Send */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Survey Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Title
                        </h4>
                        <p>Raw Material Quality Assessment</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Description
                        </h4>
                        <p className="text-sm">
                          This survey aims to assess the quality standards of
                          raw materials provided by our suppliers.
                        </p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Deadline
                        </h4>
                        <p>June 15, 2023</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Selected Suppliers (3)
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <Badge variant="secondary">Supplier A</Badge>
                          <Badge variant="secondary">Supplier B</Badge>
                          <Badge variant="secondary">Supplier C</Badge>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Questions (3)
                        </h4>
                        <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                          <li>
                            What is the quality standard of your materials?
                          </li>
                          <li>What is your production capacity per month?</li>
                          <li>
                            Do you have any certifications for your products?
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-start gap-3">
                    <Bell
                      className="text-yellow-500 shrink-0 mt-0.5"
                      size={18}
                    />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">
                        Notification
                      </p>
                      <p className="text-sm text-yellow-700">
                        Selected suppliers will receive a notification to
                        complete this survey by the deadline.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                >
                  Back
                </Button>
              )}
              {currentStep < 4 ? (
                <Button onClick={() => setCurrentStep((prev) => prev + 1)}>
                  Continue
                </Button>
              ) : (
                <Button className="gap-2" onClick={resetSurveyCreation}>
                  <Send size={16} />
                  Send Survey
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Surveys</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Input placeholder="Search surveys..." className="w-64" />
              <Button variant="outline" size="icon">
                <Search size={16} />
              </Button>
              <Button variant="outline" size="icon">
                <Filter size={16} />
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="mt-6">
            <SurveyList
              surveys={filteredSurveys}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
          <TabsContent value="draft" className="mt-6">
            <SurveyList
              surveys={filteredSurveys}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
          <TabsContent value="pending" className="mt-6">
            <SurveyList
              surveys={filteredSurveys}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            <SurveyList
              surveys={filteredSurveys}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
          <TabsContent value="rejected" className="mt-6">
            <SurveyList
              surveys={filteredSurveys}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Survey Details Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Survey Details</h2>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Raw Material Quality Assessment</CardTitle>
                <CardDescription>Created on June 1, 2023</CardDescription>
              </div>
              <Badge
                variant="outline"
                className="bg-yellow-100 text-yellow-800"
              >
                Pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Survey Progress
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <Progress value={33} className="h-2 flex-1" />
                  <span className="text-sm font-medium">33%</span>
                </div>
                <p className="text-sm text-gray-500">
                  1 of 3 responses received
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Deadline
                </h3>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" />
                  <span>June 15, 2023</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">5 days remaining</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Suppliers
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Supplier A</Badge>
                  <Badge variant="secondary">Supplier B</Badge>
                  <Badge variant="secondary">Supplier C</Badge>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-sm font-medium mb-4">Response Status</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted On</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Supplier A</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span>Completed</span>
                      </div>
                    </TableCell>
                    <TableCell>June 5, 2023</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View Response
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Supplier B</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-yellow-500" />
                        <span>Pending</span>
                      </div>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Send Reminder
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Supplier C</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-yellow-500" />
                        <span>Pending</span>
                      </div>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Send Reminder
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline">Export Results</Button>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Bell size={16} />
                Send Reminders
              </Button>
              <Button className="gap-2">
                <CheckCircle size={16} />
                Finalize Survey
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

// Helper component for survey list
const SurveyList = ({
  surveys,
  getStatusBadge,
}: {
  surveys: Survey[];
  getStatusBadge: (status: Survey["status"]) => React.ReactNode;
}) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Survey Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Suppliers</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Responses</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {surveys.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                No surveys found
              </TableCell>
            </TableRow>
          ) : (
            surveys.map((survey) => (
              <TableRow key={survey.id}>
                <TableCell className="font-medium">{survey.title}</TableCell>
                <TableCell>{getStatusBadge(survey.status)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {survey.suppliers.map((supplier, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-gray-50"
                      >
                        {supplier}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{survey.deadline || "-"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={(survey.responses / survey.totalSuppliers) * 100}
                      className="h-2 w-16"
                    />
                    <span className="text-sm">
                      {survey.responses}/{survey.totalSuppliers}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    {survey.status === "pending" && (
                      <Button variant="outline" size="sm">
                        <Bell size={14} className="mr-1" />
                        Remind
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SurveyWorkflow;
