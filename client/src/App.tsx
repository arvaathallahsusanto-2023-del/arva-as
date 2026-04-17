import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Mirofish from "@/pages/Mirofish";
import NotFound from "@/pages/not-found";

import EcosystemDashboard from "@/pages/ecosystem/Dashboard";
import RegisterStakeholder from "@/pages/ecosystem/Register";
import NetworkExplorer from "@/pages/ecosystem/Network";

import PosyanduDashboard from "@/pages/posyandu/Dashboard";
import PosyanduPatientList from "@/pages/posyandu/PatientList";
import PosyanduRegister from "@/pages/posyandu/RegisterPatient";
import PosyanduInputRecord from "@/pages/posyandu/InputRecord";
import PosyanduPatientDetail from "@/pages/posyandu/PatientDetail";

function Router() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020617] font-sans text-slate-200 selection:bg-cyan-500/30">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Mirofish} />
          <Route path="/mirofish" component={Mirofish} />

          {/* Ecosystem Routes */}
          <Route path="/ecosystem" component={EcosystemDashboard} />
          <Route path="/ecosystem/register" component={RegisterStakeholder} />
          <Route path="/ecosystem/network" component={NetworkExplorer} />

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
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
