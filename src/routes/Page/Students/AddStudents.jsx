import Alert from "@/components/app_components/Alert";
import Loading from "@/components/app_components/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdmissionFeeAdd, dateTime, getClasses, getStudentById, getStudentCount, studentAdd, studentUpdate } from "@/lib/api";
import {
  CreditCard,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import generatePDF, { Margin,  usePDF } from "react-to-pdf";


const AddStudents = () => {
  const { register, handleSubmit, setValue, reset, watch } = useForm();

  const [studentCount, setStudentCount] = useState(0);
  const [cands, setCandS] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isData, setIsData] = useState(false);
  const [isData2, setIsData2] = useState(false);


  const updatedCount = () => {
    getStudentCount()
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setStudentCount(data.count);
        setIsData2(true);
        const year = new Date().getFullYear().toString();
        setValue("id_no", `${year[2]}${year[3]}0${studentCount + 1}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const AdmissionDataSend = (data) => {
    console.log(data)
    toast.promise(
      AdmissionFeeAdd(data)
        .then((res) => {
          return res.json();
        })
        .then((d) => {
          console.log(d);
          if (d.err) throw new Error(d.err);
          setIsGenerate(true);
          setTimeout(() => {
            generatePDF(targetRef, 
              {
              filename: `Admission_pay_${watch("id_no")}`,
              page: {
                margin: Margin.SMALL
              }
            })
          }, 1000);
          setTimeout(() => {
            setIsGenerate(false);
            updatedCount()
          }, 2000);
        }),
      {
        loading: "Generating Pay Receipt...",
        success: <b>Generated!</b>,
        error: (error) => <b>{error.message}</b>,
      }
    );    
  }

  
  const [fee, setFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [other, setOther] = useState(0);
  const [isGenerate, setIsGenerate] = useState(false);
  const [isReAdmission, setIsReAdmission] = useState(false)
  const { targetRef } = usePDF();

  const onSubmit = (data) => {
    if(parseInt(fee) == 0) {
      toast.error("You have forget to fill addmison fee!")
      return 
    }
    let _data;
    console.log(data);
    let Id;
    if (data.classId.includes("|")) {
      Id = data.classId.split("|");
      _data = {
        ...data,
        password: "123",
        classId: parseInt(Id[0]),
        sectionId: parseInt(Id[1]),
        id_no: parseInt(data.id_no),
      };
      
    } else {
      _data = {
        ...data,
        password: "123",
        classId: parseInt(data.classId),
        id_no: parseInt(data.id_no),
      };
    }
    if(isReAdmission) {
      delete _data.id_no
      toast.promise(
        studentUpdate(_data)
          .then((res) => {
            return res.json();
          })
          .then((d) => {
            console.log(d);
            if (d.err) throw new Error(d.err);
            
            AdmissionDataSend(
              {
                fee: parseFloat(fee), discount:parseFloat(discount), other: parseFloat(other),
                studentId: d.created.id,
              })
          }),
        {
          loading: "Adding student...",
          success: <b>Successfully added!</b>,
          error: (error) => <b>{error.message}</b>,
        }
      );

      return
    }

    toast.promise(
      studentAdd(_data)
        .then((res) => {
          return res.json();
        })
        .then((d) => {
          console.log(d);
          if (d.err) throw new Error(d.err);
          
          AdmissionDataSend(
            {
              fee: parseFloat(fee), discount:parseFloat(discount), other: parseFloat(other),
              studentId: d.created.id,
            })
        }),
      {
        loading: "Adding student...",
        success: <b>Successfully added!</b>,
        error: (error) => <b>{error.message}</b>,
      }
    );
  };

  /* Class Fetch Data */
  useEffect(() => {
    getClasses()
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
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

    getStudentCount()
      .then((res) => res.json())
      .then((data) => {
         console.log(data)
        setStudentCount(data.count);
        setIsData2(true);
        const year = new Date().getFullYear().toString();
        setValue("id_no", `${year[2]}${year[3]}0${studentCount + 1}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setValue, studentCount, isData2]);

  const [class_, setCls] = useState("");
  const [sec, setSec] = useState("");

  const getClass = (id) => {
    if (id.includes("|")) {
      id = id.split("|");
      let cls = classes.filter((c) => c.id == parseInt(id[0]));
      //  console.log(cls)
      setCls(cls[0].name);
      let sec = cls[0].sections.filter((s) => s.id == parseInt(id[1]));
      //  console.log("sec", sec)
      setSec(sec[0].name);
    } else {
      let _class = classes.filter((c) => c.id == parseInt(id));
      //  console.log(_class[0].name)
      setCls(_class[0].name);
      setSec(null);
    }
  };

  const findStudent = () => {
    const id = parseInt(document.getElementById('student_id').value)
    toast.promise(
      getStudentById(id)
        .then((res) => {
          return res.json();
        })
        .then((d) => {
          if(!d) throw new Error("Student not found!");
          if (d.err) throw new Error(d.err);

          // setValue(d)
          console.log(d)
          setValue("name", d.name)
          
  
        }),
      {
        loading: "Searching....",
        success: <b>Found!</b>,
        error: (error) => <b>{error.message}</b>,
      }
    );
  }


  return (
    <>
      {isData && isData2 ? (
        <div style={{ overflow: "hidden" }}>
          <h1 className="text-2xl font-bold mb-3">Admission {(new Date().getFullYear())}</h1>
          {cands.length == 0 ? (
            <Alert
              title="You have not added class yet!"
              subtitle="To add students, create class first!"
              link="/dashboard/add-classes"
              linktitle="Add"
            />
          ) : (
            <div className="grid lg:grid-cols-2 gap-5">
              <div className="">
                <Tabs defaultValue="admission">
                  <TabsList>
                    <TabsTrigger onClick={()=> setIsReAdmission(false)} value="admission">Addmision</TabsTrigger>
                    <TabsTrigger onClick={()=> setIsReAdmission(true)} value="readmission">Re-Admission</TabsTrigger>
                    
                  </TabsList>
                  {
                    isReAdmission && <div className="inline-block ml-10">
                    <div className="flex items-center gap-2 text-gray-200"><Input id="student_id" className="text-black" type="number" placeholder="Student Id"/>
                    <Button onClick={findStudent} className="flex gap-2"> <Search size={16}/> Search</Button>
                    </div>
                  </div>
                  }

                  <TabsContent value="admission">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="border p-5 rounded-xl grid grid-cols-2 gap-3"
                    >
                      <label htmlFor="Name" className="md:col-span-1">
                        Name
                        <Input
                          {...register("name", { required: true })}
                          type="text"
                          name="name"
                          required
                          placeholder="Name"
                        />
                      </label>
                      <label htmlFor="Mobile Number" className="md:col-span-1">
                        Mobile Number
                        <Input
                          {...register("phone", { required: true })}
                          type="number"
                          name="phone"
                          required
                          placeholder="Mobile Number"
                        />
                      </label>
                      <label
                        htmlFor="Present Address"
                        className="md:col-span-1"
                      >
                        Present Address
                        <Input
                          {...register("present_address", { required: true })}
                          type="text"
                          required
                          name="present_address"
                          placeholder="Present Address"
                        />
                      </label>

                      <label
                        htmlFor="Permanent Address"
                        className="md:col-span-1"
                      >
                        Permanent Address
                        <Input
                          {...register("permanent_address", { required: true })}
                          type="text"
                          required
                          name="permanent_address"
                          placeholder="Permanent Address"
                        />
                      </label>
                      <label htmlFor="Email" className="md:col-span-1">
                        Email
                        <Input
                          {...register("email", { required: true })}
                          type="email"
                          required
                          name="email"
                          placeholder="Email"
                        />
                      </label>
                      <label htmlFor="Date of Birth" className="md:col-span-1">
                        Date of Birth
                        <Input
                          {...register("date_of_birth", { required: true })}
                          type="date"
                          required
                          name="date_of_birth"
                        />
                      </label>

                      <label htmlFor="Class" className="md:col-span-1">
                        Class & Section
                        <Select
                          onValueChange={(value) => {
                            getClass(value);
                            return setValue("classId", value);
                          }}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Class & Section" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Select Class</SelectLabel>
                              {cands.map((cs) => (
                                <SelectItem key={cs.name} value={cs.value}>
                                  {cs.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </label>

                      <label htmlFor="Group" className="md:col-span-1">
                        Group
                        <Select
                          onValueChange={(value) => setValue("group", value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Group" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Select Class</SelectLabel>
                              <SelectItem value="na">N/A</SelectItem>
                              <SelectItem value="science">Science</SelectItem>
                              <SelectItem value="humanity">Humanity</SelectItem>
                              <SelectItem value="business">
                                Business Studies
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </label>
                      <label htmlFor="Session" className="md:col-span-1">
                        Session
                        <Input
                          {...register("session", { required: true })}
                          type="text"
                          required
                          name="session"
                          placeholder="Session"
                        />
                      </label>

                      <label htmlFor="Gender" className="md:col-span-1">
                        Gender
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
                      <label htmlFor="ID" className="md:col-span-1">
                        Student ID
                        <Input
                          disabled
                          {...register("id_no", { required: true })}
                          type="number"
                          name="id_no"
                          placeholder="Roll"
                        />
                      </label>
                      <label htmlFor="Blood Group" className="md:col-span-1">
                        Blood Group
                        <Select
                          onValueChange={(value) =>
                            setValue("blood_group", value)
                          }
                          required
                        >
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

                      {/* <label htmlFor="Address" className="md:col-span-1">
                        Address
                        <Input type="text" required name="address" placeholder="Address" />
                    </label> */}
                      <label htmlFor="B/C Number" className="md:col-span-1">
                        B/C Number
                        <Input
                          {...register("birth_certificate_no", {
                            required: true,
                          })}
                          type="number"
                          required
                          name="birth_certificate_no"
                          placeholder="Birth Certificate Number"
                        />
                      </label>
                      <label htmlFor="Parents Name" className="md:col-span-1">
                        Parents Name
                        <Input
                          {...register("parent_name", { required: true })}
                          type="text"
                          required
                          name="parent_name"
                          placeholder="Parents Name"
                        />
                      </label>
                      <label htmlFor="Image" className="md:col-span-1">
                        Student Photo
                        <Input type="file" name="image" />
                      </label>

                      <label htmlFor="Parents Phone" className="md:col-span-1">
                        Parents Phone
                        <Input
                          {...register("parent_phone", { required: true })}
                          type="text"
                          required
                          name="parent_phone"
                          placeholder="Parents Phone"
                        />
                      </label>
                      <label
                        htmlFor="Local Guardians"
                        className="md:col-span-1"
                      >
                        L-Guardian Name
                        <Input
                          {...register("local_guardian", { required: true })}
                          type="text"
                          required
                          name="local_guardian"
                          placeholder="Local Guardians"
                        />
                      </label>
                      <label
                        htmlFor="Local Guardians Phone Number"
                        className="md:col-span-1"
                      >
                        L Guardian&apos;s Phone
                        <Input
                          {...register("local_guardian_phone", {
                            required: true,
                          })}
                          type="text"
                          required
                          name="local_guardian_phone"
                          placeholder="Local Guardians Phone Number"
                        />
                      </label>

                      <Button
                        size="sm"
                        className="h-8 gap-1 mt-5 col-span-2"
                      >
                        Admit & Generate Payslip
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="readmission">
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
                            required
                            placeholder="Name"
                          />
                        </label>
                        <label
                          htmlFor="Mobile Number"
                          className="md:col-span-1"
                        >
                          Mobile Number
                          <Input
                            {...register("phone", { required: true })}
                            type="number"
                            name="phone"
                            required
                            placeholder="Mobile Number"
                          />
                        </label>
                        <label
                          htmlFor="Present Address"
                          className="md:col-span-1"
                        >
                          Present Address
                          <Input
                            {...register("present_address", { required: true })}
                            type="text"
                            required
                            name="present_address"
                            placeholder="Present Address"
                          />
                        </label>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:mt-5">
                        <label
                          htmlFor="Permanent Address"
                          className="md:col-span-1"
                        >
                          Permanent Address
                          <Input
                            {...register("permanent_address", {
                              required: true,
                            })}
                            type="text"
                            required
                            name="permanent_address"
                            placeholder="Permanent Address"
                          />
                        </label>
                        <label htmlFor="Email" className="md:col-span-1">
                          Email
                          <Input
                            {...register("email", { required: true })}
                            type="email"
                            required
                            name="email"
                            placeholder="Email"
                          />
                        </label>
                        <label
                          htmlFor="Date of Birth"
                          className="md:col-span-1"
                        >
                          Date of Birth
                          <Input
                            {...register("date_of_birth", { required: true })}
                            type="date"
                            required
                            name="date_of_birth"
                          />
                        </label>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        <label htmlFor="Class" className="md:col-span-1">
                          Class & Section
                          <Select
                            onValueChange={(value) => {
                              getClass(value);
                              return setValue("classId", value);
                            }}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Class & Section" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Select Class</SelectLabel>
                                {cands.map((cs) => (
                                  <SelectItem key={cs.name} value={cs.value}>
                                    {cs.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </label>

                        <label htmlFor="Group" className="md:col-span-1">
                          Group
                          <Select
                            onValueChange={(value) => setValue("group", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Group" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Select Class</SelectLabel>
                                <SelectItem value="na">N/A</SelectItem>
                                <SelectItem value="science">Science</SelectItem>
                                <SelectItem value="humanity">
                                  Humanity
                                </SelectItem>
                                <SelectItem value="business">
                                  Business Studies
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </label>
                        <label htmlFor="Session" className="md:col-span-1">
                          Session
                          <Input
                            {...register("session", { required: true })}
                            type="text"
                            required
                            name="session"
                            placeholder="Session"
                          />
                        </label>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        <label htmlFor="Gender" className="md:col-span-1">
                          Gender
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
                        <label htmlFor="ID" className="md:col-span-1">
                          Student ID
                          <Input
                            disabled
                            {...register("id_no", { required: true })}
                            type="number"
                            name="id_no"
                            placeholder="Roll"
                          />
                        </label>
                        <label htmlFor="Blood Group" className="md:col-span-1">
                          Blood Group
                          <Select
                            onValueChange={(value) =>
                              setValue("blood_group", value)
                            }
                            required
                          >
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
                          <Input
                            {...register("birth_certificate_no", {
                              required: true,
                            })}
                            type="number"
                            required
                            name="birth_certificate_no"
                            placeholder="Birth Certificate Number"
                          />
                        </label>
                        <label htmlFor="Parents Name" className="md:col-span-1">
                          Parents Name
                          <Input
                            {...register("parent_name", { required: true })}
                            type="text"
                            required
                            name="parent_name"
                            placeholder="Parents Name"
                          />
                        </label>
                        <label htmlFor="Image" className="md:col-span-1">
                          Student Photo
                          <Input type="file" name="image" />
                        </label>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        <label
                          htmlFor="Parents Phone"
                          className="md:col-span-1"
                        >
                          Parents Phone
                          <Input
                            {...register("parent_phone", { required: true })}
                            type="text"
                            required
                            name="parent_phone"
                            placeholder="Parents Phone"
                          />
                        </label>
                        <label
                          htmlFor="Local Guardians"
                          className="md:col-span-1"
                        >
                          L-Guardian Name
                          <Input
                            {...register("local_guardian", { required: true })}
                            type="text"
                            required
                            name="local_guardian"
                            placeholder="Local Guardians"
                          />
                        </label>
                        <label
                          htmlFor="Local Guardians Phone Number"
                          className="md:col-span-1"
                        >
                          L Guardian&apos;s Phone
                          <Input
                            {...register("local_guardian_phone", {
                              required: true,
                            })}
                            type="text"
                            required
                            name="local_guardian_phone"
                            placeholder="Local Guardians Phone Number"
                          />
                        </label>
                      </div>
                      <Button size="sm" className="h-8 gap-1 mt-5">
                        Add Student
                      </Button>
                    </form>
                  </TabsContent>
                  
                </Tabs>
              </div>
              <div>
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-05-chunk-4"
                >
                  <CardHeader className="text-center bg-muted/50">
                    <div className="grid gap-0.5">
                      <CardTitle className="flex items-center justify-center gap-2 text-lg">
                        <div className="h-[80px] w-[80px] bg-gray-400 rounded-full"></div>

                        <div className="lg:w-[77%]">
                          <div>
                            Cantonment Public School & College, Lalmonirhat
                          </div>
                          <div className="text-sm">EIIN: 127500</div>
                          <CardDescription>
                            Date: {dateTime(new Date())}
                          </CardDescription>
                        </div>
                      </CardTitle>

                      <div className="text-xl mt-2 ml-20 font-bold">
                        Addmission Payment Receipt
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                      <div className="font-semibold">Student Informations</div>
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Name</span>
                          <span>{watch("name")}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Class</span>
                          <span> {class_} </span>
                        </li>
                        {sec && (
                          <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                              Section
                            </span>
                            <span> {sec} </span>
                          </li>
                        )}
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">#ID</span>
                          <span> {watch("id_no")} </span>
                        </li>

                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Session</span>
                          <span> {watch("session")} </span>
                        </li>
                      </ul>
                      <Separator className="my-2" />
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Addmission Fee
                          </span>
                          <span>
                            <input
                              onChange={(e) =>
                                setFee(
                                  !e.target.value == ""
                                    ? parseFloat(e.target.value)
                                    : 0
                                )
                              }
                              defaultValue={0}
                              className="border rounded-xl w-[100px] text-center"
                              type="number"
                              placeholder="00"
                            />
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Discount
                          </span>
                          <span>
                            <input
                              onChange={(e) =>
                                setDiscount(
                                  !e.target.value == ""
                                    ? parseFloat(e.target.value)
                                    : 0
                                )
                              }
                              defaultValue={0}
                              className="border rounded-xl w-[100px] text-center"
                              type="number"
                              placeholder="00"
                            />
                          </span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Other</span>
                          <span>
                            <input
                              onChange={(e) =>
                                setOther(
                                  !e.target.value == ""
                                    ? parseFloat(e.target.value)
                                    : 0
                                )
                              }
                              defaultValue={0}
                              className="border rounded-xl w-[100px] text-center"
                              type="number"
                              placeholder="00"
                            />
                          </span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">Total</span>
                          <span>
                            {fee + other - (fee + other) * (discount / 100)}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <Separator className="my-4" />
                    <div className="grid gap-3">
                      <div className="font-semibold">Payment Information</div>
                      <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                          <dt className="flex items-center gap-1 text-muted-foreground">
                            <CreditCard className="h-4 w-4" />
                            Type
                          </dt>
                          <dd>Cash</dd>
                        </div>
                      </dl>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground"></div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
          {/* Downloadable payslip */}
          <div className={isGenerate ? "block": "hidden"}>
            <div className="lg:grid grid-cols-2  gap-5">
            <div  style={{transform: "scale(2)"}} ref={targetRef}>
              
              <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                <CardHeader className="text-center bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="flex items-center justify-center gap-2 text-lg">
                      <div className="h-[80px] w-[80px] bg-gray-400 rounded-full"></div>

                      <div className="">
                        <div>Cantonment Public School & College, Lalmonirhat</div>
                        <div className="text-sm">EIIN: 127500</div>
                        <CardDescription>Date: {dateTime(new Date())}</CardDescription>
                      </div>
                    </CardTitle>

                    <div className="text-xl mt-2 ml-20 font-bold">
                      Addmission Payment Receipt
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                  <div className="grid gap-3">
                    <div className="font-semibold">Student Informations</div>
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Name</span>
                        <span>{watch("name")}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Class</span>
                        <span> {class_} </span>
                      </li>
                      {sec && (
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Section</span>
                          <span> {sec} </span>
                        </li>
                      )}
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">#ID</span>
                        <span> {watch("id_no")} </span>
                      </li>
                    </ul>
                    <Separator className="my-2" />

                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between font-semibold">
                        <span>Admission Fee</span>
                        <span>{fee} tk</span>
                      </li>
                      <li className="flex items-center justify-between font-semibold">
                        <span>Discount</span>
                        <span>{discount}%</span>
                      </li>

                      <li className="flex items-center justify-between font-semibold">
                        <span>Other</span>
                        <span>{other} tk</span>
                      </li>
                      <Separator />
                      <li className="flex items-center justify-between font-semibold">
                        <span>Total</span>
                        <span>
                          {fee + other - (fee + other) * (discount / 100)} tk
                        </span>
                      </li>
                    </ul>
                  </div>

                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold">Payment Information</div>
                    <dl className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="flex items-center gap-1 text-muted-foreground">
                          <CreditCard className="h-4 w-4" />
                          Type
                        </dt>
                        <dd>Cash</dd>
                      </div>
                    </dl>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="text-xs text-muted-foreground"></div>
                </CardFooter>
              </Card>
            </div>
            </div>
          </div>


        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AddStudents;
