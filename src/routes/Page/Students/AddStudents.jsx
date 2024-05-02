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
import { studentAdd } from "@/lib/api";
// import { studentAdd } from "@/lib/api";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

const AddStudents = () => {

    const {
        register,
        handleSubmit,
        setValue,
        // reset
    } = useForm()


    const [students, setStudents] = useState([])
    const [cands, setCandS] = useState([])

    const onSubmit = (data) => {
        let _data
        let Id
        if(data.classId.includes('|')) {
             Id = data.classId.split('|')
            _data = {...data, password: "123", classId: parseInt(Id[0]), sectionId: parseInt(Id[1]), id_no: parseInt(data.id_no)}
        } else {
             
            _data = {...data, password: "123", classId: parseInt(data.classId), id_no: parseInt(data.id_no)}
        }
        console.log(data)
        console.log(_data)
        studentAdd(_data)
             .then(res=>res.json())
             .then(data=>{console.log(data)})
             .catch(err=>{console.log(err)})
     }

    useEffect(() => {

      fetch("http://localhost:5000/classes", {
        method: 'GET',
        credentials: 'include', 
      })
      .then(res=> res.json())
      .then(data=> {
        let d = []
        for(let i=0; i<data.length; i++) {
            if(data[i].sections.length != 0) {
                for(let j=0; j<data[i].sections.length; j++) {
                    d.push({
                        name: data[i].name + '-' + data[i].sections[j].name,
                        value: data[i].sections[j].classId + '|' + data[i].sections[j].id,
                    })
                }
            } else {
                d.push({
                    name: data[i].name,
                    value: (data[i].id).toString()
                })
            }
            
        }
        setCandS(d)
        // console.log(data)
        // setSections(data)
      })
      .catch(err=> {
        console.log(err)
      })

      fetch("http://localhost:5000/students", {
        method: 'GET',
        credentials: 'include', 
      })
      .then(res=> res.json())
      .then(data=> {
        setStudents(data)
        console.log(data)
        const year = (new Date().getFullYear()).toString()
        // console.log(year)
        setValue("id_no", `${year[2]}${year[3]}0${students.length+1}`)
      })
      .catch(err=> {
        console.log(err)
      })


    }, [setValue, students.length])

    // console.log(sections)

    return (
        <div style={{ overflow: "hidden" }}>
            <h1 className="text-2xl font-bold mb-3">Add Students</h1>
            <form  onSubmit={handleSubmit(onSubmit)} className="border p-5 rounded">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <label htmlFor="Name" className="md:col-span-1">
                        Name
                        <Input {...register("name", { required: true })} type="text" name="name" required placeholder="Name" />
                    </label>
                    <label htmlFor="Mobile Number" className="md:col-span-1">
                        Mobile Number
                        <Input {...register("phone", { required: true })} type="number" name="phone" required placeholder="Mobile Number" />
                    </label>
                    <label htmlFor="Present Address" className="md:col-span-1">
                        Present Address
                        <Input {...register("present_address", { required: true })} type="text" required name="present_address" placeholder="Present Address" />
                    </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:mt-5">
                    <label htmlFor="Permanent Address" className="md:col-span-1">
                        Permanent Address
                        <Input {...register("permanent_address", { required: true })} type="text" required name="permanent_address" placeholder="Permanent Address" />
                    </label>
                    <label htmlFor="Email" className="md:col-span-1">
                        Email
                        <Input {...register("email", { required: true })} type="email" required name="email" placeholder="Email" />
                    </label>
                    <label htmlFor="Date of Birth" className="md:col-span-1">
                        Date of Birth
                        <Input {...register("date_of_birth", { required: true })} type="date" required name="date_of_birth" />
                    </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <label htmlFor="Class" className="md:col-span-1">
                        Class & Section
                        <Select onValueChange={(value) => setValue("classId", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Class & Section" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Class</SelectLabel>
                                   {
                                    cands.map(cs=>  <SelectItem key={cs.name} value={cs.value}>{cs.name}</SelectItem>)
                                   }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </label>

                    <label htmlFor="Group" className="md:col-span-1">
                        Group
                        <Select onValueChange={(value) => setValue("group", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Group" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Class</SelectLabel>
                                   <SelectItem value="na">N/A</SelectItem>
                                   <SelectItem value="science">Science</SelectItem>
                                   <SelectItem value="humanity">Humanity</SelectItem>
                                   <SelectItem value="business">Business Studies</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </label>
                    <label htmlFor="Session" className="md:col-span-1">
                        Session
                        <Input {...register("session", { required: true })} type="text" required name="session" placeholder="Session" />
                    </label>
                   
                    
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <label htmlFor="Gender" className="md:col-span-1">
                        Gender
                        <Select onValueChange={(value) => setValue("gender", value)} required>
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
                    <label htmlFor="ID" className="md:col-span-1">
                        Student ID
                        <Input {...register("id_no", { required: true })} type="number" name="id_no" placeholder="Roll" />
                    </label>
                    <label htmlFor="Blood Group" className="md:col-span-1">
                        Blood Group
                        <Select onValueChange={(value) => setValue("blood_group", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Blood Group" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Blood Group</SelectLabel>
                                   <SelectItem value="a+">A+</SelectItem>
                                   <SelectItem value="a-">A-</SelectItem>
                                   <SelectItem value="b+">B+</SelectItem>
                                   <SelectItem value="b-">B-</SelectItem>
                                   <SelectItem value="ab+">AB+</SelectItem>
                                   <SelectItem value="ab-">AB-</SelectItem>
                                   <SelectItem value="O+">O+-</SelectItem>
                                   <SelectItem value="O-">O+-</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    {/* <label htmlFor="Address" className="md:col-span-1">
                        Address
                        <Input type="text" required name="address" placeholder="Address" />
                    </label> */}
                    <label htmlFor="B/C Number" className="md:col-span-1">
                        B/C Number
                        <Input {...register("birth_certificate_no", { required: true })} type="number" required name="birth_certificate_no" placeholder="Birth Certificate Number" />
                    </label>
                    <label htmlFor="Parents Name" className="md:col-span-1">
                        Parents Name
                        <Input {...register("parent_name", { required: true })} type="text" required name="parent_name" placeholder="Parents Name" />
                    </label>
                    <label htmlFor="Image" className="md:col-span-1">
                        Student Photo
                        <Input type="file" name="image" />
                    </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                    <label htmlFor="Parents Phone" className="md:col-span-1">
                        Parents Phone
                        <Input {...register("parent_phone", { required: true })} type="text" required name="parent_phone" placeholder="Parents Phone" />
                    </label>
                    <label htmlFor="Local Guardians" className="md:col-span-1">
                        L-Guardian Name
                        <Input {...register("local_guardian", { required: true })} type="text" required name="local_guardian" placeholder="Local Guardians" />
                    </label>
                    <label htmlFor="Local Guardians Phone Number" className="md:col-span-1">
                        L Guardian&apos;s Phone
                        <Input {...register("local_guardian_phone", { required: true })} type="text" required name="local_guardian_phone" placeholder="Local Guardians Phone Number" />
                    </label>
                </div>
                <Button size="sm" className="h-8 gap-1 mt-5">
                    Add Student
                </Button>
            </form>
        </div>
    );
};

export default AddStudents;