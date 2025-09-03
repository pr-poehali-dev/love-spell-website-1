
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ArticlePage from "./pages/ArticlePage";
import ArticleHusbandPage from "./pages/ArticleHusbandPage";
import LoveSuggestionPage from "./pages/LoveSuggestionPage";
import LonelinessRemovalPage from "./pages/LonelinessRemovalPage";
import LoveAttractionPage from "./pages/LoveAttractionPage";
import PhotoSpellPage from "./pages/PhotoSpellPage";
import RivalRemovalPage from "./pages/RivalRemovalPage";
import EnergyGatheringPage from "./pages/EnergyGatheringPage";
import ReconciliationPage from "./pages/ReconciliationPage";
import VoltaPage from "./pages/VoltaPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privorot-na-zhenu" element={<ArticlePage />} />
          <Route path="/privorot-na-muzha" element={<ArticleHusbandPage />} />
          <Route path="/vnushenie-lyubvi" element={<LoveSuggestionPage />} />
          <Route path="/snyatie-odinochestva" element={<LonelinessRemovalPage />} />
          <Route path="/privlechenie-lyubvi" element={<LoveAttractionPage />} />
          <Route path="/privorot-na-foto" element={<PhotoSpellPage />} />
          <Route path="/ot-sopernitsy" element={<RivalRemovalPage />} />
          <Route path="/nabor-energii" element={<EnergyGatheringPage />} />
          <Route path="/primirenie" element={<ReconciliationPage />} />
          <Route path="/volta" element={<VoltaPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;