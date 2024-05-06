import Alert from "@/components/app_components/Alert";
import Loading from "@/components/app_components/Loading";
import UploadDialog from "@/components/app_components/UploadDialog";
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
import { AdmissionFeeAdd, dateTime, fetchImageAndConvertToDataURI, getClasses, getImage, getLastStudent, getSettings, getStudentById, getStudentCount, studentAdd, studentUpdate } from "@/lib/api";
import axios from "axios";
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
  const [isData3, setIsData3] = useState(false);


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
    // console.log(data)
    toast.promise(
      AdmissionFeeAdd(data)
        .then((res) => {
          return res.json();
        })
        .then((d) => {
          // console.log(d);
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

  const [info, setInfo] = useState([])
  const [stdId, setStdID] = useState("")
  const [imageDataURI, setImageDataURI] =useState(null);
  

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const handleOpenDialog = () => {
  //   setIsDialogOpen(true);
  // };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  }; 
  const uploadFile = async (filename) => {
    setIsDialogOpen(true)
    const formData = new FormData();
    const ext = image.name.split(".").pop()
    const renamedFile = new File([image],`${filename}.${ext}`, {type: image.type})
    formData.append('image', renamedFile);
    try {
      const response = await axios.post('http://localhost:5000/student_upload', formData, {
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        }
      });
      console.log('File uploaded:', response.data);
      setIsDialogOpen(false);
    } catch (error) {
      setIsDialogOpen(false);
      console.error('Error uploading file:', error);
    }
  };

  const [image, setImage] = useState(null)

  //  image upload
  const previewFile = () => {
    const preview = document.querySelector('#logo')
    const file = document.querySelector('input[type=file]').files[0]
    setImage(file)
    const reader = new FileReader()
    console.log(file)
  
    reader.addEventListener('load', ()=> {
      preview.src = reader.result;
    }, false)
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }


  const onSubmit = (data) => {
    if(parseInt(fee) == 0) {
      toast.error("You have forget to fill addmison fee!")
      return 
    }

    let _data;
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
        sectionId: null
      };
    }
    if(isReAdmission) {
      delete _data.id_no
      toast.promise(
        studentUpdate(_data, stdId)
          .then((res) => {
            return res.json();
          })
          .then((d) => {
            // console.log(d);
            if (d.err) throw new Error(d.err);
            
            AdmissionDataSend(
              {
                fee: parseFloat(fee), discount:parseFloat(discount), other: parseFloat(other),
                studentId: d.created.id,
                readmission: true
              })
              if(image){
                uploadFile(d.created.id_no.toString())
              }
          }),
        {
          loading: "Adding student...",
          success: <b>Successfully added!</b>,
          error: (error) => <b>{error.message}</b>,
        }
      );

      return
    }

    if(!image) {
      toast.error("Please select student image")
      return
    }

    toast.promise(
      studentAdd(_data)
        .then((res) => {
          return res.json();
        })
        .then((d) => {
          // console.log(d);
          if (d.err) throw new Error(d.err);
          
          AdmissionDataSend(
            {
              fee: parseFloat(fee), discount:parseFloat(discount), other: parseFloat(other),
              studentId: d.created.id,
            })
            if(image){
              uploadFile(d.created.id_no.toString())
            }
        }),
      {
        loading: "Adding student...",
        success: <b>Successfully added!</b>,
        error: (error) => <b>{error.message}</b>,
      }
    );
  };

  useEffect(() => {
    getClasses()
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
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

      getLastStudent()
      .then((res) => res.json())
      .then((data) => {
        //  console.log(data)
        // setStudentCount(data.count);
        setIsData2(true);
        const year = new Date().getFullYear().toString();
        let id 
        if(data.length != 0) {
          id = (data[0].id_no)+1
        } else {
          id = year[2]+year[3] + "01"
        }
        isReAdmission ? setValue("id_no", document.getElementById('student_id').value) : setValue("id_no", id.toString());
      })
      .catch((err) => {
        console.log(err);
      });


      getSettings()
      .then((res) => res.json())
      .then((data) => {
       setInfo(data)
       setIsData3(true)
      })
      .catch((err) => {
        console.log(err);
      });

        const loadImageDataURI = async () => {
          const dataURI = await fetchImageAndConvertToDataURI('inst', 'logo');
          setImageDataURI(dataURI);
        };

        loadImageDataURI()
  }, [setValue, studentCount, isData2, isReAdmission]);

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
          setStdID(d.id)
          setValue("name", d.name)
          setValue("phone", d.phone)
          setValue("present_address", d.present_address)
          setValue("permanent_address", d.permanent_address)
          setValue("email", d.email)
          const date = new Date(d.date_of_birth)
          const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
          setValue('date_of_birth', formattedDate);
          setValue("id_no", id)
          setValue("gender", d.gender)
          setValue("blood_group", (d.blood_group).toUpperCase())
          setValue("birth_certificate_no", d.birth_certificate_no)
          setValue("parent_name", d.parent_name)
          setValue("parent_phone", d.parent_phone)
          setValue("local_guardian", d.local_guardian)
          setValue("local_guardian_phone", d.local_guardian_phone)
        }),
      {
        loading: "Searching....",
        success: <b>Found!</b>,
        error: (error) => <b>{error.message}</b>,
      }
    );

    getImage("students", id.toString())
      .then(res=> {
        if(!res.ok) {
          console.log(res)
          return
        }
        document.querySelector('#logo').src =res.url
      })
      .catch(err=> {
        console.log(err)
      })
  }




  return (
    <>
    { isData3 ? 
    <div>
    {
      info.length == 0 ? <Alert
      title="You have not added your Institute Information!"
      subtitle="Please add institution informaton first!"
      link="/dashboard/admin-settings"
      linktitle="Add"
    /> :
    <>
      {isData && isData2 ? (
        <div style={{ overflow: "hidden" }}>
           <UploadDialog progress={uploadProgress.toString()} isOpen={isDialogOpen} onClose={handleCloseDialog}/>
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
                      
                    >
                    <div className="border p-5 rounded-xl grid grid-cols-2 gap-3 mt-5">
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
                          placeholder="ID"
                          required
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
                              <SelectItem value="O+">O+</SelectItem>
                              <SelectItem value="O-">O-</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </label>
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
                      {/* <label htmlFor="Image" className="md:col-span-1">
                        Student Photo
                        <Input type="file" name="image" />
                      </label> */}
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

                      <div>
                      <div className="">
                        <label htmlFor="drop-zone">
                          <div className="h-[100px]  flex flex-col items-center justify-center  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <input onChange={previewFile} 
                            className="hidden" id="drop-zone" 
                            type="file" 
                            accept="image/*"/>
                            <img id="logo" className="h-[70px]" src="https://i.postimg.cc/rF77ZXQj/image.png"/>
                          </div>
                        </label>
                      </div>
                      <div className="mt-3 text-gray-400 font-medium">Choose Student Photo</div>
                      </div>
                      <Button
                        size="sm"
                        className="h-8 gap-1 mt-5 col-span-2"
                      >
                        Submit & Generate Payslip
                      </Button>

                      </div>
                    </form>
                    
                  </TabsContent>

                  <TabsContent value="readmission">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="border p-5 rounded"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
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
                        <label htmlFor="Gender" className="md:col-span-1">
                          Gender
                          <Input
                            disabled
                            {...register("gender", { required: true })}
                            type="text"
                            name="gender"
                            placeholder="Gender"
                          />
                        </label>
                        <label htmlFor="ID" className="md:col-span-1">
                          Student ID
                          <Input
                            disabled
                            {...register("id_no", { required: true })}
                            type="number"
                            name="id_no"
                            placeholder="ID"
                          />
                        </label>
                        <label htmlFor="Blood Group" className="md:col-span-1">
                          Blood Group
                          <Input
                            disabled
                            {...register("blood_group", { required: true })}
                            type="text"
                            name="blood_group"
                            placeholder="Blood Group"
                          />
                        </label>
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

                        <div>
                      <div className="">
                        <label htmlFor="drop-zone">
                          <div className="h-[100px]  flex flex-col items-center justify-center  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <input onChange={previewFile} 
                            className="hidden" id="drop-zone" 
                            type="file" 
                            accept="image/*"/>
                            <img id="logo" className="h-[70px]" src="https://i.postimg.cc/rF77ZXQj/image.png"/>
                          </div>
                        </label>
                      </div>
                      <div className="mt-3 text-gray-400 font-medium">Choose Student Photo</div>
                      </div>

                      </div>

                      

                      <Button
                        size="sm"
                        className="h-8 gap-1 mt-5 col-span-2 w-full"
                      >
                        Submit & Generate Payslip
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
                      <CardTitle className="flex flex-col items-center justify-center gap-2 text-lg">
                        <div className="">
                          <img alt="logo" className="h-[80px]" src={imageDataURI}/>
                        </div>

                        <div className="lg:w-[77%]">
                          <div>
                            {info[0].name}
                          </div>
                          <div className="text-sm">EIIN: {info[0].eiin}</div>
                          <CardDescription>
                            Date: {dateTime(new Date())}
                          </CardDescription>
                        </div>
                      </CardTitle>

                      <div className="text-xl mt-2 font-bold">
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
          <div className={isGenerate ? "block mt-60": "hidden"}>
            <div className="lg:grid grid-cols-2  gap-5">
            <div  style={{transform: "scale(2)"}} ref={targetRef}>
              
              <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                <CardHeader className="text-center bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="flex flex-col items-center justify-center gap-2 text-lg">
                      
                    <div className="">
                          <img alt="logo" className="h-[80px]" src={imageDataURI}/>
                        </div>

                      <div className="">
                        <div>{info[0].name}</div>
                        <div className="text-sm">EIIN: {info[0].eiin}</div>
                        <CardDescription>Date: {dateTime(new Date())}</CardDescription>
                      </div>
                    </CardTitle>

                    <div className="text-xl mt-2 font-bold">
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
    </>}
    </div> : <Loading/> }
    </>
  );
};

export default AddStudents;
