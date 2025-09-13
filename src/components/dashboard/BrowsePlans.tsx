import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { SubscriptionModal } from "./SubscriptionModal";

interface Plan {
  id: string;
  name: string;
  price: number;
  type: "monthly" | "yearly" | "lifetime";
  features: string[];
  popular?: boolean;
}

const mockPlans: Plan[] = [
  {
    id: "1",
    name: "Basic Plan",
    price: 9.99,
    type: "monthly",
    features: ["5 Projects", "10GB Storage", "Email Support", "Basic Analytics"],
  },
  {
    id: "2",
    name: "Premium Plan",
    price: 29.99,
    type: "monthly",
    features: ["Unlimited Projects", "100GB Storage", "Priority Support", "Advanced Analytics", "Custom Domains"],
    popular: true,
  },
  {
    id: "3",
    name: "Enterprise Plan",
    price: 99.99,
    type: "monthly",
    features: ["Everything in Premium", "500GB Storage", "24/7 Phone Support", "Team Collaboration", "API Access", "SLA Guarantee"],
  },
  {
    id: "4",
    name: "Yearly Basic",
    price: 99.99,
    type: "yearly",
    features: ["Basic Plan Features", "2 Months Free", "Annual Billing"],
  },
  {
    id: "5",
    name: "Lifetime Pro",
    price: 499.99,
    type: "lifetime",
    features: ["Premium Features", "Lifetime Access", "No Monthly Fees", "Priority Updates"],
  },
];

export const BrowsePlans = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleSubscribe = (plan: Plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const confirmSubscription = () => {
    if (selectedPlan) {
      // Here you would handle the subscription logic
      console.log("Subscribing to:", selectedPlan.name);
      setModalOpen(false);
      setSelectedPlan(null);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "monthly":
        return "bg-blue-100 text-blue-800";
      case "yearly":
        return "bg-green-100 text-green-800";
      case "lifetime":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Browse Plans</h1>
        <p className="text-muted-foreground mt-2">Choose the perfect plan for your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`
              relative shadow-soft hover:shadow-orange transition-all duration-300 transform hover:-translate-y-1
              ${plan.popular ? 'ring-2 ring-accent' : ''}
            `}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-accent text-accent-foreground px-3 py-1">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CardTitle className="text-xl text-primary">{plan.name}</CardTitle>
                <Badge className={getTypeColor(plan.type)}>
                  {plan.type}
                </Badge>
              </div>
              <div className="text-3xl font-bold text-foreground">
                ${plan.price}
                <span className="text-base font-normal text-muted-foreground">
                  {plan.type === "lifetime" ? " once" : `/${plan.type === "yearly" ? "year" : "month"}`}
                </span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                onClick={() => handleSubscribe(plan)}
                className={`
                  w-full transition-all duration-300
                  ${plan.popular 
                    ? 'bg-accent hover:bg-accent-dark text-accent-foreground shadow-orange' 
                    : 'hover:bg-accent hover:text-accent-foreground'
                  }
                `}
                variant={plan.popular ? "default" : "outline"}
              >
                Subscribe Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <SubscriptionModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        action={selectedPlan ? { type: "subscribe", subscription: selectedPlan as any } : null}
        onConfirm={confirmSubscription}
      />
    </div>
  );
};