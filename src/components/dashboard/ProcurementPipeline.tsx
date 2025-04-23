import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  MapPin,
  Package,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock3,
} from "lucide-react";

interface ProcurementItem {
  id: string;
  title: string;
  supplier: {
    name: string;
    avatar: string;
    rating: number;
  };
  category: string;
  region: string;
  status:
    | "registration"
    | "survey"
    | "negotiation"
    | "purchase_order"
    | "delivery"
    | "warehouse"
    | "payment"
    | "completed";
  progress: number;
  date: string;
  amount: string;
  priority: "low" | "medium" | "high";
}

const ProcurementPipeline = () => {
  const [filter, setFilter] = useState({
    region: "all",
    supplier: "",
    category: "all",
    search: "",
  });

  // Mock data for the pipeline
  const mockProcurementItems: ProcurementItem[] = [
    {
      id: "1",
      title: "Raw Material A-123",
      supplier: {
        name: "Supplier Co. Ltd",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=supplier1",
        rating: 4.5,
      },
      category: "Raw Materials",
      region: "East Java",
      status: "registration",
      progress: 10,
      date: "2023-06-15",
      amount: "$5,000",
      priority: "high",
    },
    {
      id: "2",
      title: "Packaging Materials B-456",
      supplier: {
        name: "Package Solutions",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=supplier2",
        rating: 4.2,
      },
      category: "Packaging",
      region: "West Java",
      status: "survey",
      progress: 25,
      date: "2023-06-18",
      amount: "$3,200",
      priority: "medium",
    },
    {
      id: "3",
      title: "Chemical Compound C-789",
      supplier: {
        name: "ChemTech Industries",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=supplier3",
        rating: 4.8,
      },
      category: "Chemicals",
      region: "Central Java",
      status: "negotiation",
      progress: 45,
      date: "2023-06-20",
      amount: "$7,500",
      priority: "high",
    },
    {
      id: "4",
      title: "Electronic Components D-012",
      supplier: {
        name: "ElectroParts Inc.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=supplier4",
        rating: 3.9,
      },
      category: "Electronics",
      region: "Jakarta",
      status: "purchase_order",
      progress: 60,
      date: "2023-06-22",
      amount: "$12,000",
      priority: "medium",
    },
    {
      id: "5",
      title: "Textile Materials E-345",
      supplier: {
        name: "Textile World",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=supplier5",
        rating: 4.1,
      },
      category: "Textiles",
      region: "Bali",
      status: "delivery",
      progress: 75,
      date: "2023-06-25",
      amount: "$8,300",
      priority: "low",
    },
    {
      id: "6",
      title: "Food Ingredients F-678",
      supplier: {
        name: "Food Suppliers Co.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=supplier6",
        rating: 4.7,
      },
      category: "Food",
      region: "North Sumatra",
      status: "warehouse",
      progress: 85,
      date: "2023-06-28",
      amount: "$4,500",
      priority: "high",
    },
    {
      id: "7",
      title: "Metal Components G-901",
      supplier: {
        name: "Metal Works Ltd.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=supplier7",
        rating: 4.3,
      },
      category: "Metals",
      region: "East Java",
      status: "payment",
      progress: 95,
      date: "2023-06-30",
      amount: "$9,200",
      priority: "medium",
    },
    {
      id: "8",
      title: "Plastic Materials H-234",
      supplier: {
        name: "Plastic Solutions",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=supplier8",
        rating: 4.0,
      },
      category: "Plastics",
      region: "West Java",
      status: "completed",
      progress: 100,
      date: "2023-07-02",
      amount: "$6,800",
      priority: "low",
    },
  ];

  // Filter the procurement items based on the filter state
  const filteredItems = mockProcurementItems.filter((item) => {
    return (
      (filter.region === "all" || item.region === filter.region) &&
      (filter.supplier === "" ||
        item.supplier.name.includes(filter.supplier)) &&
      (filter.category === "all" || item.category === filter.category) &&
      (filter.search === "" ||
        item.title.toLowerCase().includes(filter.search.toLowerCase()) ||
        item.supplier.name.toLowerCase().includes(filter.search.toLowerCase()))
    );
  });

  // Group items by status for pipeline view
  const groupedItems: Record<string, ProcurementItem[]> = {
    registration: [],
    survey: [],
    negotiation: [],
    purchase_order: [],
    delivery: [],
    warehouse: [],
    payment: [],
    completed: [],
  };

  filteredItems.forEach((item) => {
    groupedItems[item.status].push(item);
  });

  // Helper function to get status display name
  const getStatusDisplayName = (status: string): string => {
    const statusMap: Record<string, string> = {
      registration: "Registration",
      survey: "Survey",
      negotiation: "Negotiation",
      purchase_order: "Purchase Order",
      delivery: "Delivery",
      warehouse: "Warehouse",
      payment: "Payment",
      completed: "Completed",
    };
    return statusMap[status] || status;
  };

  // Helper function to get status badge color
  const getStatusBadgeVariant = (
    status: string,
  ): "default" | "secondary" | "destructive" | "outline" => {
    const statusMap: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      registration: "outline",
      survey: "outline",
      negotiation: "secondary",
      purchase_order: "secondary",
      delivery: "secondary",
      warehouse: "secondary",
      payment: "default",
      completed: "default",
    };
    return statusMap[status] || "outline";
  };

  // Helper function to get priority badge color
  const getPriorityBadgeVariant = (
    priority: string,
  ): "default" | "secondary" | "destructive" | "outline" => {
    const priorityMap: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      low: "outline",
      medium: "secondary",
      high: "destructive",
    };
    return priorityMap[priority] || "outline";
  };

  // Helper function to get action button based on status
  const getActionButton = (item: ProcurementItem) => {
    switch (item.status) {
      case "registration":
        return <Button size="sm">Assign Surveyor</Button>;
      case "survey":
        return <Button size="sm">View Survey</Button>;
      case "negotiation":
        return <Button size="sm">Negotiate Price</Button>;
      case "purchase_order":
        return <Button size="sm">View PO</Button>;
      case "delivery":
        return <Button size="sm">Track Delivery</Button>;
      case "warehouse":
        return <Button size="sm">Confirm Receipt</Button>;
      case "payment":
        return <Button size="sm">Process Payment</Button>;
      case "completed":
        return (
          <Button size="sm" variant="outline">
            View Details
          </Button>
        );
      default:
        return <Button size="sm">View Details</Button>;
    }
  };

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "registration":
        return <Package className="h-4 w-4" />;
      case "survey":
        return <Search className="h-4 w-4" />;
      case "negotiation":
        return <Clock className="h-4 w-4" />;
      case "purchase_order":
        return <Package className="h-4 w-4" />;
      case "delivery":
        return <ArrowRight className="h-4 w-4" />;
      case "warehouse":
        return <Package className="h-4 w-4" />;
      case "payment":
        return <Clock3 className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-background p-6 rounded-lg">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Procurement Pipeline
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
            <Button size="sm">
              <Package className="h-4 w-4 mr-2" />
              New Procurement
            </Button>
          </div>
        </div>

        {/* Filter section */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or supplier..."
                  className="pl-8"
                  value={filter.search}
                  onChange={(e) =>
                    setFilter({ ...filter, search: e.target.value })
                  }
                />
              </div>

              <Select
                value={filter.region}
                onValueChange={(value) =>
                  setFilter({ ...filter, region: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="East Java">East Java</SelectItem>
                  <SelectItem value="West Java">West Java</SelectItem>
                  <SelectItem value="Central Java">Central Java</SelectItem>
                  <SelectItem value="Jakarta">Jakarta</SelectItem>
                  <SelectItem value="Bali">Bali</SelectItem>
                  <SelectItem value="North Sumatra">North Sumatra</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filter.category}
                onValueChange={(value) =>
                  setFilter({ ...filter, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                  <SelectItem value="Packaging">Packaging</SelectItem>
                  <SelectItem value="Chemicals">Chemicals</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Textiles">Textiles</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Metals">Metals</SelectItem>
                  <SelectItem value="Plastics">Plastics</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() =>
                  setFilter({
                    region: "all",
                    supplier: "",
                    category: "all",
                    search: "",
                  })
                }
              >
                Reset Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pipeline view */}
        <Tabs defaultValue="pipeline" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="pipeline">Pipeline View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Object.entries(groupedItems).map(([status, items]) => (
                <Card key={status} className="overflow-hidden">
                  <CardHeader className="bg-muted/50 p-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-medium flex items-center">
                        {getStatusIcon(status)}
                        <span className="ml-2">
                          {getStatusDisplayName(status)}
                        </span>
                      </CardTitle>
                      <Badge variant={getStatusBadgeVariant(status)}>
                        {items.length}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex flex-col divide-y">
                      {items.length > 0 ? (
                        items.map((item) => (
                          <div
                            key={item.id}
                            className="p-4 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-sm">
                                {item.title}
                              </h3>
                              <Badge
                                variant={getPriorityBadgeVariant(item.priority)}
                              >
                                {item.priority}
                              </Badge>
                            </div>

                            <div className="flex items-center mb-2">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage
                                  src={item.supplier.avatar}
                                  alt={item.supplier.name}
                                />
                                <AvatarFallback>
                                  {item.supplier.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-muted-foreground">
                                {item.supplier.name}
                              </span>
                            </div>

                            <div className="flex items-center text-xs text-muted-foreground mb-2">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{item.region}</span>
                              <Separator
                                orientation="vertical"
                                className="mx-2 h-3"
                              />
                              <Package className="h-3 w-3 mr-1" />
                              <span>{item.category}</span>
                            </div>

                            <div className="flex items-center text-xs text-muted-foreground mb-3">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{item.date}</span>
                              <Separator
                                orientation="vertical"
                                className="mx-2 h-3"
                              />
                              <span>{item.amount}</span>
                            </div>

                            <Progress
                              value={item.progress}
                              className="h-1 mb-3"
                            />

                            <div className="flex justify-end">
                              {getActionButton(item)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-muted-foreground">
                          No items in this stage
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 text-sm font-medium">
                    <div className="col-span-3">Title</div>
                    <div className="col-span-2">Supplier</div>
                    <div className="col-span-1">Region</div>
                    <div className="col-span-1">Category</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-1">Priority</div>
                    <div className="col-span-1">Date</div>
                    <div className="col-span-1">Amount</div>
                    <div className="col-span-1">Action</div>
                  </div>

                  <div className="divide-y">
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <div
                          key={item.id}
                          className="grid grid-cols-12 gap-4 p-4 items-center text-sm hover:bg-muted/50 transition-colors"
                        >
                          <div className="col-span-3 font-medium">
                            {item.title}
                          </div>
                          <div className="col-span-2 flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage
                                src={item.supplier.avatar}
                                alt={item.supplier.name}
                              />
                              <AvatarFallback>
                                {item.supplier.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{item.supplier.name}</span>
                          </div>
                          <div className="col-span-1">{item.region}</div>
                          <div className="col-span-1">{item.category}</div>
                          <div className="col-span-1">
                            <Badge variant={getStatusBadgeVariant(item.status)}>
                              {getStatusDisplayName(item.status)}
                            </Badge>
                          </div>
                          <div className="col-span-1">
                            <Badge
                              variant={getPriorityBadgeVariant(item.priority)}
                            >
                              {item.priority}
                            </Badge>
                          </div>
                          <div className="col-span-1">{item.date}</div>
                          <div className="col-span-1">{item.amount}</div>
                          <div className="col-span-1">
                            {getActionButton(item)}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        No procurement items found matching your filters
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProcurementPipeline;
