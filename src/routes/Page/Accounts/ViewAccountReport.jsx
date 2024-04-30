import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GenereateReport from "./GenereateReport";
const ViewAccountReport = () => {
    return (
        <> <div style={{ overflow: "hidden" }}>
            <h1 className="text-2xl font-bold mb-3">Report Details</h1>
            <form className="border p-5 rounded">
                <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-4">
                    <label htmlFor="Assign Teacher" className="md:col-span-1">
                        From
                        <Input
                            type="date"
                            name="fromdDate"
                        />
                    </label>
                    <label htmlFor="Assign Teacher" className="md:col-span-1">
                        To
                        <Input
                            type="date"
                            name="toDate"
                        />
                    </label>
                </div>
                <Button size="sm" className="h-8 gap-1 mt-5">
                    Generate Report
                </Button>
            </form>
        </div>
            {/* View Account */}
            <GenereateReport />
        </>

    );
};

export default ViewAccountReport;