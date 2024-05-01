import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ViewAccounts from "./ViewAccounts";
const AddAccounts = () => {
    return (
        <> <div style={{ overflow: "hidden" }}>
            <h1 className="text-2xl font-bold mb-3">Add Accounts</h1>
            <form className="border p-5 rounded">
                <div className="grid grid-cols-1 md:grid-cols-3 mt-3 gap-4">
                    <label htmlFor="Name" className="md:col-span-1">
                        Name Of Head
                        <Input type="text" name="name" placeholder="Name Of Head" />
                    </label>
                    <label htmlFor="Tuition Fee" className="md:col-span-1">
                        Type
                        <Select>
                            <SelectTrigger >
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Type</SelectLabel>
                                    <SelectItem value="income">Income</SelectItem>
                                    <SelectItem value="expense">Expense</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </label>
                    <label htmlFor="Assign Teacher" className="md:col-span-1">
                        Date
                        <Input
                            type="date"
                            name="date"
                        />
                    </label>
                </div>
                <Button size="sm" className="h-8 gap-1 mt-5">
                    Add Accounts
                </Button>
            </form>
        </div>
            {/* View Account */}
            <ViewAccounts />
        </>

    );
};

export default AddAccounts;