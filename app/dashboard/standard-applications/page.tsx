import ServiceApplicationsManager from "./ui/ServiceApplicationsManager";
import AvailabilityScheduler from "./ui/AvailabilityScheduler";

export default function StandardApplications() {
  return (
    <main className="bg-primary flex flex-col lg:flex-row min-h-screen font-sans gap-8 py-10 px-8">
      <div className="flex-1">
        <ServiceApplicationsManager />
      </div>
      <div className="flex-1">
        <AvailabilityScheduler />
      </div>
    </main>
  );
}
