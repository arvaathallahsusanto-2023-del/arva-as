import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import ArticleDetail from "@/pages/ArticleDetail";
import CategoryPage from "@/pages/CategoryPage";
import About from "@/pages/About";
import Mirofish from "@/pages/Mirofish";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground selection:bg-primary/20">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Mirofish} />
          <Route path="/old-home" component={Home} />
          <Route path="/article/:slug" component={ArticleDetail} />
          <Route path="/category/:slug" component={CategoryPage} />
          <Route path="/about" component={About} />
          <Route path="/mirofish" component={Mirofish} />

          {/* Posyandu Routes */}
          <Route path="/posyandu" component={PosyanduDashboard} />
          <Route path="/posyandu/patients" component={PosyanduPatientList} />
          <Route path="/posyandu/register" component={PosyanduRegister} />
          <Route path="/posyandu/record/new" component={PosyanduInputRecord} />
          <Route path="/posyandu/patients/:id" component={PosyanduPatientDetail} />

          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
