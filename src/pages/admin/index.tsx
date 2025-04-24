import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings, Menu, Users, FileText, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RoleSwitcher from "@/components/RoleSwitcher";

const AdminDaerah = () => {
  const [activeTab, setActiveTab] = useState("assignments");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock user data
  const user = {
    name: "Dian Admin",
    role: "Admin Daerah",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    notifications: 7,
    region: "Jawa Barat",
  };

  // Navigation items
  const navItems = [
    { id: "assignments", label: "Penugasan Surveyor", icon: "👥" },
    { id: "analysis", label: "Analisis Supplier", icon: "📊" },
    { id: "po-management", label: "PO Management", icon: "📄" },
  ];

  // Mock surveyors
  const surveyors = [
    {
      id: 1,
      name: "Ahmad",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmad",
      activeTasks: 2,
      completedToday: 1,
      status: "active",
    },
    {
      id: 2,
      name: "Budi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=budi",
      activeTasks: 0,
      completedToday: 3,
      status: "available",
    },
    {
      id: 3,
      name: "Cindy",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cindy",
      activeTasks: 1,
      completedToday: 2,
      status: "active",
    },
    {
      id: 4,
      name: "Dodi",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dodi",
      activeTasks: 0,
      completedToday: 0,
      status: "offline",
    },
  ];

  // Mock pending surveys
  const pendingSurveys = [
    {
      id: "SV-001",
      supplier: "PT Maju Jaya",
      products: ["Besi Beton 10mm", "Semen Portland"],
      location: "Bandung",
      priority: "high",
      assignedTo: null,
    },
    {
      id: "SV-002",
      supplier: "CV Abadi Sejahtera",
      products: ["Pasir Silika", "Batu Split"],
      location: "Cimahi",
      priority: "medium",
      assignedTo: null,
    },
    {
      id: "SV-003",
      supplier: "UD Makmur",
      products: ["Kayu Jati Grade A"],
      location: "Garut",
      priority: "low",
      assignedTo: null,
    },
  ];

  // Mock supplier analysis data
  const supplierAnalysis = [
    {
      name: "PT Maju Jaya",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PT-Maju",
      rejectionRate: 15,
      deliveryOnTime: 85,
      qualityScore: 4.2,
      totalOrders: 47,
    },
    {
      name: "CV Abadi Sejahtera",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CV-Abadi",
      rejectionRate: 8,
      deliveryOnTime: 92,
      qualityScore: 4.5,
      totalOrders: 36,
    },
    {
      name: "UD Makmur",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=UD-Makmur",
      rejectionRate: 22,
      deliveryOnTime: 78,
      qualityScore: 3.8,
      totalOrders: 18,
    },
    {
      name: "PT Sentosa Jaya",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PT-Sentosa",
      rejectionRate: 5,
      deliveryOnTime: 95,
      qualityScore: 4.7,
      totalOrders: 42,
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      <header className="h-16 border-b bg-card flex items-center justify-between px-4">
        <div className="flex items-center">
          <span className="font-semibold ml-2">Admin Regional</span>
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
          <RoleSwitcher currentRole="admin" onRoleChange={() => {}} />
        </div>
      </header>

      <main className="p-4 md:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="assignments">Penugasan Surveyor</TabsTrigger>
            <TabsTrigger value="analysis">Analisis Supplier</TabsTrigger>
            <TabsTrigger value="po-management">PO Management</TabsTrigger>
          </TabsList>

          <TabsContent value="assignments" className="space-y-4">
            <h1 className="text-2xl font-bold mb-4">Penugasan Surveyor</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-4">
                    Surveyor Tersedia
                  </h3>
                  <div className="space-y-3">
                    {surveyors.map((surveyor) => (
                      <div
                        key={surveyor.id}
                        className="flex items-center justify-between p-2 bg-muted/30 rounded-md"
                      >
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage
                              src={surveyor.avatar}
                              alt={surveyor.name}
                            />
                            <AvatarFallback>
                              {surveyor.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{surveyor.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {surveyor.activeTasks} tugas aktif •{" "}
                              {surveyor.completedToday} selesai hari ini
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={
                            surveyor.status === "active"
                              ? "default"
                              : surveyor.status === "available"
                                ? "outline"
                                : "secondary"
                          }
                        >
                          {surveyor.status === "active"
                            ? "Aktif"
                            : surveyor.status === "available"
                              ? "Tersedia"
                              : "Offline"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-4">
                    Survey Menunggu Penugasan
                  </h3>
                  <div className="space-y-3">
                    {pendingSurveys.map((survey) => (
                      <div
                        key={survey.id}
                        className={`p-2 rounded-md border-l-4 ${
                          survey.priority === "high"
                            ? "border-l-destructive"
                            : survey.priority === "medium"
                              ? "border-l-orange-500"
                              : "border-l-blue-500"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">
                              {survey.id} - {survey.supplier}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Produk: {survey.products.join(", ")}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Lokasi: {survey.location}
                            </div>
                          </div>
                          <Badge
                            variant={
                              survey.priority === "high"
                                ? "destructive"
                                : survey.priority === "medium"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {survey.priority === "high"
                              ? "Prioritas Tinggi"
                              : survey.priority === "medium"
                                ? "Prioritas Sedang"
                                : "Prioritas Rendah"}
                          </Badge>
                        </div>
                        <div className="mt-2 flex justify-end">
                          <Button size="sm">Tugaskan Surveyor</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">
                  Survey Dalam Proses
                </h3>
                <div className="flex items-center justify-center p-8 text-muted-foreground">
                  <p>Tidak ada survey dalam proses saat ini</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <h1 className="text-2xl font-bold mb-4">Analisis Supplier</h1>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Performa Supplier</h3>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" /> Export Excel
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Supplier</th>
                        <th className="text-center py-3 px-2">
                          Tingkat Rejection
                        </th>
                        <th className="text-center py-3 px-2">
                          Pengiriman Tepat Waktu
                        </th>
                        <th className="text-center py-3 px-2">Skor Kualitas</th>
                        <th className="text-center py-3 px-2">Total Order</th>
                        <th className="text-right py-3 px-2">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supplierAnalysis.map((supplier, index) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="py-3 px-2">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
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
                          </td>
                          <td className="text-center py-3 px-2">
                            <Badge
                              variant={
                                supplier.rejectionRate > 20
                                  ? "destructive"
                                  : supplier.rejectionRate > 10
                                    ? "secondary"
                                    : "default"
                              }
                            >
                              {supplier.rejectionRate}%
                            </Badge>
                          </td>
                          <td className="text-center py-3 px-2">
                            <Badge
                              variant={
                                supplier.deliveryOnTime < 80
                                  ? "destructive"
                                  : supplier.deliveryOnTime < 90
                                    ? "secondary"
                                    : "default"
                              }
                            >
                              {supplier.deliveryOnTime}%
                            </Badge>
                          </td>
                          <td className="text-center py-3 px-2">
                            <div className="flex items-center justify-center">
                              <span className="font-medium">
                                {supplier.qualityScore.toFixed(1)}
                              </span>
                              <span className="text-yellow-500 ml-1">★</span>
                            </div>
                          </td>
                          <td className="text-center py-3 px-2">
                            {supplier.totalOrders}
                          </td>
                          <td className="text-right py-3 px-2">
                            <Button variant="ghost" size="sm">
                              <BarChart className="h-4 w-4 mr-2" /> Detail
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="po-management" className="space-y-4">
            <h1 className="text-2xl font-bold mb-4">PO Management</h1>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">
                  Purchase Orders Menunggu Approval
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/30 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">PO-2024-005</div>
                        <div className="text-sm text-muted-foreground">
                          Supplier: PT Maju Jaya
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Total: Rp 95.000.000
                        </div>
                      </div>
                      <Badge>Menunggu Approval</Badge>
                    </div>
                    <div className="mt-3 flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        Tolak
                      </Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>

            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <select className="p-2 border rounded-md">
                  <option value="">All Categories</option>
                  <option value="bahan_bangunan">Bahan Bangunan</option>
                  <option value="alat_konstruksi">Alat Konstruksi</option>
                  <option value="material_finishing">Material Finishing</option>
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
                        <td className="py-3 px-4 text-right">Rp 52.000/sak</td>
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
                        <td className="py-3 px-4 text-right">Rp 8.500/buah</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Helm Proyek</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">Perlengkapan Keamanan</Badge>
                        </td>
                        <td className="py-3 px-4">Gudang Cikarang</td>
                        <td className="py-3 px-4 text-center">50</td>
                        <td className="py-3 px-4 text-right">Rp 45.000/buah</td>
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDaerah;
