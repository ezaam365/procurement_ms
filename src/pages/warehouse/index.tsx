import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Settings,
  Menu,
  Package,
  Clipboard,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RoleSwitcher from "@/components/RoleSwitcher";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const WarehouseDashboard = () => {
  const [activeTab, setActiveTab] = useState("receiving");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock user data
  const user = {
    name: "Budi Warehouse",
    role: "Petugas Warehouse",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=warehouse",
    notifications: 4,
  };

  // Navigation items
  const navItems = [
    { id: "receiving", label: "Penerimaan Barang", icon: "📦" },
    { id: "reports", label: "Laporan Harian", icon: "📊" },
  ];

  // Mock pending deliveries
  const pendingDeliveries = [
    {
      id: "PO-2024-001",
      supplier: "PT Maju Jaya",
      products: ["Besi Beton 10mm (200 btg)", "Semen Portland (50 sak)"],
      expectedArrival: "Hari ini, 14:00 - 16:00",
      status: "on_the_way",
    },
    {
      id: "PO-2024-002",
      supplier: "CV Abadi Sejahtera",
      products: ["Pasir Silika (2 truk)", "Batu Split (1 truk)"],
      expectedArrival: "Hari ini, 15:30 - 17:30",
      status: "arrived",
    },
    {
      id: "PO-2024-003",
      supplier: "UD Makmur",
      products: ["Kayu Jati Grade A (25 batang)"],
      expectedArrival: "Besok, 09:00 - 11:00",
      status: "scheduled",
    },
  ];

  // Mock daily reports
  const dailyReports = [
    {
      date: "15 Jun 2024",
      totalReceived: 5,
      totalAccepted: 4,
      totalRejected: 1,
      suppliers: [
        { name: "PT Maju Jaya", status: "accepted", items: 2 },
        { name: "CV Berkah", status: "accepted", items: 1 },
        { name: "UD Sentosa", status: "rejected", items: 1 },
        { name: "PT Abadi", status: "accepted", items: 1 },
      ],
    },
    {
      date: "14 Jun 2024",
      totalReceived: 3,
      totalAccepted: 3,
      totalRejected: 0,
      suppliers: [
        { name: "PT Sejahtera", status: "accepted", items: 1 },
        { name: "CV Makmur", status: "accepted", items: 1 },
        { name: "UD Bahagia", status: "accepted", items: 1 },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col bg-card border-r p-4 h-full">
        <div className="flex items-center mb-8">
          <div className="font-bold text-xl">Warehouse App</div>
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
              <div className="font-bold text-xl">Warehouse App</div>
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <span className="font-semibold ml-2">Warehouse App</span>
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
            <RoleSwitcher currentRole="warehouse" onRoleChange={() => {}} />
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
              <TabsTrigger value="receiving">Penerimaan Barang</TabsTrigger>
              <TabsTrigger value="reports">Laporan Harian</TabsTrigger>
            </TabsList>

            <TabsContent value="receiving" className="space-y-4">
              <h1 className="text-2xl font-bold mb-4">Penerimaan Barang</h1>

              {pendingDeliveries.map((delivery) => (
                <Card key={delivery.id} className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{delivery.id}</h3>
                        <div className="text-sm font-medium mt-1">
                          {delivery.supplier}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {delivery.products.join(", ")}
                        </div>
                      </div>
                      <Badge
                        variant={
                          delivery.status === "arrived"
                            ? "default"
                            : delivery.status === "on_the_way"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {delivery.status === "arrived"
                          ? "Telah Tiba"
                          : delivery.status === "on_the_way"
                            ? "Dalam Perjalanan"
                            : "Terjadwal"}
                      </Badge>
                    </div>

                    <div className="mt-4 text-sm">
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>
                          Estimasi Kedatangan: {delivery.expectedArrival}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end space-x-2">
                      {delivery.status === "arrived" ? (
                        <>
                          <Button variant="outline" size="sm">
                            <XCircle className="h-4 w-4 mr-2" /> Tolak
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="h-4 w-4 mr-2" /> Terima
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Clipboard className="h-4 w-4 mr-2" /> Lihat Detail
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4">
              <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>

              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <select className="p-2 border rounded-md text-sm">
                    <option value="">Semua Kategori</option>
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
                  <input
                    type="text"
                    placeholder="Cari produk..."
                    className="p-2 border rounded-md text-sm"
                  />
                </div>
                <Button size="sm">Update Stok</Button>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b text-sm">
                          <th className="text-left py-2 px-2">Kode</th>
                          <th className="text-left py-2 px-2">Nama Produk</th>
                          <th className="text-left py-2 px-2">Kategori</th>
                          <th className="text-center py-2 px-2">Stok</th>
                          <th className="text-center py-2 px-2">Status</th>
                          <th className="text-right py-2 px-2">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr className="border-b">
                          <td className="py-3 px-2">BH-001</td>
                          <td className="py-3 px-2">Besi Hollow 4x2</td>
                          <td className="py-3 px-2">
                            <Badge variant="outline">Bahan Bangunan</Badge>
                          </td>
                          <td className="py-3 px-2 text-center">120 batang</td>
                          <td className="py-3 px-2 text-center">
                            <Badge variant="default">Tersedia</Badge>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <Button variant="ghost" size="sm">
                              Detail
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-2">SP-002</td>
                          <td className="py-3 px-2">Semen Portland 50kg</td>
                          <td className="py-3 px-2">
                            <Badge variant="outline">Bahan Bangunan</Badge>
                          </td>
                          <td className="py-3 px-2 text-center">85 sak</td>
                          <td className="py-3 px-2 text-center">
                            <Badge variant="default">Tersedia</Badge>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <Button variant="ghost" size="sm">
                              Detail
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-2">BR-003</td>
                          <td className="py-3 px-2">Bata Ringan 10x20x60</td>
                          <td className="py-3 px-2">
                            <Badge variant="outline">Bahan Bangunan</Badge>
                          </td>
                          <td className="py-3 px-2 text-center">350 buah</td>
                          <td className="py-3 px-2 text-center">
                            <Badge variant="default">Tersedia</Badge>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <Button variant="ghost" size="sm">
                              Detail
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-2">HP-004</td>
                          <td className="py-3 px-2">Helm Proyek</td>
                          <td className="py-3 px-2">
                            <Badge variant="outline">
                              Perlengkapan Keamanan
                            </Badge>
                          </td>
                          <td className="py-3 px-2 text-center">50 buah</td>
                          <td className="py-3 px-2 text-center">
                            <Badge variant="secondary">Stok Menipis</Badge>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <Button variant="ghost" size="sm">
                              Detail
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-2">KJ-005</td>
                          <td className="py-3 px-2">Kayu Jati Grade A</td>
                          <td className="py-3 px-2">
                            <Badge variant="outline">Bahan Bangunan</Badge>
                          </td>
                          <td className="py-3 px-2 text-center">0 batang</td>
                          <td className="py-3 px-2 text-center">
                            <Badge variant="destructive">Habis</Badge>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <Button variant="ghost" size="sm">
                              Detail
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <h1 className="text-2xl font-bold mb-4">Laporan Harian</h1>

              {dailyReports.map((report) => (
                <Card key={report.date} className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold">{report.date}</h3>
                      <div className="flex space-x-2">
                        <Badge variant="outline" className="flex items-center">
                          <Package className="h-3 w-3 mr-1" />{" "}
                          {report.totalReceived}
                        </Badge>
                        <Badge variant="default" className="flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />{" "}
                          {report.totalAccepted}
                        </Badge>
                        {report.totalRejected > 0 && (
                          <Badge
                            variant="destructive"
                            className="flex items-center"
                          >
                            <XCircle className="h-3 w-3 mr-1" />{" "}
                            {report.totalRejected}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {report.suppliers.map((supplier, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2 bg-muted/30 rounded-md"
                        >
                          <div className="flex items-center">
                            <div
                              className={`h-2 w-2 rounded-full mr-2 ${supplier.status === "accepted" ? "bg-green-500" : "bg-red-500"}`}
                            ></div>
                            <span>{supplier.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">
                              {supplier.items} item
                            </span>
                            <Badge
                              variant={
                                supplier.status === "accepted"
                                  ? "default"
                                  : "destructive"
                              }
                              className="text-xs"
                            >
                              {supplier.status === "accepted"
                                ? "Diterima"
                                : "Ditolak"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        <Clipboard className="h-4 w-4 mr-2" /> Detail Lengkap
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default WarehouseDashboard;
