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

const AddStudents = () => {
    return (
        <div style={{ overflow: "hidden" }}>
            <h1 className="text-2xl font-bold mb-3">Add Students</h1>
            <form className="border p-5 rounded">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <label htmlFor="Name" className="md:col-span-1">
                        Name
                        <Input type="text" name="name" required placeholder="Name" />
                    </label>
                    <label htmlFor="Mobile Number" className="md:col-span-1">
                        Mobile Number
                        <Input type="number" name="phone" required placeholder="Mobile Number" />
                    </label>
                    <label htmlFor="Present Address" className="md:col-span-1">
                        Present Address
                        <Input type="text" required name="present_address" placeholder="Present Address" />
                    </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:mt-5">
                    <label htmlFor="Permanent Address" className="md:col-span-1">
                        Permanent Address
                        <Input type="text" required name="present_address" placeholder="Permanent Address" />
                    </label>
                    <label htmlFor="Email" className="md:col-span-1">
                        Email
                        <Input type="email" required name="email" placeholder="Email" />
                    </label>
                    <label htmlFor="Date of Birth" className="md:col-span-1">
                        Date of Birth
                        <Input type="date" required name="date_of_birth" />
                    </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <label htmlFor="Class" className="md:col-span-1">
                        Class
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Class" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Class</SelectLabel>
                                    <SelectItem value="apple">Class One</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </label>
                    <label htmlFor="Section" className="md:col-span-1">
                        Section
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Section" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Section</SelectLabel>
                                    <SelectItem value="apple">2020-21</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </label>
                    <label htmlFor="Image" className="md:col-span-1">
                        Upload File
                        <Input type="file" required name="image" />
                    </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <label htmlFor="Gender" className="md:col-span-1">
                        Gender
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
                    <label htmlFor="Roll" className="md:col-span-1">
                        Roll
                        <Input type="number" required name="roll" placeholder="Roll" />
                    </label>
                    <label htmlFor="Blood Group" className="md:col-span-1">
                        Blood Group
                        <Input type="text" required name="blood_group" placeholder="Blood Group" />
                    </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    {/* <label htmlFor="Address" className="md:col-span-1">
                        Address
                        <Input type="text" required name="address" placeholder="Address" />
                    </label> */}
                    <label htmlFor="Birth Certificate Number" className="md:col-span-1">
                        Birth Certificate Number
                        <Input type="number" required name="birth_certificate_number" placeholder="Birth Certificate Number" />
                    </label>
                    <label htmlFor="Parents Name" className="md:col-span-1">
                        Parents Name
                        <Input type="text" required name="parent_name" placeholder="Parents Name" />
                    </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <label htmlFor="Parents Phone" className="md:col-span-1">
                        Parents Phone
                        <Input type="number" required name="parent_phone" placeholder="Parents Phone" />
                    </label>
                    <label htmlFor="Local Guardians" className="md:col-span-1">
                        Local Guardians
                        <Input type="text" required name="local_guardian" placeholder="Local Guardians" />
                    </label>
                    <label htmlFor="Local Guardians Phone Number" className="md:col-span-1">
                        Local Guardian&apos;s Phone Number
                        <Input type="number" required name="local_guardian_phone" placeholder="Local Guardians Phone Number" />
                    </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <label htmlFor="Group" className="md:col-span-1">
                        Group
                        <Input type="text" required name="group" placeholder="Group" />
                    </label>
                    <label htmlFor="Session" className="md:col-span-1">
                        Session
                        <Input type="number" required name="session" placeholder="Session" />
                    </label>
                    {/* <label htmlFor="Discount Fee" className="md:col-span-1">
                        Discount Fee
                        <Input type="number" required name="discountFee" placeholder="Discount Fee" />
                    </label> */}
                </div>
                <Button size="sm" className="h-8 gap-1 mt-5">
                    Add Student
                </Button>
            </form>
        </div>
    );
};

export default AddStudents;