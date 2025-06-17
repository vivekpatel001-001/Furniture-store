  import { TooltipProvider } from "../ui/tooltip";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { Routes, Route } from "react-router-dom";
  import Index from './Pages/index'
  import NotFound from "./Pages/NotFound";
  import { Toaster } from 'sonner';
  import { Outlet } from 'react-router-dom';

  const queryClient = new QueryClient();

  const App = () => (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="top-right" />
      <TooltipProvider>
      <Index>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Chairs" element={<Index />} />
          <Route path="/Dining" element={<Index />} />
          <Route path="/Home-decor" element={<Index />} />
          <Route path="/lamp" element={<Index />} />
          <Route path="/beds" element={<Index />} />
          <Route path="/sofa-set" element={<Index />} />
          <Route path="/tv-units" element={<Index />} />
          <Route path="/bookshelves" element={<Index />} />
          <Route path="/shoe-racks" element={<Index />} />
          <Route path="/wardrobes" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Outlet />
        </Index>
      </TooltipProvider>
    </QueryClientProvider>

  );

  export default App;


