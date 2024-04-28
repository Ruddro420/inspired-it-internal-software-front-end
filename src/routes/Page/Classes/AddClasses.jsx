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

const AddClasses = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <h1 className="text-2xl font-bold mb-3">Add Class</h1>
      <form className="border p-5 rounded">
        <div className="grid grid-cols-1 md:grid-cols-3 mt-3 gap-4">
          <label htmlFor="Name" className="md:col-span-1">
            Name
            <Input type="text" id="name" placeholder="Name" />
          </label>
          <label htmlFor="Tuition Fee" className="md:col-span-1">
            Tuition Fee
            <Input type="number" id="tuitionFee" placeholder="Tuition Fee" />
          </label>
          <label htmlFor="Assign Teacher" className="md:col-span-1">
            Assign Teacher
            <Input
              type="text"
              id="assignTeacher"
              placeholder="Assign Teacher"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default AddClasses;
