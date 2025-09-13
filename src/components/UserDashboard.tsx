import { useState } from "react";
import { Menu, X, User, CreditCard, Package, Lightbulb, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MySubscriptions } from "./dashboard/MySubscriptions";
import { BrowsePlans } from "./dashboard/BrowsePlans";
import { BillingHistory } from "./dashboard/BillingHistory";
import { Recommendations } from "./dashboard/Recommendations";

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("subscriptions");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "subscriptions", label: "My Subscriptions", icon: Package },
    { id: "plans", label: "Browse Plans", icon: CreditCard },
    { id: "billing", label: "Billing History", icon: User },
    { id: "recommendations", label: "Recommendations", icon: Lightbulb },
  ];

  const handleLogout = () => {
    // Navigate to auth page
    window.location.href = "/auth";
  };

  const renderContent = () => {
    switch (activeSection) {
      case "subscriptions":
        return <MySubscriptions />;
      case "plans":
        return <BrowsePlans />;
      case "billing":
        return <BillingHistory />;
      case "recommendations":
        return <Recommendations />;
      default:
        return <MySubscriptions />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white shadow-lg"
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-72 
        bg-primary text-primary-foreground 
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        shadow-xl
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-primary-foreground/20">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-primary-foreground/80 text-sm mt-1">Welcome back!</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6">
            <ul className="space-y-2 px-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveSection(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center px-4 py-3 rounded-lg text-left
                        transition-all duration-300 group
                        ${activeSection === item.id 
                          ? 'bg-accent text-accent-foreground shadow-orange' 
                          : 'text-primary-foreground hover:bg-accent/10 hover:text-accent'
                        }
                      `}
                    >
                      <Icon className="h-5 w-5 mr-3 transition-transform group-hover:scale-110" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-primary-foreground/20">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-primary-foreground hover:bg-accent/10 hover:text-accent transition-all duration-300"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8 pt-16 lg:pt-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;