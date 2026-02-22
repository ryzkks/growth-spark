import { NavLink as RouterNavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, Sparkles, TrendingUp, Users, UserCircle, CreditCard, LogOut, Menu, BarChart3 } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview", end: true },
  { to: "/dashboard/analyze", icon: Sparkles, label: "Analyze Content" },
  { to: "/dashboard/growth-plan", icon: TrendingUp, label: "Growth Plan" },
  { to: "/dashboard/metrics", icon: BarChart3, label: "Metrics" },
  { to: "/dashboard/competitors", icon: Users, label: "Competitors" },
  { to: "/dashboard/account", icon: UserCircle, label: "Account" },
  { to: "/dashboard/billing", icon: CreditCard, label: "Billing" },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-sm bg-primary" />
          </div>
          <span className="font-display text-lg font-bold">MyAlgorithm</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <RouterNavLink key={to} to={to} end={end} onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary shadow-[0_0_10px_hsl(187_88%_43%/0.1)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`
            }>
            <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
            {label}
          </RouterNavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 px-4 py-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all w-full">
          <LogOut className="w-[18px] h-[18px]" strokeWidth={1.5} /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 glass border-r border-border/50 z-30">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-background/60" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 glass flex flex-col z-50">
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 lg:ml-64">
        <header className="lg:hidden flex items-center justify-between p-4 glass border-b border-border/50 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="text-muted-foreground hover:text-foreground p-1">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-display text-lg font-bold">MyAlgorithm</span>
          <div className="w-8" />
        </header>
        <main className="p-6 lg:p-10 max-w-7xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
