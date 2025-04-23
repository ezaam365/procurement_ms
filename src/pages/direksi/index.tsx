import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Settings,
  Menu,
  BarChart3,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RoleSwitcher from "@/components/RoleSwitcher";

const DireksiDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock user data
  const user = {
    name: "Ir. Hendra",
    role: "Direksi",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=direksi",
    notifications: 3,
  };

  // Navigation items
  const navItems = [
    { id: "dashboard", label: "Executive Dashboard", icon: "📊" },
    { id: "approvals", label: "Approval Kebijakan", icon: "✅" },
  ];

  // Mock KPI data
  const kpiData = [
    {
      label: "Efisiensi Pengadaan",
      value: "12.5%",
      target: "10%",
      status: "above_target",
    },
    {
      label: "Supplier Reliability",
      value: "87%",
      target: "90%",
      status: "below_target",
    },
    {
      label: "Delivery On-Time",
      value: "92%",
      target: "95%",
      status: "below_target",
    },
    {
      label: "Quality Compliance",
      value: "98.5%",
      target: "95%",
      status: "above_target",
    },
  ];

  // Mock regional data
  const regionalData = [
    { region: "Jawa Barat", suppliers: 45, activePOs: 28, budget: "Rp 2.5M" },
    { region: "Jawa Tengah", suppliers: 32, activePOs: 19, budget: "Rp 1.8M" },
    { region: "Jawa Timur", suppliers: 38, activePOs: 24, budget: "Rp 2.2M" },
    { region: "Bali", suppliers: 15, activePOs: 8, budget: "Rp 0.9M" },
    { region: "Sumatera", suppliers: 27, activePOs: 16, budget: "Rp 1.5M" },
  ];

  // Mock approval requests
  const approvalRequests = [
    {
      id: "REQ-001",
      title: "Kenaikan Budget Pengadaan Q3 2024",
      requestor: "Procurement Manager",
      amount: "Rp 500.000.000",
      justification: "Antisipasi kenaikan harga bahan baku 15% di Q3",
      status: "pending",
      date: "15 Jun 2024",
    },
    {
      id: "REQ-002",
      title: "Perubahan Kebijakan Supplier Rating",
      requestor: "Procurement Manager",
      amount: "-",
      justification: "Penyesuaian kriteria rating untuk meningkatkan kualitas",
      status: "pending",
      date: "14 Jun 2024",
    },
    {
      id: "REQ-003",
      title: "Penambahan Kategori Supplier Baru",
      requestor: "Admin Regional Jawa Barat",
      amount: "-",
      justification: "Diversifikasi supplier untuk mengurangi risiko",
      status: "pending",
      date: "12 Jun 2024",
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col bg-card border-r p-4 h-full">
        <div className="flex items-center mb-8">
          <div className="font-bold text-xl">Direksi Portal</div>
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
              <div className="font-bold text-xl">Direksi Portal</div>
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
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <span className="font-semibold ml-2">Direksi Portal</span>
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
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="dashboard">Executive Dashboard</TabsTrigger>
              <TabsTrigger value="approvals">Approval Kebijakan</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <h1 className="text-2xl font-bold">Executive Dashboard</h1>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiData.map((kpi, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            {kpi.label}
                          </p>
                          <h3 className="text-2xl font-bold mt-1">
                            {kpi.value}
                          </h3>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-muted-foreground mr-1">
                              Target: {kpi.target}
                            </span>
                            {kpi.status === "above_target" ? (
                              <Badge variant="default" className="text-xs">
                                Di Atas Target
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">
                                Di Bawah Target
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div>
                          {kpi.status === "above_target" ? (
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                              <XCircle className="h-5 w-5 text-orange-600" />
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Regional Overview */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Regional Overview</h3>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" /> Export Report
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Region</th>
                          <th className="text-center py-3 px-4">Suppliers</th>
                          <th className="text-center py-3 px-4">Active POs</th>
                          <th className="text-center py-3 px-4">
                            Budget Allocation
                          </th>
                          <th className="text-right py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {regionalData.map((region, index) => (
                          <tr key={index} className="border-b last:border-0">
                            <td className="py-3 px-4 font-medium">
                              {region.region}
                            </td>
                            <td className="text-center py-3 px-4">
                              {region.suppliers}
                            </td>
                            <td className="text-center py-3 px-4">
                              {region.activePOs}
                            </td>
                            <td className="text-center py-3 px-4">
                              {region.budget}
                            </td>
                            <td className="text-right py-3 px-4">
                              <Button variant="ghost" size="sm">
                                <BarChart3 className="h-4 w-4 mr-2" /> Detail
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Heatmap Pengadaan per Provinsi
                    </h3>
                    <div className="h-64 flex items-center justify-center bg-muted/30 rounded-md">
                      <p className="text-muted-foreground">
                        Peta Indonesia dengan Heatmap
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Tren Harga Komoditas
                    </h3>
                    <div className="h-64 flex items-center justify-center bg-muted/30 rounded-md">
                      <div className="text-center">
                        <p className="text-muted-foreground">
                          Grafik Tren Harga
                        </p>
                        <p className="text-sm font-medium mt-2">
                          Harga kedelai naik 12% Q3-2024
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="approvals" className="space-y-4">
              <h1 className="text-2xl font-bold mb-4">Approval Kebijakan</h1>

              {approvalRequests.map((request) => (
                <Card key={request.id} className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {request.title}
                        </h3>
                        <div className="text-sm text-muted-foreground mt-1">
                          ID: {request.id} • Diajukan oleh: {request.requestor}{" "}
                          • {request.date}
                        </div>
                      </div>
                      <Badge>Menunggu Approval</Badge>
                    </div>

                    <div className="mt-4 space-y-2">
                      {request.amount !== "-" && (
                        <div className="flex items-start">
                          <span className="font-medium w-32">Nilai:</span>
                          <span>{request.amount}</span>
                        </div>
                      )}
                      <div className="flex items-start">
                        <span className="font-medium w-32">Justifikasi:</span>
                        <span>{request.justification}</span>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        Minta Informasi Tambahan
                      </Button>
                      <Button variant="outline" size="sm">
                        <XCircle className="h-4 w-4 mr-2" /> Tolak
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" /> Setujui
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Riwayat Approval
                  </h3>
                  <div className="flex items-center justify-center p-8 text-muted-foreground">
                    <p>Tidak ada riwayat approval dalam 30 hari terakhir</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default DireksiDashboard;
