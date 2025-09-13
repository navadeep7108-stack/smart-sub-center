import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubscriptionModal } from "./SubscriptionModal";

interface Subscription {
  id: string;
  planName: string;
  status: "active" | "paused" | "terminated";
  startDate: string;
  endDate: string;
  price: number;
}

const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    planName: "Premium Plan",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-12-15",
    price: 29.99,
  },
  {
    id: "2",
    planName: "Basic Plan",
    status: "paused",
    startDate: "2023-06-01",
    endDate: "2024-06-01",
    price: 9.99,
  },
  {
    id: "3",
    planName: "Enterprise Plan",
    status: "active",
    startDate: "2024-03-01",
    endDate: "2025-03-01",
    price: 99.99,
  },
];

export const MySubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<{type: string; subscription: Subscription} | null>(null);

  const handleAction = (type: string, subscription: Subscription) => {
    setModalAction({ type, subscription });
    setModalOpen(true);
  };

  const confirmAction = () => {
    if (!modalAction) return;

    const { type, subscription } = modalAction;
    
    setSubscriptions(prev => prev.map(sub => {
      if (sub.id === subscription.id) {
        switch (type) {
          case "cancel":
            return { ...sub, status: "terminated" as const };
          case "renew":
            return { ...sub, status: "active" as const };
          default:
            return sub;
        }
      }
      return sub;
    }));

    setModalOpen(false);
    setModalAction(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "paused":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "terminated":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Subscriptions</h1>
        <p className="text-muted-foreground mt-2">Manage your active subscriptions and billing</p>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-primary">Active Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Plan Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Start Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">End Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((subscription) => (
                  <tr 
                    key={subscription.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors duration-200"
                  >
                    <td className="py-4 px-4 font-medium text-foreground">{subscription.planName}</td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(subscription.status)}>
                        {subscription.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{subscription.startDate}</td>
                    <td className="py-4 px-4 text-muted-foreground">{subscription.endDate}</td>
                    <td className="py-4 px-4 font-semibold text-foreground">${subscription.price}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction("upgrade", subscription)}
                          className="hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                        >
                          Upgrade
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction("downgrade", subscription)}
                          className="hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                        >
                          Downgrade
                        </Button>
                        {subscription.status === "active" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAction("cancel", subscription)}
                            className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-300"
                          >
                            Cancel
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleAction("renew", subscription)}
                            className="bg-accent hover:bg-accent-dark text-accent-foreground shadow-orange transition-all duration-300"
                          >
                            Renew
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <SubscriptionModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        action={modalAction}
        onConfirm={confirmAction}
      />
    </div>
  );
};