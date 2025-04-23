import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserRound, Users, LogOut } from "lucide-react";

export type UserRole =
  | "procurement_manager"
  | "supplier"
  | "surveyor"
  | "warehouse"
  | "admin_regional"
  | "direksi"
  | "super_admin";

interface RoleSwitcherProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const roleInfo = {
  procurement_manager: {
    label: "Procurement Manager",
    description: "Mengelola seluruh proses pengadaan barang dan jasa",
    icon: <UserRound className="h-5 w-5" />,
    menus: [
      "Dashboard",
      "Procurement Pipeline",
      "Supplier Management",
      "Survey Management",
      "Purchase Orders",
      "Executive Reporting",
    ],
  },
  supplier: {
    label: "Supplier",
    description:
      "Pemasok bahan baku yang berinteraksi dengan sistem untuk menjual produk",
    icon: <Users className="h-5 w-5" />,
    menus: [
      "Dashboard Supplier",
      "Manajemen Produk",
      "Negosiasi Harga",
      "Purchase Order",
      "Loyalitas",
    ],
  },
  surveyor: {
    label: "Surveyor",
    description: "Tim lapangan yang memverifikasi kelayakan produk supplier",
    icon: <UserRound className="h-5 w-5" />,
    menus: ["Tugas Aktif", "Riwayat"],
  },
  warehouse: {
    label: "Petugas Warehouse",
    description: "Menerima & memeriksa fisik barang yang dikirim supplier",
    icon: <UserRound className="h-5 w-5" />,
    menus: ["Penerimaan Barang", "Laporan Harian"],
  },
  admin_regional: {
    label: "Admin Daerah",
    description: "Mengawasi operasional procurement di level regional",
    icon: <UserRound className="h-5 w-5" />,
    menus: ["Penugasan Surveyor", "Analisis Supplier", "PO Management"],
  },
  direksi: {
    label: "Direksi",
    description: "Memantau kinerja procurement secara makro",
    icon: <UserRound className="h-5 w-5" />,
    menus: ["Executive Dashboard", "Approval Kebijakan"],
  },
  super_admin: {
    label: "Super Admin",
    description: "Tim IT yang mengkonfigurasi sistem",
    icon: <UserRound className="h-5 w-5" />,
    menus: ["Role Customization", "Log System"],
  },
};

const RoleSwitcher: React.FC<RoleSwitcherProps> = ({
  currentRole,
  onRoleChange,
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<UserRole>(currentRole);

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
  };

  const confirmRoleChange = () => {
    onRoleChange(selectedRole);
    setIsDialogOpen(false);

    // Redirect to the appropriate role-based application
    switch (selectedRole) {
      case "supplier":
        window.location.href = "/supplier";
        break;
      case "surveyor":
        window.location.href = "/surveyor";
        break;
      case "warehouse":
        window.location.href = "/warehouse";
        break;
      case "admin_regional":
        window.location.href = "/admin";
        break;
      case "direksi":
        window.location.href = "/direksi";
        break;
      case "super_admin":
        window.location.href = "/super-admin";
        break;
      case "procurement_manager":
      default:
        window.location.href = "/";
        break;
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          {roleInfo[currentRole].icon}
          <span className="hidden md:inline">
            {roleInfo[currentRole].label}
          </span>
          <LogOut className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Switch Role</DialogTitle>
          <DialogDescription>
            Select a different role to access different features and
            permissions.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 space-y-4">
          <Select
            value={selectedRole}
            onValueChange={(value) => handleRoleChange(value as UserRole)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(roleInfo).map(([roleKey, roleData]) => (
                <SelectItem key={roleKey} value={roleKey}>
                  <div className="flex items-center gap-2">
                    {roleData.icon}
                    <span>{roleData.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium mb-2">{roleInfo[selectedRole].label}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {roleInfo[selectedRole].description}
            </p>

            <h4 className="text-sm font-medium mb-2">Available Menus:</h4>
            <ul className="space-y-1">
              {roleInfo[selectedRole].menus.map((menu, index) => (
                <li key={index} className="text-sm flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  {menu}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={confirmRoleChange}>Switch Role</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoleSwitcher;
