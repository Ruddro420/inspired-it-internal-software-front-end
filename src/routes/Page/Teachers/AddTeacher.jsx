import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  teacherAdd } from '../../../lib/api'

const AddTeacher = () => {
    const handleForm = (e) => {
        e.preventDefault()
        const form = e.target.form
        const image = e.target.form.file.files[0]
        const reader = new FileReader()

        reader.onload = (e) => {
            const imageData = e.target.result;
            const base64Data = imageData.split(',')[1];
            const byteArray = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
            const data = {
                name: form.name.value,
                password: form.password.value,
                email: form.email.value,
                phone: form.mobileNumber.value,
                present_address: form.presentAddress.value,
                permanent_address: form.parmanentAddress.value,
                joining_date: form.joiningDate.value,
                fixed_salary: parseInt(form.salary.value),
                nid: form.nid.value,
                // image: byteArray,
                gender: form.gender.value,
                designation: form.designation.value,
                department: form.department.value,
                date_of_birth: form.dateOfBirth.value,
                education: form.education.value,
                blood_group: form.bloodGroup.value,
            }
    
            console.log(data)
            teacherAdd(data)
            .then(res=>res.json())
            .then(data=>{console.log(data)})
            .catch(err=>{console.log(err)})
        }


        reader.readAsDataURL(image)

       

    }

    return (
        <div style={{ overflow: "hidden" }}>
            <h1 className="text-2xl font-bold mb-3">Add Teachers</h1>
            <form>
                <section className="border p-5 rounded">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <label htmlFor="Name" className="md:col-span-1">
                            Name
                            <Input name="name" type="text" id="name" placeholder="Name" required/>
                        </label>
                        <label htmlFor="Mobile Number" className="md:col-span-1">
                            Password
                            <Input name="password" type="text" id="password" placeholder="Mobile Number" required/>
                        </label>
                        <label htmlFor="Mobile Number" className="md:col-span-1">
                            Mobile Number
                            <Input name="mobileNumber" type="number" id="mobileNumber" placeholder="Mobile Number" required/>
                        </label>
                        <label htmlFor="Present Address" className="md:col-span-1">
                            Present Address
                            <Input name="presentAddress" type="email" id="presentAddress" placeholder="Present Address" required/>
                        </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 mt-5">
                        <label htmlFor="Permanent Address" className="md:col-span-1">
                            Permanent Address
                            <Input name="parmanentAddress" type="text" id="permanentAddress" placeholder="Permanent Address" required/>
                        </label>
                        <label htmlFor="Email" className="md:col-span-1">
                            Email
                            <Input name="email" type="email" id="email" placeholder="Email" required/>
                        </label>
                        <label htmlFor="Joining Date" className="md:col-span-1">
                            Joining Date
                            <Input name="joiningDate" type="date" id="joiningDate" placeholder="Joining Date" required/>
                        </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 mt-5">
                        <label htmlFor="Salary" className="md:col-span-1">
                            Salary
                            <Input name="salary" type="number" id="salary" placeholder="Salary" required/>
                        </label>
                        <label htmlFor="NID Number" className="md:col-span-1">
                            NID Number
                            <Input name="nid" type="number" id="NIDNumber" placeholder="NID Number" required/>
                        </label>
                        <label htmlFor="Image" className="md:col-span-1">
                            Image
                            <Input name="file" type="file" id="image" required/>
                        </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 mt-5">
                        <label htmlFor="Gender" className="md:col-span-1">
                            Gender
                            <Input name="gender" type="text" id="gender" placeholder="Gender" required/>
                        </label>
                        <label htmlFor="Designation" className="md:col-span-1">
                            Designation
                            <Input name="designation" type="text" id="designation" placeholder="Designation" required/>
                        </label>
                        <label htmlFor="Department" className="md:col-span-1">
                            Department
                            <Input name="department" type="text" id="department" placeholder="Department" required/>
                        </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 mt-5">
                        <label htmlFor="Date of Birth" className="md:col-span-1">
                            Date of Birth
                            <Input type="date" name="dateOfBirth" placeholder="Date of Birth" required/>
                        </label>
                        <label htmlFor="Education" className="md:col-span-1">
                            Education
                            <Input type="text" name="education" placeholder="Education" required/>
                        </label>
                        <label htmlFor="Blood Group" className="md:col-span-1">
                            Blood Group
                            <Input type="text" name="bloodGroup" placeholder="Blood Group" required/>
                        </label>
                    </div>
                    <Button onClick={handleForm} type="submit" size="sm" className="h-8 gap-1 mt-5"> 
                       Add Teacher
                    </Button>
                </section>

            </form>
        </div>
    );
};

export default AddTeacher;