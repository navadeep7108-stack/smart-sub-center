import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Auth = () => {
  const handleLogin = () => {
    // Mock login - redirect to dashboard
    window.location.href = "/user";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-soft">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary">Welcome Back</CardTitle>
          <p className="text-muted-foreground">Sign in to access your dashboard</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleLogin}
            className="w-full bg-accent hover:bg-accent-dark text-accent-foreground shadow-orange transition-all duration-300"
          >
            Sign In
          </Button>
          <Button 
            onClick={() => window.location.href = "/"}
            variant="outline"
            className="w-full"
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;