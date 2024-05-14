import generatePDF, { Margin, Resolution, usePDF } from "react-to-pdf";
import { Download, Earth, Home, Mail, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { fetchImageAndConvertToDataURI, getStudentById } from "@/lib/api";
import { useContext, useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import QRCode from "react-qr-code";
import { AuthContext } from "@/Providers/AuthProvider";

// const fetchImageAndConvertToDataURI = async (imageUrl) => {
//   const response = await fetch(imageUrl, {credentials: "include"});
//   const blob = await response.blob();
//   return URL.createObjectURL(blob);
// };

export default function IdCards() {
  const { targetRef } = usePDF();
  const { register, setValue, watch } = useForm();
  const [student, setStudent] = useState([]);
  const [imageDataURI, setImageDataURI] = useState(null);
  const [imageDataURI2, setImageDataURI2] = useState(null);
  const [studentURI, setStudentURI] = useState(null);
  const { admin } = useContext(AuthContext);

  const findStudent = async (e) => {
    e.preventDefault();
    const id = parseInt(document.getElementById("student_id2").value);
    toast.promise(
      getStudentById(id)
        .then((res) => {
          return res.json();
        })
        .then((d) => {
          // console.log(d);
          if (!d) throw new Error("Student not found!");
          if (d.err) throw new Error(d.err);
          setStudent(d);
        }),
      {
        loading: "Generating...",
        success: <b>Generated!</b>,
        error: (error) => <b>{error.message}</b>,
      }
    );

    const studentPhotoDataURI = await fetchImageAndConvertToDataURI(
      "students",
      id.toString()
    );
    setStudentURI(studentPhotoDataURI);

    const signatureURI = await fetchImageAndConvertToDataURI(
      "inst",
      "signature"
    );
    setImageDataURI2(signatureURI);
  };

  const downloadIdCard = () => {
    // setTimeout(() => {
    const id = parseInt(document.getElementById("student_id2").value);
    generatePDF(targetRef, {
      filename: `ID_Card_${id}.pdf`,
      method: open,
      resolution: Resolution.HIGH,
      page: {
        margin: Margin.SMALL,
      },
    });
    // }, 1000);
  };

  useEffect(() => {
    const loadImageDataURI = async () => {
      const dataURI = await fetchImageAndConvertToDataURI("inst", "logo");
      setImageDataURI(dataURI);
      
    };
    loadImageDataURI();
  }, []);

  // console.log(student);

  return (
    <>
      <div style={{ overflow: "hidden", padding: "10px" }}>

        <h1 className="text-2xl font-bold mb-3">ID Card Generate</h1>
       
        <form onSubmit={findStudent}>
          <div className="grid grid-cols-1 md:grid-cols-5 mt-3 gap-4">
            <label htmlFor=" ID Card" className="md:col-span-1">
              ID Number
              <Input
                type="number"
                id="student_id2"
                placeholder="ID Number"
                required
              />
            </label>
            <label htmlFor=" ID Card" className="md:col-span-1">
              Type
              <Select
                onValueChange={(value) => setValue("type", value)}
                id="Type"
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Type</SelectLabel>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </label>
            <label htmlFor="ID Card" className="md:col-span-1">
              Issuer Type
              <Select
                onValueChange={(value) => setValue("issuer", value)}
                id="Class"
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Issuer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Issuer</SelectLabel>
                    <SelectItem value="Founder">Founder</SelectItem>
                    <SelectItem value="Principle">Principle</SelectItem>
                    <SelectItem value="Registrar">Registrar</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </label>
            <label htmlFor="Issue Date" className="md:col-span-1">
              Issue Date
              <Input
                {...register("issue_date", { required: true })}
                type="date"
                name="issue_date"
                placeholder="Issue Date"
                required
              />
            </label>
            <label htmlFor="Issue Date" className="md:col-span-1">
              Expiry Date
              <Input
                {...register("expiry_date", { required: true })}
                type="date"
                name="expiry_date"
                placeholder="Expiry Date"
                required
              />
            </label>
          </div>
          <Button size="sm" className="h-8 gap-1 mt-5">
            Generate Id Card
          </Button>
        </form>

        {student.length != 0 && (
          <Button
            onClick={downloadIdCard}
            variant="destructive"
            size="sm"
            className="flex gap-2 float-end"
          >
            <Download size={19} /> Download as PDF
          </Button>
        )}
      </div>

      {student.length !== 0 && (
        <div ref={targetRef}>
          <div className=" flex justify-center flex-wrap gap-10 mt-10">
          
            <div
              id="id_card"
              className="shadow-lg p-5 relative h-[700px] w-[500px] border"
            >
              <div className="bg-black h-[40%] text-5xl font-black justify-center flex items-center text-white">
                <span className="mb-[150px]"> {admin?.inst_name}</span>
              </div>

              <div className="h-[250px] w-[250px] border-[10px] border-white bg-black rounded-full absolute top-[21%] left-[25%] overflow-hidden">
                <img
                  className="h-[250px] w-[250px]"
                  src={
                    studentURI
                      ? studentURI
                      : "https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg"
                  }
                />
              </div>
              <div className=" text-center   text-black">
                <div className="mt-[130px] text-black text-3xl font-bold">
                  {student.name}
                </div>
                <div className="mt-1 text-md">{student.class.name}</div>
                {student.section && (
                  <div className="mt-1 text-md">{student.section.name}</div>
                )}
                <div className="mt-1 text-md ">
                  ID: <b>{student.id_no}</b>
                </div>
                <div>
                  Session: <b>{student.session}</b>
                </div>
                <div className="mt-14 flex justify-center grayscale">
                  <img className="h-[70px]" src={imageDataURI} />
                </div>
              </div>
            </div>

            <div className="shadow-lg p-5 relative h-[700px] w-[500px] border text-center">
              <div className="uppercase text-center mt-7 font-bold text-3xl">
                {watch("type")} Details
              </div>

              <div className="flex justify-center mt-5 flex-col items-center text-left">
                <table>
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>Parent</td>
                      <td className="pl-5">:</td>
                      <td className="pl-5">{student.parent_name}</td>
                    </tr>
                    <tr>
                      <td>Local Guardian</td>
                      <td className="pl-5">:</td>
                      <td className="pl-5">{student.local_guardian}</td>
                    </tr>

                    <tr>
                      <td>Blood Group</td>
                      <td className="pl-5">:</td>
                      <td className="pl-5 uppercase">{student.blood_group}</td>
                    </tr>

                    <tr>
                      <td>Mobile Number</td>
                      <td className="pl-5">:</td>
                      <td className="pl-5">{student.phone}</td>
                    </tr>
                    <tr>
                      <td>Present Address</td>
                      <td className="pl-5">:</td>
                      <td className="pl-5">{student.present_address}</td>
                    </tr>

                    <tr>
                      <td>Permanent Address</td>
                      <td className="pl-5">:</td>
                      <td className="pl-5">{student.permanent_address}</td>
                    </tr>
                    <tr>
                      <td>Issue Date</td>
                      <td className="pl-5">:</td>
                      <td className="pl-5">{watch("issue_date")}</td>
                    </tr>
                    <tr>
                      <td>Expiry Date</td>
                      <td className="pl-5">:</td>
                      <td className="pl-5">{watch("expiry_date")}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="absolute bottom-0   flex flex-col items-center justify-center w-full">
                  <div className="font-bold text-2xl text-center ">
                    Institution Information
                  </div>
                  <div className="flex justify-center w-full items-center">
                    <div className="mt-2 grid grid-cols-2 gap-3 text-sm px-3 ">
                      <div className="flex gap-3 items-center">
                        <div>
                          <Mail size={16} />
                        </div>
                        <div>{admin?.inst_email}</div>
                      </div>

                      <div className="flex gap-3 items-center">
                        <div>
                          <Home size={16} />
                        </div>
                        <div className="text-[12px] max-w-[170px]">
                          {admin?.inst_address}
                        </div>
                      </div>

                      <div className="flex gap-3 items-center">
                        <div>
                          <Earth size={16} />
                        </div>
                        <div>{admin?.inst_eiin}</div>
                      </div>

                      <div className="flex gap-3 items-center">
                        <div>
                          <PhoneCall size={16} />
                        </div>
                        <div>{admin?.inst_phone}</div>
                      </div>
                    </div>
                  </div>
                  <img className="h-10 mt-10" src={imageDataURI2} alt="signature"/>
                  <div className="h-1 bg-black w-[200px]  mb-0"></div>
                  <div className="font-bold">{watch("issuer")}</div>

                  <div
                    style={{
                      borderTopLeftRadius: "80px",
                      borderTopRightRadius: "80px",
                    }}
                    className=" w-full bg-black left-0 mt-7 flex justify-center py-3"
                  >
                    {/* <img
                      className="h-[80px] bg-white"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
                    /> */}
                    <div
                      style={{
                        height: "auto",
                        margin: "0 auto",
                        maxWidth: 64,
                        width: "100%",
                      }}
                      className="bg-white p-2"
                    >
                      <QRCode
                        size={256}
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        value="inspiredIt"
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
