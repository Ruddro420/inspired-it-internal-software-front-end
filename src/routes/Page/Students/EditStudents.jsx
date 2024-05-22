/* eslint-disable react/no-unescaped-entities */
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
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  AdmissionFeeAdd,
  dateTime,
  fetchImageAndConvertToDataURI,
  formDate,
  getClasses,
  getImage,
  getLastStudent,
  getStudentById,
  studentAdd,
  studentReadmission,
} from "@/lib/api";
import { generateLetter } from "@/lib/functions";
import { AuthContext } from "@/Providers/AuthProvider";
import axios from "axios";
import { CreditCard, Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import generatePDF, { Margin, usePDF } from "react-to-pdf";

const EditStudents = () => {
  const { register, handleSubmit, setValue, watch } = useForm();

  // const [studentCount, setStudentCount] = useState(0);
  const [cands, setCandS] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isData, setIsData] = useState(false);
  // const [isData2, setIsData2] = useState(false);
  const [isData3, setIsData3] = useState(false);

  const [fee, setFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [other, setOther] = useState(0);
  const [isGenerate, setIsGenerate] = useState(false);
  const [isReAdmission, setIsReAdmission] = useState(false);
  const { targetRef } = usePDF();

  const [info, setInfo] = useState([]);
  const [stdId, setStdID] = useState("");
  const [imageDataURI, setImageDataURI] = useState(null);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isWithoutPayment, setisWithoutPayment] = useState(false);

  const { admin } = useContext(AuthContext);

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
          if (!isWithoutPayment) {
            setIsGenerate(true);
            setTimeout(() => {
              generatePDF(targetRef, {
                filename: `Admission_pay_${watch("id_no")}`,
                page: {
                  margin: Margin.SMALL,
                },
              });
            }, 1000);
            setTimeout(() => {
              setIsGenerate(false);
            }, 2000);
          }
        }),
      {
        loading: "Generating Pay Receipt...",
        success: <b>Generated!</b>,
        error: (error) => <b>{error.message}</b>,
      }
    );
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const uploadFile = async (filename) => {
    setIsDialogOpen(true);
    const formData = new FormData();
    const ext = image.name.split(".").pop();
    const renamedFile = new File([image], `${filename}.${ext}`, {
      type: image.type,
    });
    formData.append("image", renamedFile);
    try {
      const response = await axios.post(
        "http://localhost:5000/student_upload",
        formData,
        {
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        }
      );
      console.log("File uploaded:", response.data);
      setIsDialogOpen(false);
    } catch (error) {
      setIsDialogOpen(false);
      console.error("Error uploading file:", error);
    }
  };

  const [image, setImage] = useState(null);

  //  image upload
  const previewFile = () => {
    const preview = document.querySelector("#logo");
    const file = document.querySelector("input[type=file]").files[0];
    setImage(file);
    const reader = new FileReader();
    console.log(file);

    reader.addEventListener(
      "load",
      () => {
        preview.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const idGenerate = (course_batch) => {
    console.log(course_batch);
    const { name } = cands.filter((item) => item.value == course_batch)[0];
    let cb = generateLetter(name);
    const batch = name.split("-")[1];
    console.log(cb);
    getLastStudent()
      .then((res) => res.json())
      .then((data) => {
        // setIsData2(true);
        const year = new Date().getFullYear().toString();
        let id;
        // console.log(data)
        if (data.length > 0) {
          let sid = data[0].id_no;
          // console.log(sid)
          id = parseInt(sid.match(/\d{4}$/));
          id += 1;
          sid = sid.slice(0, -7);
          console.log(sid);
          id = id.toString().padStart(4, "0");
          id = sid + cb + batch + id;
        } else {
          id = year[2] + year[3] + cb + batch + "0001";
        }
        isReAdmission
          ? setValue("id_no", document.getElementById("student_id").value)
          : setValue("id_no", id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data) => {
    if (parseInt(fee) == 0 && !isWithoutPayment) {
      toast.error("You have forget to fill admission fee!");
      return;
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
        id_no: data.id_no,
      };
    } else {
      _data = {
        ...data,
        password: "123",
        classId: parseInt(data.classId),
        id_no: data.id_no,
        sectionId: null,
      };
    }
    if (isReAdmission) {
      delete _data.id_no;
      toast.promise(
        studentReadmission(_data, stdId)
          .then((res) => {
            return res.json();
          })
          .then((d) => {
            if (d.err) throw new Error(d.err);
            AdmissionDataSend({
              fee: parseFloat(fee),
              discount: parseFloat(discount),
              other: parseFloat(other),
              studentId: d.created.id,
              readmission: true,
            });
            setTimeout(() => {
              idGenerate(watch("classId"));
            }, 3000);
            if (image) {
              uploadFile(d.created.id_no.toString());
            }
          }),
        {
          loading: "Adding student...",
          success: <b>Successfully added!</b>,
          error: (error) => <b>{error.message}</b>,
        }
      );

      return;
    }

    if (!image) {
      toast.error("Please select student image");
      return;
    }

    toast.promise(
      studentAdd(_data)
        .then((res) => {
          return res.json();
        })
        .then((d) => {
          if (d.err) throw new Error(d.err);
          AdmissionDataSend({
            fee: parseFloat(fee),
            discount: parseFloat(discount),
            other: parseFloat(other),
            studentId: d.created.id,
            readmission: false,
          });

          setTimeout(() => {
            idGenerate(watch("classId"));
          }, 3000);

          if (image) {
            uploadFile(d.created.id_no.toString());
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

    const loadImageDataURI = async () => {
      const dataURI = await fetchImageAndConvertToDataURI("inst", "logo");
      setImageDataURI(dataURI);
    };

    if (admin) {
      setInfo(admin);
      setIsData3(true);
    }
    loadImageDataURI();
  }, [setValue, admin]);

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

  // get the id
  const id = useParams();
  console.log(id.id);

  useEffect(() => {
    toast.promise(
      getStudentById(id.id)
        .then((res) => {
          return res.json();
        })
        .then((d) => {
          console.log(d);
          if (!d) throw new Error("Student not found!");
          if (d.err) throw new Error(d.err);
          setStdID(d.id);
          setValue("name", d.name);
          setValue("phone", d.phone);
          setValue("present_address", d.present_address);
          setValue("permanent_address", d.permanent_address);
          setValue("email", d.email);
          setValue("date_of_birth", formDate(d.date_of_birth));
          setValue("id_no", id.id);
          setValue("gender", d.gender);
          setValue("blood_group", d.blood_group.toUpperCase());
          setValue("birth_certificate_no", d.birth_certificate_no);
          setValue("parent_name", d.parent_name);
          setValue("parent_phone", d.parent_phone);
          setValue("local_guardian", d.local_guardian);
          setValue("local_guardian_phone", d.local_guardian_phone);
        }),
      {
        loading: "Searching....",
        success: <b>Found!</b>,
        error: (error) => <b>{error.message}</b>,
      }
    );

  
  }, [id, setValue]);

  getImage("students", id.id)
  .then((res) => {
    console.log(res);
    if (!res.ok) {
      console.log(res);
      return;
    }
    document.querySelector("#logo").src = res.url;
  })
  .catch((err) => {
    console.log(err);
  });

  return (
    <>
      {isData3 ? (
        <div>
          {info.length == 0 ? (
            <Alert
              title="You have not added your Institute Information!"
              subtitle="Please add institution informaton first!"
              link="/dashboard/admin-settings"
              linktitle="Add"
            />
          ) : (
            <>
              {isData ? (
                <div style={{ overflow: "hidden" }}>
                  <UploadDialog
                    progress={uploadProgress.toString()}
                    isOpen={isDialogOpen}
                    onClose={handleCloseDialog}
                  />
                  <h1 className="text-2xl font-bold mb-3">
                    Update Student Data {new Date().getFullYear()}
                  </h1>
                  {cands.length == 0 ? (
                    <Alert
                      title="You have not added course yet!"
                      subtitle="To add students, create course first!"
                      link="/dashboard/add-classes"
                      linktitle="Add"
                    />
                  ) : (
                    <div className="grid lg:grid-cols-1 gap-5">
                      <div className="col-span-2">
                        {/* Readmission */}

                        <div className="border p-5 rounded mt-5">
                          <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="grid grid-cols-2 gap-3"
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
                                {...register("present_address", {
                                  required: true,
                                })}
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
                                {...register("date_of_birth", {
                                  required: true,
                                })}
                                type="date"
                                required
                                name="date_of_birth"
                              />
                            </label>
                            <label htmlFor="Class" className="md:col-span-1">
                              Course & Batch
                              <Select
                                onValueChange={(value) => {
                                  getClass(value);
                                  return setValue("classId", value);
                                }}
                                required
                                value={watch("classId")}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Course and Batch" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Select Course and Batch</SelectLabel>
                                    {cands.map((cs) => (
                                      <SelectItem
                                        key={cs.name}
                                        value={cs.value}
                                      >
                                        {cs.name}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </label>
                            <label
                              htmlFor="Group"
                              className="md:col-span-1 hidden"
                            >
                              Group
                              <Select
                                onValueChange={(value) =>
                                  setValue("group", value)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Group" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Select Class</SelectLabel>
                                    <SelectItem value="na">N/A</SelectItem>
                                    <SelectItem value="science">
                                      Science
                                    </SelectItem>
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
                            <label
                              htmlFor="Session"
                              className="md:col-span-1 hidden"
                            >
                              Session
                              <Input
                                {...register("session", {
                                  required: false,
                                })}
                                type="text"
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
                                type="text"
                                name="id_no"
                                placeholder="ID"
                              />
                            </label>
                            <label
                              htmlFor="Blood Group"
                              className="md:col-span-1"
                            >
                              Blood Group
                              <Input
                                disabled
                                {...register("blood_group", {
                                  required: true,
                                })}
                                type="text"
                                name="blood_group"
                                placeholder="Blood Group"
                              />
                            </label>
                            <label
                              htmlFor="B/C Number"
                              className="md:col-span-1"
                            >
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
                            <label
                              htmlFor="Parents Name"
                              className="md:col-span-1"
                            >
                              Parents Name
                              <Input
                                {...register("parent_name", {
                                  required: true,
                                })}
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
                                {...register("parent_phone", {
                                  required: true,
                                })}
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
                                {...register("local_guardian", {
                                  required: true,
                                })}
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
                            {/*   <label
                                  htmlFor="Local Guardians Phone Number"
                                  className="md:col-span-1"
                                >
                                  Payment Received By
                                  <Input
                                    {...register("payment_received", {
                                      required: true,
                                    })}
                                    type="text"
                                    required
                                    name="payment_received"
                                    placeholder="Name Of Receiver"
                                  />
                                </label> */}
                            <div>
                              <div className="">
                                <label htmlFor="drop-zone">
                                  <div className="h-[100px]  flex flex-col items-center justify-center  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <input
                                      onChange={previewFile}
                                      className="hidden"
                                      id="drop-zone"
                                      type="file"
                                      accept="image/*"
                                    />
                                    <img
                                      id="logo"
                                      className="h-[70px]"
                                      src="https://i.postimg.cc/rF77ZXQj/image.png"
                                    />
                                  </div>
                                </label>
                              </div>
                              <div className="mt-3 text-gray-400 font-medium text-center">
                                Choose Student Photo
                              </div>
                            </div>
                            <Button
                              size="sm"
                              className="h-8 gap-1 mt-5 col-span-2 w-full"
                            >
                              Update Data
                            </Button>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Loading />
              )}
            </>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default EditStudents;
