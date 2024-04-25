import Transaction from "@/components/app_components/DashboardComponent/Transaction";
import PieChart from "@/components/app_components/DashboardComponent/Graph/PieChart";
import LineChart from "@/components/app_components/DashboardComponent/Graph/LineChart";


export default function DashboardContent() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div>
        <Transaction></Transaction>
      </div>

      <div className="grid justify-center items-center col-span-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 my-10">
        <div className="xl:col-span-2">
            <LineChart></LineChart>
        </div>
        <div className="xl:col-span-1">
          <PieChart></PieChart>
        </div>
      </div>
    </div>
  );
}
