import Alert from "@/components/app_components/Alert";
import ClassAttendanceTable from "@/components/app_components/ClassAttendanceTable";
import Loading from "@/components/app_components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
    getClassAttendance,
  getClasses,
  getStudentsByClassAndSection,
  getTeachers,
} from "@/lib/api";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddAttendance = () => {
  const { register, handleSubmit, reset, setValue } = useForm();

  const [classes, setClasses] = useState([]);
  const [isData, setIsData] = useState(false);
  const [isData2, setIsData2] = useState(false);
  const [cands, setCandS] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([])

  const [aDate, setADate] = useState(null)

  const onSubmit = (data) => {
    // reset();

    let classId;
    let sectionId;
    console.log(data)
    setADate(data.date)

    if((data.classAndSection).includes("|")) {
    classId = data.classAndSection.split('|')[0]
    sectionId = data.classAndSection.split('|')[1]
    } else{
        classId = data.classAndSection
        sectionId = null 
    }
    
    getStudentsByClassAndSection(classId)
    .then(res=> res.json())
    .then(data=> {
       if(sectionId) {
        const std = data.filter((s) => s.sectionId == parseInt(sectionId))
        setStudents(std)
       } else {
        setStudents(data)
       }
    })



    // getClassAttendance(classId, data.date)
    // .then(res=> res.json())
    // .then(data=> {
    //     console.log(data)
    // })



    /*  fetch("http://localhost:5000/subject_add", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        classId: parseInt(data.classId),
        mark: parseInt(data.mark),
        teacherId: parseInt(data.teacherId),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.err) {
          toast.error(data.err);
        } else {
          toast.success("Successfuly added!");
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log(err);
      });
    console.log(data);
  }; */
  };
  console.log(students)
  // get Data from course and batch no
  useEffect(() => {
    getClasses()
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
        setIsData(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Course and Section
  useEffect(() => {
    getClasses()
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
        let d = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].sections.length != 0) {
            for (let j = 0; j < data[i].sections.length; j++) {
              d.push({
                name: data[i].name + "-" + data[i].sections[j].name,
                value:
                  data[i].sections[j].classId + "|" + data[i].sections[j].id,
              });
            }
          } else {
            d.push({
              name: data[i].name,
              value: data[i].id.toString(),
            });
          }
        }
        setCandS(d);
        setIsData(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setValue, isData2]);

  return (
    <>
      {!isData ? (
        <Loading />
      ) : (
        <div style={{ overflow: "hidden" }}>
          <h1 className="text-2xl font-bold mb-3">Add Attendance</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border p-5 rounded"
          >
            {classes.length == 0 && (
              <Alert
                title="You have not added any class yet!"
                subtitle="To create section, create class first!"
                link="/dashboard/add-classes"
                linktitle="Add"
              />
            )}
           
            <div className="grid grid-cols-1 md:grid-cols-3 mt-3 gap-4">
              <label htmlFor="Name" className="md:col-span-1">
                Section/Batch No
                <Select
                  onValueChange={(value) => setValue("classAndSection", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Course - Batch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Course - Batch</SelectLabel>
                      {cands.map((cs,i) => (
                        <SelectItem key={i} value={cs.value}>
                          {cs.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </label>
            
              <label htmlFor="Name" className="md:col-span-1">
                Select Date
                <Input
                  {...register("date", { required: true })}
                  type="date"
                  name="date"
                  required
                  disabled={
                    classes.length == 0
                  }
                />
              </label>
            </div>
            <Button
              size="sm"
              className="h-8 gap-1 mt-5"
              disabled={
                classes.length == 0
              }
            >
              Search
            </Button>
          </form>
          <SelectSeparator className="mt-10"/>

          {
            students.length > 0  && <ClassAttendanceTable students={students} date={aDate}/>
          }
        </div>
      )}
    </>
  );
};

export default AddAttendance;
