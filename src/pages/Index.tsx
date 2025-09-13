import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="mb-4 text-4xl font-bold text-primary">Subscription Management</h1>
        <p className="text-xl text-muted-foreground">Welcome to your subscription portal</p>
        <Button 
          onClick={() => window.location.href = "/user"}
          className="bg-accent hover:bg-accent-dark text-accent-foreground shadow-orange transition-all duration-300"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Index;
