import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/context/AppContext";
import BottomNav from "@/components/BottomNav";

import { Welcome, Onboarding, SignUp, SignIn } from "@/pages/AuthPages";
import HomePage from "@/pages/HomePage";
import WardrobePage from "@/pages/WardrobePage";
import ItemDetailPage from "@/pages/ItemDetailPage";
import AddItemPage from "@/pages/AddItemPage";
import { OutfitsPage, CreateOutfitPage, OutfitDetailPage } from "@/pages/OutfitsPages";
import { StylistBrowsePage, StylistProfilePage, BookingPage } from "@/pages/StylistPages";
import { OrderTagsSelectPage, OrderTagsShippingPage, OrderTagsReviewPage, OrderTagsConfirmPage } from "@/pages/OrderTagsPages";
import { ProfilePage, OrdersPage, NotificationsPage, TagPreviewPage } from "@/pages/ProfilePages";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="max-w-[390px] mx-auto relative min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/wardrobe" element={<WardrobePage />} />
              <Route path="/wardrobe/:id" element={<ItemDetailPage />} />
              <Route path="/add" element={<AddItemPage />} />
              <Route path="/outfits" element={<OutfitsPage />} />
              <Route path="/outfits/create" element={<CreateOutfitPage />} />
              <Route path="/outfits/:id" element={<OutfitDetailPage />} />
              <Route path="/stylists" element={<StylistBrowsePage />} />
              <Route path="/stylists/:id" element={<StylistProfilePage />} />
              <Route path="/stylists/:id/book" element={<BookingPage />} />
              <Route path="/order-tags" element={<OrderTagsSelectPage />} />
              <Route path="/order-tags/shipping" element={<OrderTagsShippingPage />} />
              <Route path="/order-tags/review" element={<OrderTagsReviewPage />} />
              <Route path="/order-tags/confirmation" element={<OrderTagsConfirmPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/orders" element={<OrdersPage />} />
              <Route path="/profile/notifications" element={<NotificationsPage />} />
              <Route path="/tags/preview/:id" element={<TagPreviewPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNav />
          </div>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
