import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import RoleSwitcher, { UserRole } from "./RoleSwitcher";

// Import dashboard components
import ProcurementPipeline from "./dashboard/ProcurementPipeline";
import SupplierManagement from "./dashboard/SupplierManagement";
import SurveyWorkflow from "./dashboard/SurveyWorkflow";
import PurchaseOrderManagement from "./dashboard/PurchaseOrderManagement";

const Home = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>(
    "procurement_manager",
  );

  // Mock user data
  const user = {
    name: "John Doe",
    role: "Procurement Manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    notifications: 5,
  };

  // Navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "procurement", label: "Procurement Pipeline", icon: "🔄" },
    { id: "suppliers", label: "Supplier Management", icon: "🏢" },
    { id: "surveys", label: "Survey Management", icon: "📝" },
    { id: "purchase-orders", label: "Purchase Orders", icon: "📦" },
    { id: "reports", label: "Executive Reporting", icon: "📈" },
  ];

  // Mock stats for dashboard
  const stats = [
    { label: "Active Suppliers", value: "124", change: "+12%", icon: "🏢" },
    { label: "Pending Surveys", value: "38", change: "-5%", icon: "📝" },
    { label: "Open Purchase Orders", value: "67", change: "+23%", icon: "📦" },
    {
      label: "Completed Transactions",
      value: "1,284",
      change: "+8%",
      icon: "✅",
    },
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: "survey",
      title: "New survey assigned",
      time: "10 minutes ago",
      user: "Sarah Chen",
    },
    {
      id: 2,
      type: "purchase",
      title: "PO #12345 approved",
      time: "1 hour ago",
      user: "Mike Johnson",
    },
    {
      id: 3,
      type: "supplier",
      title: "New supplier registered",
      time: "3 hours ago",
      user: "System",
    },
    {
      id: 4,
      type: "delivery",
      title: "Shipment received at warehouse",
      time: "5 hours ago",
      user: "Warehouse Team",
    },
    {
      id: 5,
      type: "negotiation",
      title: "Price negotiation completed",
      time: "1 day ago",
      user: "Alex Wong",
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col bg-card border-r p-4 h-full">
        <div className="flex items-center mb-8">
          <div className="font-bold text-xl">Procurement MS</div>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center p-3 rounded-md text-left ${activeTab === item.id ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-4 border-t">
          <div className="flex items-center p-3">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.role}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center p-4 border-b">
              <div className="font-bold text-xl">Procurement MS</div>
            </div>

            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center p-3 rounded-md text-left ${activeTab === item.id ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto p-4 border-t">
              <div className="flex items-center p-3">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {user.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-4">
          <div className="flex items-center md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            </Sheet>
            <span className="font-semibold ml-2">Procurement MS</span>
          </div>

          <div className="flex items-center ml-auto space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {user.notifications > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  {user.notifications}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <RoleSwitcher
              currentRole={currentRole}
              onRoleChange={setCurrentRole}
            />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            {stat.label}
                          </p>
                          <h3 className="text-2xl font-bold mt-1">
                            {stat.value}
                          </h3>
                          <p
                            className={`text-xs mt-1 ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                          >
                            {stat.change} from last month
                          </p>
                        </div>
                        <div className="text-2xl">{stat.icon}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Tabs for Dashboard Content */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activities">
                    Recent Activities
                  </TabsTrigger>
                  <TabsTrigger value="pending">Pending Actions</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4">
                          Procurement Status
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">
                                Supplier Registration
                              </span>
                              <span className="text-sm font-medium">24/30</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary rounded-full h-2"
                                style={{ width: "80%" }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Survey Completion</span>
                              <span className="text-sm font-medium">18/38</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary rounded-full h-2"
                                style={{ width: "47%" }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Purchase Orders</span>
                              <span className="text-sm font-medium">42/67</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary rounded-full h-2"
                                style={{ width: "63%" }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Deliveries</span>
                              <span className="text-sm font-medium">31/42</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary rounded-full h-2"
                                style={{ width: "74%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4">
                          Top Suppliers
                        </h3>
                        <div className="space-y-4">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage
                                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=supplier${i}`}
                                />
                                <AvatarFallback>S{i}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <span className="font-medium">
                                    Supplier {i}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    {5 - i} ⭐
                                  </span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {20 - i * 3} transactions
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="activities" className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Recent Activities
                      </h3>
                      <div className="space-y-4">
                        {recentActivities.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-start pb-4 border-b last:border-0 last:pb-0"
                          >
                            <div className="mr-3 mt-1">
                              {activity.type === "survey" && (
                                <span className="text-xl">📝</span>
                              )}
                              {activity.type === "purchase" && (
                                <span className="text-xl">📦</span>
                              )}
                              {activity.type === "supplier" && (
                                <span className="text-xl">🏢</span>
                              )}
                              {activity.type === "delivery" && (
                                <span className="text-xl">🚚</span>
                              )}
                              {activity.type === "negotiation" && (
                                <span className="text-xl">💬</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">
                                {activity.title}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {activity.user}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {activity.time}
                              </div>
                            </div>
                            <Badge variant="outline" className="ml-2">
                              {activity.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="pending" className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Pending Actions
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                          <div>
                            <div className="font-medium">
                              Survey Approval Required
                            </div>
                            <div className="text-sm text-muted-foreground">
                              12 surveys pending approval
                            </div>
                          </div>
                          <Button size="sm">Review</Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                          <div>
                            <div className="font-medium">
                              Purchase Orders Pending
                            </div>
                            <div className="text-sm text-muted-foreground">
                              8 POs awaiting your approval
                            </div>
                          </div>
                          <Button size="sm">Review</Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                          <div>
                            <div className="font-medium">
                              Price Negotiations
                            </div>
                            <div className="text-sm text-muted-foreground">
                              5 suppliers waiting for response
                            </div>
                          </div>
                          <Button size="sm">Respond</Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                          <div>
                            <div className="font-medium">Supplier Ratings</div>
                            <div className="text-sm text-muted-foreground">
                              15 suppliers need rating update
                            </div>
                          </div>
                          <Button size="sm">Rate</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {activeTab === "procurement" && <ProcurementPipeline />}
          {activeTab === "suppliers" && <SupplierManagement />}
          {activeTab === "surveys" && <SurveyWorkflow />}
          {activeTab === "purchase-orders" && <PurchaseOrderManagement />}

          {activeTab === "inventory" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Inventory Management</h1>
              <p className="text-muted-foreground">
                Manage and track all products in the inventory system.
              </p>

              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <select className="p-2 border rounded-md">
                    <option value="">All Categories</option>
                    <option value="bahan_bangunan">Bahan Bangunan</option>
                    <option value="alat_konstruksi">Alat Konstruksi</option>
                    <option value="material_finishing">
                      Material Finishing
                    </option>
                    <option value="perlengkapan_keamanan">
                      Perlengkapan Keamanan
                    </option>
                    <option value="material_listrik">Material Listrik</option>
                  </select>
                  <select className="p-2 border rounded-md">
                    <option value="">All Warehouses</option>
                    <option value="cikarang">Gudang Cikarang</option>
                    <option value="bekasi">Gudang Bekasi</option>
                    <option value="karawang">Gudang Karawang</option>
                  </select>
                </div>
                <div>
                  <Button variant="outline" className="mr-2">
                    Export
                  </Button>
                  <Button>Add Product</Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Product Name</th>
                          <th className="text-left py-3 px-4">Category</th>
                          <th className="text-left py-3 px-4">Warehouse</th>
                          <th className="text-center py-3 px-4">Stock</th>
                          <th className="text-right py-3 px-4">Price</th>
                          <th className="text-right py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4">Besi Hollow 4x2</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">Bahan Bangunan</Badge>
                          </td>
                          <td className="py-3 px-4">Gudang Cikarang</td>
                          <td className="py-3 px-4 text-center">120</td>
                          <td className="py-3 px-4 text-right">
                            Rp 75.000/batang
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">Semen Portland 50kg</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">Bahan Bangunan</Badge>
                          </td>
                          <td className="py-3 px-4">Gudang Bekasi</td>
                          <td className="py-3 px-4 text-center">85</td>
                          <td className="py-3 px-4 text-right">
                            Rp 52.000/sak
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">Bata Ringan 10x20x60</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">Bahan Bangunan</Badge>
                          </td>
                          <td className="py-3 px-4">Gudang Karawang</td>
                          <td className="py-3 px-4 text-center">350</td>
                          <td className="py-3 px-4 text-right">
                            Rp 8.500/buah
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">Helm Proyek</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">
                              Perlengkapan Keamanan
                            </Badge>
                          </td>
                          <td className="py-3 px-4">Gudang Cikarang</td>
                          <td className="py-3 px-4 text-center">50</td>
                          <td className="py-3 px-4 text-right">
                            Rp 45.000/buah
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Executive Reporting</h1>
              <p className="text-muted-foreground">
                Executive reporting dashboard with KPIs and performance metrics.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Procurement Performance
                    </h3>
                    <div className="h-64 flex items-center justify-center bg-muted/30 rounded-md">
                      <p className="text-muted-foreground">
                        Performance Chart Placeholder
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Supplier Distribution
                    </h3>
                    <div className="h-64 flex items-center justify-center bg-muted/30 rounded-md">
                      <p className="text-muted-foreground">
                        Distribution Chart Placeholder
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Cost Analysis
                    </h3>
                    <div className="h-64 flex items-center justify-center bg-muted/30 rounded-md">
                      <p className="text-muted-foreground">
                        Cost Analysis Chart Placeholder
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Delivery Performance
                    </h3>
                    <div className="h-64 flex items-center justify-center bg-muted/30 rounded-md">
                      <p className="text-muted-foreground">
                        Delivery Chart Placeholder
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline">Export Data</Button>
                <Button>Generate Report</Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
