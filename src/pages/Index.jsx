import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Sneaker Accounting</h1>
      <p className="text-xl mb-8 text-center max-w-md">
        Track your sneaker side-hustle transactions with ease. Add, edit, and manage your sneaker purchases and sales.
      </p>
      <Button asChild size="lg">
        <Link to="/transactions">View Transactions</Link>
      </Button>
    </div>
  );
};

export default Index;