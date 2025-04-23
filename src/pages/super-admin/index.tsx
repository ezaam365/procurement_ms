import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Settings,
  Menu,
  Users,
  FileText,
  Database,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("roles");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock user data
  const user = {
    name: "Admin System",
    role: "Super Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=superadmin",
    notifications: 2,
  };

  // Navigation items
  const navItems = [
    { id: "roles", label: "Role Customization", icon: "👥" },
    { id: "logs", label: "Log System", icon: "📋" },
  ];

  // Mock roles data
  const rolesData = [
    {
      id: "procurement_manager",
      name: "Procurement Manager",
      users: 5,
      permissions: 12,
      lastModified: "10 Jun 2024",
    },
    {
      id: "supplier",
      name: "Supplier",
      users: 124,
      permissions: 8,
      lastModified: "12 Jun 2024",
    },
    {
      id: "surveyor",
      name: "Surveyor",
      users: 15,
      permissions: 6,
      lastModified: "8 Jun 2024",
    },
    {
      id: "warehouse",
      name: "Petugas Warehouse",
      users: 8,
      permissions: 7,
      lastModified: "5 Jun 2024",
    },
    {
      id: "admin_regional",
      name: "Admin Daerah",
      users: 4,
      permissions: 10,
      lastModified: "15 Jun 2024",
    },
    {
      id: "direksi",
      name: "Direksi",
      users: 3,
      permissions: 9,
      lastModified: "1 Jun 2024",
    },
    {
      id: "super_admin",
      name: "Super Admin",
      users: 2,
      permissions: 15,
      lastModified: "2 Jun 2024",
    },
  ];

  // Mock system logs
  const systemLogs = [
    {
      id: 1,
      timestamp: "2024-06-15 14:32:45",
      user: "Ahmad (Surveyor)",
      action: "Login",
      details: "Login berhasil dari IP 192.168.1.105",
      level: "info",
    },
    {
      id: 2,
      timestamp: "2024-06-15 14:28:12",
      user: "System",
      action: "Database Backup",
      details: "Backup otomatis berhasil",
      level: "info",
    },
    {
      id: 3,
      timestamp: "2024-06-15 13:45:22",
      user: "Budi (Admin Daerah)",
      action: "Update Role",
      details: "Mengubah permission untuk role Surveyor",
      level: "warning",
    },
    {
      id: 4,
      timestamp: "2024-06-15 12:15:08",
      user: "System",
      action: "Error",
      details: "Failed to connect to payment gateway",
      level: "error",
    },
    {
      id: 5,
      timestamp: "2024-06-15 11:30:45",
      user: "Cindy (Procurement Manager)",
      action: "Create PO",
      details: "Membuat PO baru dengan ID PO-2024-006",
      level: "info",
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col bg-card border-r p-4 h-full">
        <div className="flex items-center mb-8">
          <div className="font-bold text-xl">Super Admin</div>
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
              <div className="font-bold text-xl">Super Admin</div>
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
            <span className="font-semibold ml-2">Super Admin</span>
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
            <RoleSwitcher currentRole="super-admin" onRoleChange={() => {}} />
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
              <TabsTrigger value="roles">Role Customization</TabsTrigger>
              <TabsTrigger value="logs">Log System</TabsTrigger>
            </TabsList>

            <TabsContent value="roles" className="space-y-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Role Customization</h1>
                <Button>
                  <Users className="h-4 w-4 mr-2" /> Tambah Role Baru
                </Button>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Role Name</th>
                          <th className="text-center py-3 px-4">Users</th>
                          <th className="text-center py-3 px-4">Permissions</th>
                          <th className="text-center py-3 px-4">
                            Last Modified
                          </th>
                          <th className="text-right py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rolesData.map((role) => (
                          <tr key={role.id} className="border-b last:border-0">
                            <td className="py-3 px-4">
                              <div className="font-medium">{role.name}</div>
                              <div className="text-xs text-muted-foreground">
                                ID: {role.id}
                              </div>
                            </td>
                            <td className="text-center py-3 px-4">
                              {role.users}
                            </td>
                            <td className="text-center py-3 px-4">
                              {role.permissions}
                            </td>
                            <td className="text-center py-3 px-4">
                              {role.lastModified}
                            </td>
                            <td className="text-right py-3 px-4">
                              <div className="flex justify-end space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Shield className="h-4 w-4 mr-2" />{" "}
                                  Permissions
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <FileText className="h-4 w-4 mr-2" /> Edit
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-4">
                      Permission Groups
                    </h3>
                    <div className="space-y-2">
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div>
                          <div className="font-medium">User Management</div>
                          <div className="text-xs text-muted-foreground">
                            4 permissions
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div>
                          <div className="font-medium">Procurement</div>
                          <div className="text-xs text-muted-foreground">
                            6 permissions
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div>
                          <div className="font-medium">Supplier Management</div>
                          <div className="text-xs text-muted-foreground">
                            5 permissions
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div>
                          <div className="font-medium">
                            System Configuration
                          </div>
                          <div className="text-xs text-muted-foreground">
                            8 permissions
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-4">
                      Recent Role Changes
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/30 rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">Admin Daerah</div>
                            <div className="text-xs text-muted-foreground">
                              Added "Approve PO" permission
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            15 Jun 2024
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">Supplier</div>
                            <div className="text-xs text-muted-foreground">
                              Updated menu access
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            12 Jun 2024
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">Surveyor</div>
                            <div className="text-xs text-muted-foreground">
                              Modified field access permissions
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            8 Jun 2024
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="logs" className="space-y-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">System Logs</h1>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Database className="h-4 w-4 mr-2" /> Export Logs
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" /> Generate Report
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Timestamp</th>
                          <th className="text-left py-3 px-4">User</th>
                          <th className="text-left py-3 px-4">Action</th>
                          <th className="text-left py-3 px-4">Details</th>
                          <th className="text-center py-3 px-4">Level</th>
                        </tr>
                      </thead>
                      <tbody>
                        {systemLogs.map((log) => (
                          <tr key={log.id} className="border-b last:border-0">
                            <td className="py-3 px-4 font-mono text-xs">
                              {log.timestamp}
                            </td>
                            <td className="py-3 px-4">{log.user}</td>
                            <td className="py-3 px-4 font-medium">
                              {log.action}
                            </td>
                            <td className="py-3 px-4">{log.details}</td>
                            <td className="text-center py-3 px-4">
                              <Badge
                                variant={
                                  log.level === "error"
                                    ? "destructive"
                                    : log.level === "warning"
                                      ? "secondary"
                                      : "default"
                                }
                              >
                                {log.level}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-4">
                      System Status
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Database</span>
                        <Badge variant="outline" className="bg-green-100">
                          Online
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>API Services</span>
                        <Badge variant="outline" className="bg-green-100">
                          Online
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>File Storage</span>
                        <Badge variant="outline" className="bg-green-100">
                          Online
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Payment Gateway</span>
                        <Badge variant="outline" className="bg-red-100">
                          Offline
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-4">
                      Error Distribution
                    </h3>
                    <div className="h-40 flex items-center justify-center bg-muted/30 rounded-md">
                      <p className="text-muted-foreground">
                        Error Chart Placeholder
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-4">
                      User Activity
                    </h3>
                    <div className="h-40 flex items-center justify-center bg-muted/30 rounded-md">
                      <p className="text-muted-foreground">
                        Activity Chart Placeholder
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
