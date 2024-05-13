import Alert from "@/components/app_components/Alert";
import Loading from "@/components/app_components/Loading";
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
import {
  getClasses,
  getStudentsByClassAndSection,
  getTeachers,
} from "@/lib/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddAttendance = () => {
  const { register, handleSubmit, reset, setValue } = useForm();

  // get Course Id And Batch ID
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [selectedSectionId, setSelectedSectionId] = useState(null);

  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [isData, setIsData] = useState(false);
  const [isData2, setIsData2] = useState(false);
  const [cands, setCandS] = useState([]);
  const [getDataByCourseAndBatch, setGetDataByCourseAndBatch] = useState([]);

  const onSubmit = (data) => {
    // Reset form after submission
    reset();

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

  // get Data from course and batch no

  useEffect(() => {
    getStudentsByClassAndSection(selectedClassId, selectedSectionId)
      .then((res) => res.json())
      .then((data) => {
        setGetDataByCourseAndBatch(data);
        setIsData(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedClassId, selectedSectionId]);

  console.log(getDataByCourseAndBatch);

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

    getTeachers()
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data);
        setIsData2(true);
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
      {!isData || !isData2 ? (
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
            {teachers.length == 0 && (
              <Alert
                title="You have not added any Teacher yet!"
                subtitle="To create subject, add teacher first!"
                link="/dashboard/add-teachers"
                linktitle="Add"
              />
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 mt-3 gap-4">
              <label htmlFor="Name" className="md:col-span-1">
                Section/Batch No
                <Select
                  onValueChange={(value) => {
                    console.log(value);
                    // Split the combined value into classId and sectionId
                    const [classId, sectionId] = value.split("|");
                    setSelectedClassId(classId);
                    setSelectedSectionId(sectionId);
                    setValue("classId", classId);
                    setValue("sectionId", sectionId);
                  }}
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
              <label htmlFor="Teachers">
                Subject Teacher
                <Select
                  onValueChange={(value) => setValue("teacherId", value)}
                  disabled={
                    classes.length == 0 || teachers.length == 0 ? true : false
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject/Course Teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Subject/Course teacher</SelectLabel>
                      {teachers.map((t) => (
                        <SelectItem key={t.id} value={t.id.toString()}>
                          {t.name} - {t.department}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </label>
              <label htmlFor="Name" className="md:col-span-1">
                Select Date
                <Input
                  //{...register("name", { required: true })}
                  type="date"
                  name="attendance-date"
                  required
                  disabled={
                    classes.length == 0 || teachers.length == 0 ? true : false
                  }
                />
              </label>
            </div>
            <Button
              size="sm"
              className="h-8 gap-1 mt-5"
              disabled={
                classes.length == 0 || teachers.length == 0 ? true : false
              }
            >
              Find Data
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddAttendance;
