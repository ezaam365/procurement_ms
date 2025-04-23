import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import RoleSwitcher from "@/components/RoleSwitcher";

const SupplierDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock user data
  const user = {
    name: "Supplier ABC",
    role: "Supplier",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=supplier",
    notifications: 3,
  };

  // Navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard Supplier", icon: "📊" },
    { id: "products", label: "Manajemen Produk", icon: "📦" },
    { id: "negotiations", label: "Negosiasi Harga", icon: "💬" },
    { id: "purchase-orders", label: "Purchase Order", icon: "📄" },
    { id: "loyalty", label: "Loyalitas", icon: "🏆" },
  ];

  // Mock product stats
  const productStats = [
    { label: "Draft", value: "5", icon: "📝" },
    { label: "Survey", value: "3", icon: "🔍" },
    { label: "Approved", value: "10", icon: "✅" },
    { label: "Rejected", value: "2", icon: "❌" },
  ];

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "PO #1234 Telah Dibuat",
      time: "10 menit yang lalu",
      read: false,
    },
    {
      id: 2,
      title: "Produk Baru Disetujui",
      time: "1 jam yang lalu",
      read: false,
    },
    {
      id: 3,
      title: "Permintaan Negosiasi Harga",
      time: "3 jam yang lalu",
      read: true,
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col bg-card border-r p-4 h-full">
        <div className="flex items-center mb-8">
          <div className="font-bold text-xl">Supplier Portal</div>
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
              <div className="font-bold text-xl">Supplier Portal</div>
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
            <span className="font-semibold ml-2">Supplier Portal</span>
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
            <RoleSwitcher currentRole="supplier" onRoleChange={() => {}} />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Dashboard Supplier</h1>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {productStats.map((stat, index) => (
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
                        </div>
                        <div className="text-2xl">{stat.icon}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Notifications */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Notifikasi</h3>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start p-3 rounded-md ${!notification.read ? "bg-primary/5" : ""}`}
                      >
                        <div className="flex-1">
                          <div className="font-medium flex items-center gap-2">
                            {notification.title}
                            {!notification.read && (
                              <Badge
                                variant="default"
                                className="h-2 w-2 p-0 rounded-full"
                              />
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {notification.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent POs */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Purchase Order Terbaru
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                      <div>
                        <div className="font-medium">PO #1234</div>
                        <div className="text-sm text-muted-foreground">
                          5 produk - Total: Rp 12.500.000
                        </div>
                      </div>
                      <Badge>Menunggu Konfirmasi</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                      <div>
                        <div className="font-medium">PO #1233</div>
                        <div className="text-sm text-muted-foreground">
                          3 produk - Total: Rp 8.750.000
                        </div>
                      </div>
                      <Badge variant="outline">Dalam Pengiriman</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Manajemen Produk</h1>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Input Produk Baru
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nama Produk</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="Masukkan nama produk"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Harga/Unit</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="Rp 0"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">
                        Spesifikasi Teknis
                      </label>
                      <textarea
                        className="w-full p-2 border rounded-md h-24"
                        placeholder="Masukkan spesifikasi produk"
                      ></textarea>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Lokasi Gudang
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="Masukkan lokasi gudang"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Foto Produk (max 5)
                      </label>
                      <input
                        type="file"
                        className="w-full p-2 border rounded-md"
                        multiple
                        accept="image/*"
                      />
                    </div>
                    <div className="md:col-span-2 mt-4">
                      <Button className="w-full">Simpan Produk</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Daftar Produk</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Semua
                      </Button>
                      <Button variant="outline" size="sm">
                        Pending Survey
                      </Button>
                      <Button variant="outline" size="sm">
                        Ditolak
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Besi Hollow 4x2</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Rp 75.000/batang - Gudang Cikarang
                          </p>
                          <p className="text-sm mt-2">
                            Besi hollow ukuran 4x2 cm, tebal 1.2mm, panjang 6
                            meter
                          </p>
                        </div>
                        <Badge>Pending Survey</Badge>
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Semen Portland 50kg</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Rp 52.000/sak - Gudang Bekasi
                          </p>
                          <p className="text-sm mt-2">
                            Semen portland tipe I, berat 50kg per sak
                          </p>
                        </div>
                        <Badge variant="destructive">Ditolak</Badge>
                      </div>
                      <div className="mt-3 p-3 bg-destructive/10 rounded-md text-sm">
                        <span className="font-medium">Alasan:</span> Stok tidak
                        sesuai dengan kebutuhan proyek
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Bata Ringan 10x20x60</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Rp 8.500/buah - Gudang Karawang
                          </p>
                          <p className="text-sm mt-2">
                            Bata ringan ukuran 10x20x60 cm, densitas 600kg/m³
                          </p>
                        </div>
                        <Badge className="bg-green-500">Approved</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "negotiations" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Negosiasi Harga</h1>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Negosiasi Aktif
                  </h3>

                  <div className="border rounded-md p-4 mb-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">Besi Hollow 4x2</h4>
                        <p className="text-sm text-muted-foreground">
                          Harga Awal: Rp 75.000/batang
                        </p>
                      </div>
                      <Badge>Dalam Negosiasi</Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=procurement" />
                          <AvatarFallback>PM</AvatarFallback>
                        </Avatar>
                        <div className="bg-muted p-3 rounded-md text-sm flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium">
                              Procurement Manager
                            </span>
                            <span className="text-xs text-muted-foreground">
                              10:30 AM
                            </span>
                          </div>
                          <p className="mt-1">
                            Kami menawar harga menjadi Rp 68.000/batang untuk
                            pembelian minimal 100 batang.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 justify-end">
                        <div className="bg-primary/10 p-3 rounded-md text-sm flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium">Anda</span>
                            <span className="text-xs text-muted-foreground">
                              10:45 AM
                            </span>
                          </div>
                          <p className="mt-1">
                            Untuk harga Rp 68.000 kami hanya bisa untuk
                            pembelian minimal 150 batang.
                          </p>
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>S</AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=procurement" />
                          <AvatarFallback>PM</AvatarFallback>
                        </Avatar>
                        <div className="bg-muted p-3 rounded-md text-sm flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium">
                              Procurement Manager
                            </span>
                            <span className="text-xs text-muted-foreground">
                              11:15 AM
                            </span>
                          </div>
                          <p className="mt-1">
                            Penawaran terakhir: Rp 70.000/batang untuk 120
                            batang. Mohon konfirmasi.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <Button variant="outline">Tolak Penawaran</Button>
                      <Button>Terima Penawaran</Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">Semen Portland 50kg</h4>
                        <p className="text-sm text-muted-foreground">
                          Harga Awal: Rp 52.000/sak
                        </p>
                      </div>
                      <Badge>Dalam Negosiasi</Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=procurement" />
                          <AvatarFallback>PM</AvatarFallback>
                        </Avatar>
                        <div className="bg-muted p-3 rounded-md text-sm flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium">
                              Procurement Manager
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Yesterday
                            </span>
                          </div>
                          <p className="mt-1">
                            Kami tertarik dengan produk ini. Apakah bisa Rp
                            50.000/sak untuk 200 sak?
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <Button variant="outline">Tolak Penawaran</Button>
                      <Button>Terima Penawaran</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "purchase-orders" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Purchase Order</h1>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Purchase Order Aktif
                  </h3>

                  <div className="border rounded-md p-4 mb-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">PO #1234</h4>
                        <p className="text-sm text-muted-foreground">
                          Dibuat: 10 Mei 2023
                        </p>
                      </div>
                      <Badge>Menunggu Konfirmasi</Badge>
                    </div>

                    <div className="mt-3">
                      <h5 className="text-sm font-medium mb-2">
                        Detail Produk:
                      </h5>
                      <div className="bg-muted/50 p-3 rounded-md space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Besi Hollow 4x2</span>
                          <span className="text-sm">
                            120 batang x Rp 70.000
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Bata Ringan 10x20x60</span>
                          <span className="text-sm">500 buah x Rp 8.500</span>
                        </div>
                        <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                          <span>Total</span>
                          <span>Rp 12.850.000</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h5 className="text-sm font-medium mb-2">
                        Deadline Pengiriman:
                      </h5>
                      <p className="text-sm">20 Mei 2023</p>
                    </div>

                    <div className="mt-4 flex gap-2 justify-end">
                      <Button variant="outline">Tolak PO</Button>
                      <Button>Terima & Proses</Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">PO #1233</h4>
                        <p className="text-sm text-muted-foreground">
                          Dibuat: 5 Mei 2023
                        </p>
                      </div>
                      <Badge variant="outline">Dalam Pengiriman</Badge>
                    </div>

                    <div className="mt-3">
                      <h5 className="text-sm font-medium mb-2">
                        Detail Produk:
                      </h5>
                      <div className="bg-muted/50 p-3 rounded-md space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Semen Portland 50kg</span>
                          <span className="text-sm">150 sak x Rp 51.000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Pasir Cor 1m³</span>
                          <span className="text-sm">5 truk x Rp 350.000</span>
                        </div>
                        <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                          <span>Total</span>
                          <span>Rp 9.400.000</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h5 className="text-sm font-medium mb-2">
                        Deadline Pengiriman:
                      </h5>
                      <p className="text-sm">15 Mei 2023</p>
                    </div>

                    <div className="mt-4">
                      <h5 className="text-sm font-medium mb-2">
                        Upload Bukti Pengiriman:
                      </h5>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          Upload PDF
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          Upload Foto
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "loyalty" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Program Loyalitas</h1>

              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="text-5xl mb-2">⭐⭐⭐⭐</div>
                    <h3 className="text-2xl font-bold mb-1">85 Poin</h3>
                    <p className="text-muted-foreground mb-4">Bintang 4</p>
                    <div className="bg-primary/10 px-4 py-2 rounded-full">
                      <span className="font-medium">
                        Peringkat #2 di Regional Jawa Barat
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Riwayat Poin</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 border-b">
                        <div>
                          <p className="font-medium">PO #1233 Selesai</p>
                          <p className="text-xs text-muted-foreground">
                            5 Mei 2023
                          </p>
                        </div>
                        <span className="text-green-600 font-medium">
                          +15 poin
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 border-b">
                        <div>
                          <p className="font-medium">Pengiriman Tepat Waktu</p>
                          <p className="text-xs text-muted-foreground">
                            28 April 2023
                          </p>
                        </div>
                        <span className="text-green-600 font-medium">
                          +10 poin
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 border-b">
                        <div>
                          <p className="font-medium">PO #1230 Selesai</p>
                          <p className="text-xs text-muted-foreground">
                            20 April 2023
                          </p>
                        </div>
                        <span className="text-green-600 font-medium">
                          +20 poin
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Benefit Loyalitas
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-md">
                        <h4 className="font-medium">Prioritas Negosiasi</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Negosiasi harga diprioritaskan untuk supplier bintang
                          4 & 5
                        </p>
                      </div>
                      <div className="p-3 border rounded-md">
                        <h4 className="font-medium">Pembayaran Dipercepat</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Proses pembayaran 2x lebih cepat untuk supplier loyal
                        </p>
                      </div>
                      <div className="p-3 border rounded-md">
                        <h4 className="font-medium">Akses Tender Eksklusif</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Mendapatkan akses ke tender proyek premium
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SupplierDashboard;
