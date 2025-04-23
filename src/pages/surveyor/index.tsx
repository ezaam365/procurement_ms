import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings, Menu, MapPin, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RoleSwitcher from "@/components/RoleSwitcher";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const SurveyorDashboard = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock user data
  const user = {
    name: "Ahmad Surveyor",
    role: "Surveyor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=surveyor",
    notifications: 2,
  };

  // Navigation items
  const navItems = [
    { id: "active", label: "Tugas Aktif", icon: "📋" },
    { id: "history", label: "Riwayat", icon: "📚" },
  ];

  // Mock active tasks
  const activeTasks = [
    {
      id: 1,
      supplier: "PT Maju Jaya",
      products: ["Besi Beton 10mm", "Semen Portland"],
      address: "Jl. Industri No. 123, Bandung",
      deadline: "Hari ini, 15:00",
      distance: "2.5 km",
      priority: "high",
    },
    {
      id: 2,
      supplier: "CV Abadi Sejahtera",
      products: ["Pasir Silika", "Batu Split"],
      address: "Jl. Merdeka No. 45, Bandung",
      deadline: "Besok, 10:00",
      distance: "5.2 km",
      priority: "medium",
    },
    {
      id: 3,
      supplier: "UD Makmur",
      products: ["Kayu Jati Grade A"],
      address: "Jl. Raya Cimahi No. 78, Cimahi",
      deadline: "Besok, 14:00",
      distance: "8.7 km",
      priority: "low",
    },
  ];

  // Mock history
  const surveyHistory = [
    {
      id: 101,
      supplier: "PT Sentosa",
      date: "12 Jun 2024",
      products: ["Keramik 60x60", "Granit 80x80"],
      result: "approved",
    },
    {
      id: 102,
      supplier: "CV Berkah",
      date: "10 Jun 2024",
      products: ["Pipa PVC 4 inch"],
      result: "rejected",
    },
    {
      id: 103,
      supplier: "PT Baja Utama",
      date: "8 Jun 2024",
      products: ["Besi Hollow", "Kawat Las"],
      result: "approved",
    },
    {
      id: 104,
      supplier: "UD Cahaya",
      date: "5 Jun 2024",
      products: ["Cat Tembok", "Thinner"],
      result: "approved",
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col bg-card border-r p-4 h-full">
        <div className="flex items-center mb-8">
          <div className="font-bold text-xl">Surveyor App</div>
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
              <div className="font-bold text-xl">Surveyor App</div>
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
            <span className="font-semibold ml-2">Surveyor App</span>
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
            <RoleSwitcher currentRole="surveyor" onRoleChange={() => {}} />
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
              <TabsTrigger value="active">Tugas Aktif</TabsTrigger>
              <TabsTrigger value="history">Riwayat</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <h1 className="text-2xl font-bold mb-4">Tugas Aktif</h1>

              {activeTasks.map((task) => (
                <Card
                  key={task.id}
                  className={`mb-4 border-l-4 ${task.priority === "high" ? "border-l-destructive" : task.priority === "medium" ? "border-l-orange-500" : "border-l-blue-500"}`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {task.supplier}
                        </h3>
                        <div className="text-sm text-muted-foreground mt-1">
                          Produk: {task.products.join(", ")}
                        </div>
                      </div>
                      <Badge
                        variant={
                          task.priority === "high"
                            ? "destructive"
                            : task.priority === "medium"
                              ? "default"
                              : "outline"
                        }
                      >
                        {task.priority === "high"
                          ? "Prioritas Tinggi"
                          : task.priority === "medium"
                            ? "Prioritas Sedang"
                            : "Prioritas Rendah"}
                      </Badge>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{task.address}</span>
                        <Badge variant="outline" className="ml-2">
                          {task.distance}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Deadline: {task.deadline}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        Lihat Peta
                      </Button>
                      <Button size="sm">Mulai Survey</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <h1 className="text-2xl font-bold mb-4">Riwayat Survey</h1>

              {surveyHistory.map((item) => (
                <Card key={item.id} className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {item.supplier}
                        </h3>
                        <div className="text-sm text-muted-foreground">
                          Produk: {item.products.join(", ")}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Tanggal: {item.date}
                        </div>
                      </div>
                      <Badge
                        variant={
                          item.result === "approved" ? "default" : "destructive"
                        }
                      >
                        {item.result === "approved" ? "Disetujui" : "Ditolak"}
                      </Badge>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        Lihat Detail
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

export default SurveyorDashboard;
