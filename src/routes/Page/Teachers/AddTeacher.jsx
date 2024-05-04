import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getClasses, teacherAdd } from "../../../lib/api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { CheckCircle, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "@/components/app_components/Loading";
import Alert from "@/components/app_components/Alert";

const AddTeacher = () => {
  const {
    register,
    handleSubmit,
    setValue,

    // reset
  } = useForm();

  const onSubmit = (data) => {
    let _data = { ...data, password: "123" };

    let selectedClasses = classes.filter((cls) => cls.selected == true);

    selectedClasses = selectedClasses.map((cls) => {
      if (cls.selected)
        return {
          class: {
            connect: {
              id: cls.id,
            },
          },
        };
    });

    _data = {
      ...data,
      classes: { create: selectedClasses },
      fixed_salary: parseInt(data.fixed_salary),
    };
    teacherAdd(_data)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [classes, setClasses] = useState([]);
  const [isData, setIsData] = useState(false);

  useEffect(() => {
    getClasses()
      .then((res) => res.json())
      .then((data) => {
        let _data = [];
        for (let d in data) {
          _data.push({ ...data[d], selected: false });
        }
        setClasses(_data);
        setIsData(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClassSelect = (id) => {
    classes[id]["selected"] = !classes[id]["selected"];
    setClasses([...classes]);
  };

  return (
    <>
      {!isData ? (
        <Loading />
      ) : (
        <div style={{ overflow: "hidden" }}>
          <h1 className="text-2xl font-bold mb-3">Add Teacher</h1>
          <>
            {classes.length == 0 ? (
              <Alert
                title="You have not added class yet!"
                subtitle="To add teachers, create class first!"
                link="/dashboard/add-classes"
                linktitle="Add"
              />
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="border p-5 rounded"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <label htmlFor="Name" className="md:col-span-1">
                    Name
                    <Input
                      {...register("name", { required: true })}
                      type="text"
                      name="name"
                      placeholder="Name"
                      required
                    />
                  </label>
                  <label htmlFor="Mobile Number" className="md:col-span-1">
                    Mobile Number
                    <Input
                      {...register("phone", { required: true })}
                      type="number"
                      name="phone"
                      placeholder="Mobile Number"
                      required
                    />
                  </label>
                  <label htmlFor="Parmanent Address" className="md:col-span-1">
                    Parmanent Address
                    <Input
                      {...register("present_address", { required: true })}
                      type="text"
                      name="present_address"
                      placeholder="Present Address"
                      required
                    />
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <label htmlFor="Parmanent Address" className="md:col-span-1">
                    Present Address
                    <Input
                      {...register("parmanent_address", { required: true })}
                      type="text"
                      name="parmanent_address"
                      placeholder="Parmanent Address"
                      required
                    />
                  </label>
                  <label htmlFor="Email" className="md:col-span-1">
                    Email
                    <Input
                      {...register("email", { required: true })}
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                    />
                  </label>
                  <label htmlFor="Joining Date" className="md:col-span-1">
                    Joining Date
                    <Input
                      {...register("joining_date", { required: true })}
                      type="date"
                      name="joining_date"
                      placeholder="Joining Date"
                      required
                    />
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <label htmlFor="Salary" className="md:col-span-1">
                    Salary
                    <Input
                      {...register("fixed_salary", { required: true })}
                      type="number"
                      name="fixed_salary"
                      placeholder="Salary"
                      required
                    />
                  </label>
                  <label htmlFor="NID Number" className="md:col-span-1">
                    NID Number
                    <Input
                      {...register("nid", { required: true })}
                      type="number"
                      name="nid"
                      placeholder="NID Number"
                      required
                    />
                  </label>
                  <label htmlFor="Image" className="md:col-span-1">
                    Image
                    <Input type="file" name="image" placeholder="Upload file" />
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <label htmlFor="Gender" className="md:col-span-1">
                    Select Gender
                    <Select
                      onValueChange={(value) => setValue("gender", value)}
                      required
                    >
                      <SelectTrigger>
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
                    <Input
                      {...register("designation", { required: true })}
                      type="text"
                      name="designation"
                      placeholder="Designation"
                      required
                    />
                  </label>
                  <label htmlFor="Department" className="md:col-span-1">
                    Department
                    <Input
                      {...register("department", { required: true })}
                      type="text"
                      name="department"
                      placeholder="Department"
                      required
                    />
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <label htmlFor="Date of Birth" className="md:col-span-1">
                    Date of Birth
                    <Input
                      {...register("date_of_birth", { required: true })}
                      type="date"
                      name="date_of_birth"
                      placeholder="Date of Birth"
                      required
                    />
                  </label>
                  <label htmlFor="Education" className="md:col-span-1">
                    Education
                    <Input
                      {...register("education", { required: true })}
                      type="text"
                      name="education"
                      placeholder="Education"
                      required
                    />
                  </label>
                  <label htmlFor="Blood Group" className="md:col-span-1">
                    Blood Group
                    <Input
                      {...register("blood_group", { required: true })}
                      type="text"
                      name="blood_group"
                      placeholder="Blood Group"
                      required
                    />
                  </label>
                </div>

                <div className="mt-2 font-medium">
                  Select classes to assign:
                </div>
                <div className="mt-3 font-medium flex gap-4">
                  {classes.map((cls, index) => (
                    <div
                      key={cls.id}
                      onClick={() => handleClassSelect(index)}
                      className="flex items-center gap-1 border p-3 rounded-xl cursor-pointer hover:bg-gray-100"
                    >
                      <div>{cls.name}</div>{" "}
                      {cls.selected ? (
                        <CheckCircle size={18} />
                      ) : (
                        <PlusCircle size={18} />
                      )}
                    </div>
                  ))}
                </div>
                <Button type="submit" size="sm" className="h-8 gap-1 mt-5">
                  Add Teacher
                </Button>
              </form>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default AddTeacher;
