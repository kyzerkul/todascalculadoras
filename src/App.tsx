
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNav from "./components/MainNav";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CalculatorsDirectory from "./pages/CalculatorsDirectory";
import CategoryPage from "./pages/CategoryPage";
import CalculatorPage from "./pages/CalculatorPage";
import Blog from "./pages/Blog";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <MainNav />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/calculadoras" element={<CalculatorsDirectory />} />
              <Route path="/categoria/:categoryId" element={<CategoryPage />} />
              <Route path="/calculadora/:calculatorId" element={<CalculatorPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/sobre-nosotros" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
