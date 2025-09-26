
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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
import CustomNotFound from "./components/CustomNotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import ForgotPassword from "./pages/admin/ForgotPassword";
import ResetPassword from "./pages/admin/ResetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
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
          {/* Blog routes */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/reset-password" element={<ResetPassword />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<CustomNotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;