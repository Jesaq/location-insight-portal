
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const SubLocationSelect = lazy(() => import("./pages/SubLocationSelect"));
const ServicesSelection = lazy(() => import("./pages/ServicesSelection"));
const EncroachmentView = lazy(() => import("./pages/EncroachmentView"));
const EncroachmentImages = lazy(() => import("./pages/EncroachmentImages"));
const EncroachmentGraphs = lazy(() => import("./pages/EncroachmentGraphs"));
const WeatherDetails = lazy(() => import("./pages/WeatherDetails"));
const FloodData = lazy(() => import("./pages/FloodData"));

// Loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="glass-panel p-8 animate-pulse-subtle">
      <p className="text-blue font-medium">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/location/:locationId" element={<SubLocationSelect />} />
            <Route path="/services/:locationId/:sublocationId" element={<ServicesSelection />} />
            <Route path="/encroachment/:locationId/:sublocationId" element={<EncroachmentView />} />
            <Route path="/encroachment/images/:locationId/:sublocationId" element={<EncroachmentImages />} />
            <Route path="/encroachment/graphs/:locationId/:sublocationId" element={<EncroachmentGraphs />} />
            <Route path="/weather/:locationId/:sublocationId" element={<WeatherDetails />} />
            <Route path="/flood/:locationId/:sublocationId" element={<FloodData />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
