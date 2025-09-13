import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap, Target, Star } from "lucide-react";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  reason: string;
  planName: string;
  currentPlan?: string;
  savings?: string;
  priority: "high" | "medium" | "low";
  icon: any;
}

const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    title: "Upgrade to Premium",
    description: "Get unlimited projects and advanced analytics to boost your productivity.",
    reason: "You've reached 4/5 project limit on your Basic plan",
    planName: "Premium Plan",
    currentPlan: "Basic Plan",
    priority: "high",
    icon: TrendingUp,
  },
  {
    id: "2",
    title: "Consider Yearly Billing",
    description: "Save 20% by switching to annual billing for your Premium subscription.",
    reason: "Based on your usage patterns, annual billing would save you money",
    planName: "Premium Plan (Yearly)",
    currentPlan: "Premium Plan (Monthly)",
    savings: "Save $72/year",
    priority: "medium",
    icon: Target,
  },
  {
    id: "3",
    title: "Enterprise Features Available",
    description: "Your team size and usage suggest Enterprise features would be beneficial.",
    reason: "You're using 85GB of your 100GB storage limit",
    planName: "Enterprise Plan",
    currentPlan: "Premium Plan",
    priority: "medium",
    icon: Zap,
  },
];

export const Recommendations = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleRecommendationAction = (recommendation: Recommendation) => {
    console.log("Acting on recommendation:", recommendation.title);
    // Here you would handle the recommendation action (e.g., upgrade, switch billing)
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Recommendations</h1>
        <p className="text-muted-foreground mt-2">Personalized suggestions to optimize your subscription</p>
      </div>

      {/* AI-Powered Badge */}
      <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent shadow-soft">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Star className="h-5 w-5 text-accent" />
            <div>
              <h3 className="font-semibold text-foreground">AI-Powered Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Based on your usage patterns and subscription history
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockRecommendations.map((recommendation) => {
          const Icon = recommendation.icon;
          return (
            <Card 
              key={recommendation.id}
              className="shadow-soft hover:shadow-orange transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-primary">{recommendation.title}</CardTitle>
                      <Badge className={getPriorityColor(recommendation.priority)}>
                        {recommendation.priority} priority
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-foreground">{recommendation.description}</p>
                
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground font-medium">Why this recommendation?</p>
                  <p className="text-sm text-foreground mt-1">{recommendation.reason}</p>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-1">
                    {recommendation.currentPlan && (
                      <p className="text-xs text-muted-foreground">
                        Current: {recommendation.currentPlan}
                      </p>
                    )}
                    <p className="text-sm font-semibold text-primary">
                      Suggested: {recommendation.planName}
                    </p>
                    {recommendation.savings && (
                      <p className="text-sm font-semibold text-green-600">
                        {recommendation.savings}
                      </p>
                    )}
                  </div>
                  
                  <Button
                    onClick={() => handleRecommendationAction(recommendation)}
                    className="bg-accent hover:bg-accent-dark text-accent-foreground shadow-orange transition-all duration-300"
                  >
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Usage Insights */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-primary">Usage Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-foreground">4/5</div>
              <p className="text-sm text-muted-foreground">Projects Used</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-foreground">85GB</div>
              <p className="text-sm text-muted-foreground">Storage Used</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-foreground">98%</div>
              <p className="text-sm text-muted-foreground">Uptime This Month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};