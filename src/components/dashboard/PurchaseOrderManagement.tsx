import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Plus,
  FileText,
  Truck,
  Package,
  DollarSign,
  Filter,
  Calendar,
  ArrowUpDown,
} from "lucide-react";

interface PurchaseOrder {
  id: string;
  supplierName: string;
  orderDate: string;
  deliveryDate: string;
  status:
    | "draft"
    | "pending_approval"
    | "approved"
    | "sent"
    | "in_transit"
    | "delivered"
    | "confirmed"
    | "paid";
  total: number;
  items: number;
  region: string;
}

const PurchaseOrderManagement = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  // Mock data for purchase orders
  const purchaseOrders: PurchaseOrder[] = [
    {
      id: "PO-2023-001",
      supplierName: "Acme Supplies",
      orderDate: "2023-05-15",
      deliveryDate: "2023-05-30",
      status: "approved",
      total: 12500.0,
      items: 5,
      region: "North",
    },
    {
      id: "PO-2023-002",
      supplierName: "Global Materials",
      orderDate: "2023-05-18",
      deliveryDate: "2023-06-02",
      status: "in_transit",
      total: 8750.5,
      items: 3,
      region: "South",
    },
    {
      id: "PO-2023-003",
      supplierName: "Quality Products",
      orderDate: "2023-05-20",
      deliveryDate: "2023-06-05",
      status: "sent",
      total: 15200.75,
      items: 7,
      region: "East",
    },
    {
      id: "PO-2023-004",
      supplierName: "Prime Distributors",
      orderDate: "2023-05-22",
      deliveryDate: "2023-06-10",
      status: "pending_approval",
      total: 6300.25,
      items: 4,
      region: "West",
    },
    {
      id: "PO-2023-005",
      supplierName: "Superior Goods",
      orderDate: "2023-05-25",
      deliveryDate: "2023-06-15",
      status: "draft",
      total: 9800.0,
      items: 6,
      region: "Central",
    },
    {
      id: "PO-2023-006",
      supplierName: "Reliable Vendors",
      orderDate: "2023-05-28",
      deliveryDate: "2023-06-20",
      status: "delivered",
      total: 11250.5,
      items: 5,
      region: "North",
    },
    {
      id: "PO-2023-007",
      supplierName: "Best Suppliers",
      orderDate: "2023-06-01",
      deliveryDate: "2023-06-25",
      status: "confirmed",
      total: 7500.25,
      items: 3,
      region: "South",
    },
    {
      id: "PO-2023-008",
      supplierName: "Premium Materials",
      orderDate: "2023-06-05",
      deliveryDate: "2023-06-30",
      status: "paid",
      total: 18200.0,
      items: 8,
      region: "East",
    },
  ];

  // Filter purchase orders based on active tab
  const filteredOrders =
    activeTab === "all"
      ? purchaseOrders
      : purchaseOrders.filter((order) => {
          if (activeTab === "draft") return order.status === "draft";
          if (activeTab === "pending")
            return order.status === "pending_approval";
          if (activeTab === "approved")
            return ["approved", "sent", "in_transit"].includes(order.status);
          if (activeTab === "delivered")
            return ["delivered", "confirmed"].includes(order.status);
          if (activeTab === "completed") return order.status === "paid";
          return true;
        });

  // Function to get status badge color
  const getStatusBadge = (status: PurchaseOrder["status"]) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "pending_approval":
        return <Badge variant="secondary">Pending Approval</Badge>;
      case "approved":
        return <Badge className="bg-blue-500">Approved</Badge>;
      case "sent":
        return <Badge className="bg-indigo-500">Sent to Supplier</Badge>;
      case "in_transit":
        return <Badge className="bg-amber-500">In Transit</Badge>;
      case "delivered":
        return <Badge className="bg-orange-500">Delivered</Badge>;
      case "confirmed":
        return <Badge className="bg-emerald-500">Warehouse Confirmed</Badge>;
      case "paid":
        return <Badge className="bg-green-500">Payment Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Function to get progress percentage based on status
  const getProgressPercentage = (status: PurchaseOrder["status"]) => {
    const statusValues: Record<PurchaseOrder["status"], number> = {
      draft: 10,
      pending_approval: 25,
      approved: 40,
      sent: 55,
      in_transit: 70,
      delivered: 80,
      confirmed: 90,
      paid: 100,
    };
    return statusValues[status] || 0;
  };

  return (
    <div className="bg-background p-6 rounded-lg w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Purchase Order Management
          </h1>
          <p className="text-muted-foreground">
            Create, track, and manage purchase orders from approval to payment
          </p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-8 w-[250px] bg-background"
            />
          </div>
          <Button variant="outline" onClick={() => setFilterDialogOpen(true)}>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Order
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-6 w-full max-w-3xl mb-6">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">In Progress</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Purchase Orders</CardTitle>
              <CardDescription>
                Showing {filteredOrders.length} purchase orders across all
                statuses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">
                      <div className="flex items-center">
                        PO Number
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Supplier
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-center">Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.supplierName}</TableCell>
                      <TableCell>{order.region}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{order.deliveryDate}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        ${order.total.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Purchase Order Details</DialogTitle>
                              <DialogDescription>
                                Purchase Order {order.id} for{" "}
                                {order.supplierName}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6 py-4">
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                      Purchase Order Info
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="text-sm">PO Number:</div>
                                      <div className="text-sm font-medium">
                                        {order.id}
                                      </div>
                                      <div className="text-sm">Order Date:</div>
                                      <div className="text-sm font-medium">
                                        {order.orderDate}
                                      </div>
                                      <div className="text-sm">
                                        Delivery Date:
                                      </div>
                                      <div className="text-sm font-medium">
                                        {order.deliveryDate}
                                      </div>
                                      <div className="text-sm">Status:</div>
                                      <div className="text-sm">
                                        {getStatusBadge(order.status)}
                                      </div>
                                    </div>
                                  </div>
                                  <Separator />
                                  <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                      Supplier Information
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="text-sm">Supplier:</div>
                                      <div className="text-sm font-medium">
                                        {order.supplierName}
                                      </div>
                                      <div className="text-sm">Region:</div>
                                      <div className="text-sm font-medium">
                                        {order.region}
                                      </div>
                                      <div className="text-sm">Contact:</div>
                                      <div className="text-sm font-medium">
                                        John Smith
                                      </div>
                                      <div className="text-sm">Email:</div>
                                      <div className="text-sm font-medium">
                                        contact@
                                        {order.supplierName
                                          .toLowerCase()
                                          .replace(/\s+/g, "")}
                                        .com
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                      Delivery Information
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="text-sm">
                                        Shipping Method:
                                      </div>
                                      <div className="text-sm font-medium">
                                        Standard Delivery
                                      </div>
                                      <div className="text-sm">
                                        Tracking Number:
                                      </div>
                                      <div className="text-sm font-medium">
                                        TRK-{Math.floor(Math.random() * 10000)}
                                      </div>
                                      <div className="text-sm">
                                        Delivery Address:
                                      </div>
                                      <div className="text-sm font-medium">
                                        Warehouse A, Industrial Area,{" "}
                                        {order.region}
                                      </div>
                                    </div>
                                  </div>
                                  <Separator />
                                  <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                      Payment Information
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="text-sm">
                                        Payment Terms:
                                      </div>
                                      <div className="text-sm font-medium">
                                        Net 30 Days
                                      </div>
                                      <div className="text-sm">
                                        Payment Status:
                                      </div>
                                      <div className="text-sm font-medium">
                                        {order.status === "paid"
                                          ? "Paid"
                                          : "Pending"}
                                      </div>
                                      <div className="text-sm">
                                        Invoice Number:
                                      </div>
                                      <div className="text-sm font-medium">
                                        {order.status === "paid"
                                          ? "INV-" + order.id.substring(3)
                                          : "Not Issued"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                                  Order Items
                                </h3>
                                <div className="border rounded-md">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="text-right">
                                          Quantity
                                        </TableHead>
                                        <TableHead className="text-right">
                                          Unit Price
                                        </TableHead>
                                        <TableHead className="text-right">
                                          Total
                                        </TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {Array.from({ length: order.items }).map(
                                        (_, index) => {
                                          const price =
                                            (order.total / order.items) *
                                            (0.7 + Math.random() * 0.6);
                                          const qty =
                                            Math.floor(Math.random() * 20) + 1;
                                          const unitPrice = price / qty;
                                          return (
                                            <TableRow key={index}>
                                              <TableCell className="font-medium">
                                                Item {index + 1}
                                              </TableCell>
                                              <TableCell>
                                                Product description for item{" "}
                                                {index + 1}
                                              </TableCell>
                                              <TableCell className="text-right">
                                                {qty}
                                              </TableCell>
                                              <TableCell className="text-right">
                                                ${unitPrice.toFixed(2)}
                                              </TableCell>
                                              <TableCell className="text-right">
                                                ${price.toFixed(2)}
                                              </TableCell>
                                            </TableRow>
                                          );
                                        },
                                      )}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>

                              <div className="bg-muted p-4 rounded-md">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h3 className="font-medium">
                                      Order Summary
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                      {order.items} items
                                    </p>
                                  </div>
                                  <div className="text-right space-y-1">
                                    <p className="text-sm">
                                      Subtotal: $
                                      {(order.total * 0.9).toFixed(2)}
                                    </p>
                                    <p className="text-sm">
                                      Tax (10%): $
                                      {(order.total * 0.1).toFixed(2)}
                                    </p>
                                    <p className="font-medium">
                                      Total: ${order.total.toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Print PO</Button>
                              <Button variant="outline">Download PDF</Button>
                              <Button>Close</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredOrders.length} of {purchaseOrders.length}{" "}
                orders
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Other tab contents would be similar to the "all" tab but with filtered data */}
        <TabsContent value="draft" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Draft Purchase Orders</CardTitle>
              <CardDescription>
                Orders that are still being prepared and not yet submitted for
                approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Same table structure as above but with filtered data */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">PO Number</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-center">Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.supplierName}</TableCell>
                      <TableCell>{order.region}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{order.deliveryDate}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        ${order.total.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Purchase Order Details</DialogTitle>
                              <DialogDescription>
                                Purchase Order {order.id} for{" "}
                                {order.supplierName}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6 py-4">
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                      Purchase Order Info
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="text-sm">PO Number:</div>
                                      <div className="text-sm font-medium">
                                        {order.id}
                                      </div>
                                      <div className="text-sm">Order Date:</div>
                                      <div className="text-sm font-medium">
                                        {order.orderDate}
                                      </div>
                                      <div className="text-sm">
                                        Delivery Date:
                                      </div>
                                      <div className="text-sm font-medium">
                                        {order.deliveryDate}
                                      </div>
                                      <div className="text-sm">Status:</div>
                                      <div className="text-sm">
                                        {getStatusBadge(order.status)}
                                      </div>
                                    </div>
                                  </div>
                                  <Separator />
                                  <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                      Supplier Information
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="text-sm">Supplier:</div>
                                      <div className="text-sm font-medium">
                                        {order.supplierName}
                                      </div>
                                      <div className="text-sm">Region:</div>
                                      <div className="text-sm font-medium">
                                        {order.region}
                                      </div>
                                      <div className="text-sm">Contact:</div>
                                      <div className="text-sm font-medium">
                                        John Smith
                                      </div>
                                      <div className="text-sm">Email:</div>
                                      <div className="text-sm font-medium">
                                        contact@
                                        {order.supplierName
                                          .toLowerCase()
                                          .replace(/\s+/g, "")}
                                        .com
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                      Delivery Information
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="text-sm">
                                        Shipping Method:
                                      </div>
                                      <div className="text-sm font-medium">
                                        Standard Delivery
                                      </div>
                                      <div className="text-sm">
                                        Tracking Number:
                                      </div>
                                      <div className="text-sm font-medium">
                                        TRK-{Math.floor(Math.random() * 10000)}
                                      </div>
                                      <div className="text-sm">
                                        Delivery Address:
                                      </div>
                                      <div className="text-sm font-medium">
                                        Warehouse A, Industrial Area,{" "}
                                        {order.region}
                                      </div>
                                    </div>
                                  </div>
                                  <Separator />
                                  <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                      Payment Information
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="text-sm">
                                        Payment Terms:
                                      </div>
                                      <div className="text-sm font-medium">
                                        Net 30 Days
                                      </div>
                                      <div className="text-sm">
                                        Payment Status:
                                      </div>
                                      <div className="text-sm font-medium">
                                        {order.status === "paid"
                                          ? "Paid"
                                          : "Pending"}
                                      </div>
                                      <div className="text-sm">
                                        Invoice Number:
                                      </div>
                                      <div className="text-sm font-medium">
                                        {order.status === "paid"
                                          ? "INV-" + order.id.substring(3)
                                          : "Not Issued"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                                  Order Items
                                </h3>
                                <div className="border rounded-md">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="text-right">
                                          Quantity
                                        </TableHead>
                                        <TableHead className="text-right">
                                          Unit Price
                                        </TableHead>
                                        <TableHead className="text-right">
                                          Total
                                        </TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {Array.from({ length: order.items }).map(
                                        (_, index) => {
                                          const price =
                                            (order.total / order.items) *
                                            (0.7 + Math.random() * 0.6);
                                          const qty =
                                            Math.floor(Math.random() * 20) + 1;
                                          const unitPrice = price / qty;
                                          return (
                                            <TableRow key={index}>
                                              <TableCell className="font-medium">
                                                Item {index + 1}
                                              </TableCell>
                                              <TableCell>
                                                Product description for item{" "}
                                                {index + 1}
                                              </TableCell>
                                              <TableCell className="text-right">
                                                {qty}
                                              </TableCell>
                                              <TableCell className="text-right">
                                                ${unitPrice.toFixed(2)}
                                              </TableCell>
                                              <TableCell className="text-right">
                                                ${price.toFixed(2)}
                                              </TableCell>
                                            </TableRow>
                                          );
                                        },
                                      )}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>

                              <div className="bg-muted p-4 rounded-md">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h3 className="font-medium">
                                      Order Summary
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                      {order.items} items
                                    </p>
                                  </div>
                                  <div className="text-right space-y-1">
                                    <p className="text-sm">
                                      Subtotal: $
                                      {(order.total * 0.9).toFixed(2)}
                                    </p>
                                    <p className="text-sm">
                                      Tax (10%): $
                                      {(order.total * 0.1).toFixed(2)}
                                    </p>
                                    <p className="font-medium">
                                      Total: ${order.total.toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Print PO</Button>
                              <Button variant="outline">Download PDF</Button>
                              <Button>Close</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Similar TabsContent components for other tabs */}
      </Tabs>

      {/* Create Purchase Order Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Purchase Order</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new purchase order. All fields
              marked with * are required.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acme">Acme Supplies</SelectItem>
                    <SelectItem value="global">Global Materials</SelectItem>
                    <SelectItem value="quality">Quality Products</SelectItem>
                    <SelectItem value="prime">Prime Distributors</SelectItem>
                    <SelectItem value="superior">Superior Goods</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="north">North</SelectItem>
                    <SelectItem value="south">South</SelectItem>
                    <SelectItem value="east">East</SelectItem>
                    <SelectItem value="west">West</SelectItem>
                    <SelectItem value="central">Central</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="delivery-date">Expected Delivery Date *</Label>
                <div className="flex items-center">
                  <Input type="date" id="delivery-date" />
                  <Calendar className="ml-2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-terms">Payment Terms *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50-50">
                      50% Advance, 50% on Delivery
                    </SelectItem>
                    <SelectItem value="30-70">
                      30% Advance, 70% on Delivery
                    </SelectItem>
                    <SelectItem value="100">100% on Delivery</SelectItem>
                    <SelectItem value="net30">Net 30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="products">Products *</Label>
                <div className="border rounded-md p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Add Products</span>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add Product
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground italic">
                    No products added yet. Click the button above to add
                    products.
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="delivery-instructions">
                  Delivery Instructions
                </Label>
                <Textarea
                  id="delivery-instructions"
                  placeholder="Enter any special delivery instructions here..."
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Internal Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any internal notes about this order..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-md mt-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Order Summary</h3>
                <p className="text-sm text-muted-foreground">
                  0 products selected
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm">Subtotal: $0.00</p>
                <p className="text-sm">Tax (10%): $0.00</p>
                <p className="font-medium">Total: $0.00</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="outline">Save as Draft</Button>
            <Button>Submit for Approval</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Filter Purchase Orders</DialogTitle>
            <DialogDescription>
              Apply filters to narrow down the purchase orders displayed.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="filter-supplier">Supplier</Label>
              <Select>
                <SelectTrigger id="filter-supplier">
                  <SelectValue placeholder="All suppliers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All suppliers</SelectItem>
                  <SelectItem value="acme">Acme Supplies</SelectItem>
                  <SelectItem value="global">Global Materials</SelectItem>
                  <SelectItem value="quality">Quality Products</SelectItem>
                  <SelectItem value="prime">Prime Distributors</SelectItem>
                  <SelectItem value="superior">Superior Goods</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filter-region">Region</Label>
              <Select>
                <SelectTrigger id="filter-region">
                  <SelectValue placeholder="All regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All regions</SelectItem>
                  <SelectItem value="north">North</SelectItem>
                  <SelectItem value="south">South</SelectItem>
                  <SelectItem value="east">East</SelectItem>
                  <SelectItem value="west">West</SelectItem>
                  <SelectItem value="central">Central</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filter-status">Status</Label>
              <Select>
                <SelectTrigger id="filter-status">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending_approval">
                    Pending Approval
                  </SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="sent">Sent to Supplier</SelectItem>
                  <SelectItem value="in_transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="confirmed">Warehouse Confirmed</SelectItem>
                  <SelectItem value="paid">Payment Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="filter-date-from">Date From</Label>
                <Input type="date" id="filter-date-from" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="filter-date-to">Date To</Label>
                <Input type="date" id="filter-date-to" />
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-between">
            <Button variant="ghost" type="button">
              Reset Filters
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setFilterDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={() => setFilterDialogOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchaseOrderManagement;
