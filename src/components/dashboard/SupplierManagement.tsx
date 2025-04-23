import React, { useState } from "react";
import {
  Search,
  Filter,
  Star,
  MessageSquare,
  Edit,
  MoreHorizontal,
  ChevronDown,
  Award,
  Package,
  History,
  Phone,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Supplier {
  id: string;
  name: string;
  location: string;
  rating: number;
  loyaltyPoints: number;
  status: "active" | "inactive" | "pending";
  categories: string[];
  lastOrder: string;
  avatar: string;
}

const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "PT Maju Bersama",
    location: "Jakarta",
    rating: 4.8,
    loyaltyPoints: 1250,
    status: "active",
    categories: ["Electronics", "Hardware"],
    lastOrder: "2023-05-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PT-Maju",
  },
  {
    id: "2",
    name: "CV Sejahtera",
    location: "Surabaya",
    rating: 4.2,
    loyaltyPoints: 850,
    status: "active",
    categories: ["Raw Materials", "Chemicals"],
    lastOrder: "2023-06-02",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CV-Sejahtera",
  },
  {
    id: "3",
    name: "UD Makmur",
    location: "Bandung",
    rating: 3.9,
    loyaltyPoints: 620,
    status: "inactive",
    categories: ["Packaging", "Paper Products"],
    lastOrder: "2023-04-28",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=UD-Makmur",
  },
  {
    id: "4",
    name: "PT Sentosa Jaya",
    location: "Medan",
    rating: 4.5,
    loyaltyPoints: 980,
    status: "active",
    categories: ["Textiles", "Fabrics"],
    lastOrder: "2023-05-30",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PT-Sentosa",
  },
  {
    id: "5",
    name: "CV Berkah",
    location: "Semarang",
    rating: 4.0,
    loyaltyPoints: 720,
    status: "pending",
    categories: ["Food Products", "Spices"],
    lastOrder: "2023-06-10",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CV-Berkah",
  },
];

const mockProducts = [
  {
    id: "1",
    name: "Microchip XR-500",
    category: "Electronics",
    price: 125.0,
    stock: 350,
  },
  {
    id: "2",
    name: "Circuit Board A-200",
    category: "Electronics",
    price: 89.5,
    stock: 120,
  },
  {
    id: "3",
    name: "Metal Frame 30x40",
    category: "Hardware",
    price: 45.75,
    stock: 200,
  },
  {
    id: "4",
    name: "Connector Pins (100 pcs)",
    category: "Hardware",
    price: 12.99,
    stock: 500,
  },
];

const mockTransactions = [
  {
    id: "TX-001",
    date: "2023-05-15",
    amount: 12500.0,
    status: "completed",
    poNumber: "PO-2023-0542",
  },
  {
    id: "TX-002",
    date: "2023-04-22",
    amount: 8750.5,
    status: "completed",
    poNumber: "PO-2023-0498",
  },
  {
    id: "TX-003",
    date: "2023-03-10",
    amount: 15200.25,
    status: "completed",
    poNumber: "PO-2023-0412",
  },
  {
    id: "TX-004",
    date: "2023-02-28",
    amount: 6300.0,
    status: "completed",
    poNumber: "PO-2023-0387",
  },
];

const mockMessages = [
  {
    id: "1",
    date: "2023-06-10",
    subject: "Price negotiation for Circuit Boards",
    preview: "We would like to discuss the possibility of...",
  },
  {
    id: "2",
    date: "2023-05-28",
    subject: "Delivery schedule update",
    preview: "Regarding our last order, we need to adjust...",
  },
  {
    id: "3",
    date: "2023-05-15",
    subject: "New product inquiry",
    preview: "We are interested in your new line of...",
  },
];

const SupplierManagement = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isNegotiationDialogOpen, setIsNegotiationDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

  const filteredSuppliers = mockSuppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" ||
      supplier.categories.some(
        (cat) => cat.toLowerCase() === filterCategory.toLowerCase(),
      );
    const matchesStatus =
      filterStatus === "all" || supplier.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSupplierSelect = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ));
  };

  return (
    <div className="bg-background p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Supplier Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Supplier
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add New Supplier</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new supplier to your network.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier-name">Supplier Name *</Label>
                  <Input id="supplier-name" placeholder="Enter supplier name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input id="location" placeholder="Enter location" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-person">Contact Person *</Label>
                  <Input
                    id="contact-person"
                    placeholder="Enter contact person name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categories">Categories *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="hardware">Hardware</SelectItem>
                      <SelectItem value="raw-materials">
                        Raw Materials
                      </SelectItem>
                      <SelectItem value="chemicals">Chemicals</SelectItem>
                      <SelectItem value="packaging">Packaging</SelectItem>
                      <SelectItem value="textiles">Textiles</SelectItem>
                      <SelectItem value="food-products">
                        Food Products
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select defaultValue="active">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Enter any additional notes"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Add Supplier</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {!selectedSupplier ? (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search suppliers..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Hardware">Hardware</SelectItem>
                  <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                  <SelectItem value="Chemicals">Chemicals</SelectItem>
                  <SelectItem value="Packaging">Packaging</SelectItem>
                  <SelectItem value="Textiles">Textiles</SelectItem>
                  <SelectItem value="Food Products">Food Products</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Suppliers</CardTitle>
              <CardDescription>
                Manage your suppliers and their details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Loyalty Points</TableHead>
                    <TableHead>Categories</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage
                              src={supplier.avatar}
                              alt={supplier.name}
                            />
                            <AvatarFallback>
                              {supplier.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{supplier.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{supplier.location}</TableCell>
                      <TableCell>
                        <div className="flex">
                          {renderStars(supplier.rating)}
                          <span className="ml-1 text-sm">
                            {supplier.rating.toFixed(1)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-amber-500" />
                          <span>{supplier.loyaltyPoints}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {supplier.categories.map((category) => (
                            <Badge key={category} variant="outline">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            supplier.status === "active"
                              ? "default"
                              : supplier.status === "inactive"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {supplier.status.charAt(0).toUpperCase() +
                            supplier.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(supplier.lastOrder).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSupplierSelect(supplier)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => setSelectedSupplier(null)}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to List
            </Button>
            <div className="flex gap-2">
              <Dialog
                open={isNegotiationDialogOpen}
                onOpenChange={setIsNegotiationDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" /> Negotiate Price
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Price Negotiation</DialogTitle>
                    <DialogDescription>
                      Start a price negotiation with {selectedSupplier.name}.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Select Product
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockProducts.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name} - ${product.price.toFixed(2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Current Price
                      </label>
                      <Input value="$125.00" disabled />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Proposed Price
                      </label>
                      <Input placeholder="Enter your proposed price" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Quantity
                      </label>
                      <Input type="number" placeholder="Enter quantity" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Message
                      </label>
                      <Textarea placeholder="Explain your negotiation terms..." />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsNegotiationDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => setIsNegotiationDialogOpen(false)}>
                      Send Proposal
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog
                open={isMessageDialogOpen}
                onOpenChange={setIsMessageDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <MessageSquare className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send Message</DialogTitle>
                    <DialogDescription>
                      Send a message to {selectedSupplier.name}.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Subject
                      </label>
                      <Input placeholder="Enter message subject" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Message
                      </label>
                      <Textarea
                        placeholder="Type your message here..."
                        className="min-h-[150px]"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsMessageDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => setIsMessageDialogOpen(false)}>
                      Send Message
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <Card className="md:w-1/3">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedSupplier.name}</CardTitle>
                    <CardDescription>
                      {selectedSupplier.location}
                    </CardDescription>
                  </div>
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={selectedSupplier.avatar}
                      alt={selectedSupplier.name}
                    />
                    <AvatarFallback>
                      {selectedSupplier.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Rating</span>
                    <span className="text-sm">
                      {selectedSupplier.rating.toFixed(1)}/5.0
                    </span>
                  </div>
                  <div className="flex">
                    {renderStars(selectedSupplier.rating)}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Loyalty Program</span>
                    <span className="text-sm">
                      {selectedSupplier.loyaltyPoints} points
                    </span>
                  </div>
                  <Progress
                    value={selectedSupplier.loyaltyPoints / 20}
                    className="h-2"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      Bronze
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Silver
                    </span>
                    <span className="text-xs text-muted-foreground">Gold</span>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">
                    Contact Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        contact@
                        {selectedSupplier.name
                          .toLowerCase()
                          .replace(/\s+/g, "")}
                        .com
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">+62 812 3456 7890</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Jl. Industri No. 123, {selectedSupplier.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedSupplier.categories.map((category) => (
                      <Badge key={category} variant="outline">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Edit className="mr-2 h-4 w-4" /> Edit Supplier
                </Button>
              </CardFooter>
            </Card>

            <div className="flex-1">
              <Tabs defaultValue="products">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="products">
                    <Package className="mr-2 h-4 w-4" /> Products
                  </TabsTrigger>
                  <TabsTrigger value="transactions">
                    <History className="mr-2 h-4 w-4" /> Transactions
                  </TabsTrigger>
                  <TabsTrigger value="loyalty">
                    <Award className="mr-2 h-4 w-4" /> Loyalty Program
                  </TabsTrigger>
                  <TabsTrigger value="communication">
                    <MessageSquare className="mr-2 h-4 w-4" /> Communication
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="products" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Catalog</CardTitle>
                      <CardDescription>
                        Products offered by {selectedSupplier.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockProducts.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">
                                {product.name}
                              </TableCell>
                              <TableCell>{product.category}</TableCell>
                              <TableCell>${product.price.toFixed(2)}</TableCell>
                              <TableCell>{product.stock}</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm">
                                  Order
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="transactions" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Transaction History</CardTitle>
                      <CardDescription>
                        Past orders and payments with {selectedSupplier.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>PO Number</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockTransactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell className="font-medium">
                                {transaction.id}
                              </TableCell>
                              <TableCell>
                                {new Date(
                                  transaction.date,
                                ).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                ${transaction.amount.toFixed(2)}
                              </TableCell>
                              <TableCell>{transaction.poNumber}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="capitalize">
                                  {transaction.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="loyalty" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Loyalty Program</CardTitle>
                      <CardDescription>
                        Manage loyalty points and rewards
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Current Status</h3>
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-amber-500" />
                          <span className="text-xl font-bold">
                            {selectedSupplier.loyaltyPoints}
                          </span>
                          <span>points</span>
                        </div>

                        <div className="mt-4">
                          <div className="flex justify-between mb-1">
                            <span>Progress to next tier</span>
                            <span>65%</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <Card className="border-2 border-muted">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Bronze</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              0-1000 points
                            </p>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Standard delivery</li>
                              <li>• Basic support</li>
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className="border-2 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Silver</CardTitle>
                            <Badge>Current</Badge>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              1000-2000 points
                            </p>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Priority delivery</li>
                              <li>• 24/7 support</li>
                              <li>• 5% discount</li>
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className="border-2 border-muted">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Gold</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              2000+ points
                            </p>
                            <ul className="text-sm mt-2 space-y-1">
                              <li>• Express delivery</li>
                              <li>• Dedicated account manager</li>
                              <li>• 10% discount</li>
                              <li>• Early access to RFQs</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="pt-4">
                        <h3 className="text-lg font-medium mb-4">
                          Award Points
                        </h3>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <Input
                              type="number"
                              placeholder="Enter points to award"
                            />
                          </div>
                          <Button>
                            <Award className="mr-2 h-4 w-4" /> Award Points
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="communication" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Communication Center</CardTitle>
                      <CardDescription>
                        Message history and negotiations with{" "}
                        {selectedSupplier.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Recent Messages</h3>
                        {mockMessages.map((message) => (
                          <Card
                            key={message.id}
                            className="cursor-pointer hover:bg-accent/50"
                          >
                            <CardHeader className="p-4">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-base">
                                  {message.subject}
                                </CardTitle>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(message.date).toLocaleDateString()}
                                </span>
                              </div>
                              <CardDescription className="mt-1">
                                {message.preview}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        ))}

                        <div className="pt-4">
                          <h3 className="text-lg font-medium mb-4">
                            Quick Actions
                          </h3>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setIsMessageDialogOpen(true)}
                            >
                              <MessageSquare className="mr-2 h-4 w-4" /> New
                              Message
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setIsNegotiationDialogOpen(true)}
                            >
                              <MessageSquare className="mr-2 h-4 w-4" /> Start
                              Negotiation
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierManagement;

// Missing imports that need to be added
const ChevronLeft = ({
  className,
  ...props
}: React.ComponentProps<typeof Search>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const Mail = ({ className, ...props }: React.ComponentProps<typeof Search>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const MapPin = ({
  className,
  ...props
}: React.ComponentProps<typeof Search>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const Plus = ({ className, ...props }: React.ComponentProps<typeof Search>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);
