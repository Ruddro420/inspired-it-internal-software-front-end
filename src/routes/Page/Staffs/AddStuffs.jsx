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
} from "@/components/ui/select"

const AddStuffs = () => {
    return (
        <div style={{ overflow: "hidden" }}>
        <h1 className="text-2xl font-bold mb-3">Add Staffs</h1>
        <form className="border p-5 rounded">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            <label htmlFor="Name" className="md:col-span-1">
              Name
              < Input type="text" id="name" placeholder="Name" required/>
            </label>
            <label htmlFor="Mobile Number" className="md:col-span-1">
              Mobile Number
              <Input type="number" id="mobileNumber" placeholder="Mobile Number" required />
            </label>
            <label htmlFor="Present Address" className="md:col-span-1">
            Present Address
              <Input type="text" id="presentAddress" placeholder="Present Address" required />
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            <label htmlFor="Permanent Address" className="md:col-span-1">
            Permanent Address
              <Input type="text" id="permanentAddress" placeholder="Permanent Address" required/>
            </label>
            <label htmlFor="Email" className="md:col-span-1">
              Email
              <Input type="email" id="email" placeholder="Email" required />
            </label>
            <label htmlFor="Joining Date" className="md:col-span-1">
            Joining Date
              <Input type="date" id="joiningDate" placeholder="Joining Date" required/>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            <label htmlFor="Salary" className="md:col-span-1">
            Salary
              <Input type="number" id="salary" placeholder="Salary" required />
            </label>
            <label htmlFor="NID Number" className="md:col-span-1">
            NID Number
              <Input type="number" id="NIDNumber" placeholder="NID Number" required/>
            </label>
            <label htmlFor="Image" className="md:col-span-1">
            Image
              <Input type="file" id="image" placeholder="Upload file"  required/>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            <label htmlFor="Gender" className="md:col-span-1">
             Select Gender
             <Select>
                            <SelectTrigger >
                                <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Gender</SelectLabel>
                                    <SelectItem value="apple">Male</SelectItem>
                                    <SelectItem value="apple">Female</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
            </label>
            <label htmlFor="Designation" className="md:col-span-1">
            Designation
              <Input type="text" id="designation" placeholder="Designation" required/>
            </label>
            <label htmlFor="Department" className="md:col-span-1">
            Department
              <Input type="text" id="department" placeholder="Department" required/>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            <label htmlFor="Date of Birth" className="md:col-span-1">
            Date of Birth
              <Input type="date" id="dateOfBirth" placeholder="Date of Birth" required />
            </label>
            <label htmlFor="Education" className="md:col-span-1">
            Education
              <Input type="text" id="education" placeholder="Education" required/>
            </label>
            <label htmlFor="Blood Group" className="md:col-span-1">
            Blood Group
              <Input type="text" id="bloodGroup" placeholder="Blood Group" required />
            </label>
          </div>
          <Button size="sm" className="h-8 gap-1 mt-5">
                    Add Staff
                </Button>
        </form>
        
      </div> 
    );
};

export default AddStuffs;