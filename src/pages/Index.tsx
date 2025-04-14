
import { MainLayout } from "@/components/layout/MainLayout";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Home from "./Home";

const Index = () => {
  return (
    <ThemeProvider>
      <MainLayout>
        <Home />
      </MainLayout>
    </ThemeProvider>
  );
};

export default Index;
