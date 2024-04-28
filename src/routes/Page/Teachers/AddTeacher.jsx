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

const AddTeacher = () => {
    return (
        <div style={{ overflow: "hidden" }}>
            <h1 className="text-2xl font-bold mb-3">Add Teachers</h1>
            <form>
                <section className="border p-5 rounded">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <label htmlFor="Name" className="md:col-span-1">
                            Name
                            <Input type="text" name="name" placeholder="Name" />
                        </label>
                        <label htmlFor="Mobile Number" className="md:col-span-1">
                            Mobile Number
                            <Input type="number" name="mobileNumber" placeholder="Mobile Number" />
                        </label>
                        <label htmlFor="Present Address" className="md:col-span-1">
                            Present Address
                            <Input type="email" name="presentAddress" placeholder="Present Address" />
                        </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                        <label htmlFor="Permanent Address" className="md:col-span-1">
                            Permanent Address
                            <Input type="text" name="permanentAddress" placeholder="Permanent Address" />
                        </label>
                        <label htmlFor="Email" className="md:col-span-1">
                            Email
                            <Input type="email" name="email" placeholder="Email" />
                        </label>
                        <label htmlFor="Joining Date" className="md:col-span-1">
                            Joining Date
                            <Input type="date" name="joiningDate" placeholder="Joining Date" />
                        </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                        <label htmlFor="Salary" className="md:col-span-1">
                            Salary
                            <Input type="number" name="salary" placeholder="Salary" />
                        </label>
                        <label htmlFor="NID Number" className="md:col-span-1">
                            NID Number
                            <Input type="number" name="NIDNumber" placeholder="NID Number" />
                        </label>
                        <label htmlFor="Image" className="md:col-span-1">
                            Image
                            <Input type="file" name="image" />
                        </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                    <label htmlFor="Gender" className="md:col-span-1">
             Select Gender
             <Select>
                            <SelectTrigger >
                                <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Gender</SelectLabel>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
            </label>
                        <label htmlFor="Designation" className="md:col-span-1">
                            Designation
                            <Input type="text" name="designation" placeholder="Designation" />
                        </label>
                        <label htmlFor="Department" className="md:col-span-1">
                            Department
                            <Input type="text" name="department" placeholder="Department" />
                        </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                        <label htmlFor="Date of Birth" className="md:col-span-1">
                            Date of Birth
                            <Input type="date" name="dateOfBirth" placeholder="Date of Birth" />
                        </label>
                        <label htmlFor="Education" className="md:col-span-1">
                            Education
                            <Input type="text" name="education" placeholder="Education" />
                        </label>
                        <label htmlFor="Blood Group" className="md:col-span-1">
                            Blood Group
                            <Input type="text" name="bloodGroup" placeholder="Blood Group" />
                        </label>
                    </div>
                    <Button size="sm" className="h-8 gap-1 mt-5"> 
                       Add Teacher
                    </Button>
                </section>

            </form>
        </div>
    );
};

export default AddTeacher;