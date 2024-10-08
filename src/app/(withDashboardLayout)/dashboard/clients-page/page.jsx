import AllClients from "@/components/DashboardComponent/OurClients/AllClients";
import { Suspense } from "react";
const ClientsPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AllClients />
      </Suspense>
    </div>
  );
};

export default ClientsPage;
