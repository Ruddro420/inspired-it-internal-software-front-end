/* eslint-disable react/no-unescaped-entities */

// import IdCard from "@/components/app_components/ID_card";
import AddIdCards from "./AddIdCards";
import './Id.css'
import generatePDF, { Margin,  usePDF } from "react-to-pdf";
import { Earth, Home, Mail, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { getStudentById } from "@/lib/api";
import { useState } from "react";
import { Input } from "@/components/ui/input";



export default function IdCards() {
  const { targetRef } = usePDF();

  const [student, setStudent] = useState([])

  const findStudent = () => {
    const id = parseInt(document.getElementById('student_id2').value)
    toast.promise(
      getStudentById(id)
        .then((res) => {
          return res.json();
        })
        .then((d) => {
            console.log(d)
          if(!d) throw new Error("Student not found!");
          if (d.err) throw new Error(d.err);
          setStudent(d)

          setTimeout(() => {
            generatePDF(targetRef, 
              {
              filename: `id_card.pdf`,
              method: open,
              page: {
                margin: Margin.SMALL
              }
            })
          }, 1000);
        }),
      {
        loading: "Generating...",
        success: <b>Generated!</b>,
        error: (error) => <b>{error.message}</b>,
      }
    );
  }


  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <h1 className="text-2xl font-bold mb-3">ID Card Generate</h1>
        
          <div className="mt-3">
            <label htmlFor=" ID Card" className="md:col-span-1">
             ID Number
              <Input type="number" id="student_id2" placeholder="ID Number"required/>
            </label>
            
          </div>
          <Button onClick={findStudent} size="sm" className="h-8 gap-1 mt-5">
          Generate Id Card
        </Button>
   
      </div> 
     
      {student.length !== 0 && <div ref={targetRef}>
        <div className=" flex justify-center flex-wrap gap-10 mt-10">
            <div className="shadow-lg p-5 relative h-[700px] w-[500px] border">
                <div className="bg-black h-[40%]"></div>
                
                <div className="h-[250px] w-[250px] border-[10px] border-white bg-black rounded-full absolute top-[21%] left-[25%] overflow-hidden">
                <img className="h-[250px] w-[250px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHxUUQykf7SRL0PjPsBvhDZYBLU9UB_ISd8IsO7o31Ag&s"/>

                </div>
                <div className=" text-center   text-black">
                    <div className="mt-[130px] text-black text-3xl font-bold">{student.name}</div>
                    <div className="mt-0 text-xl">{student.class.name}</div>
                    {
                        student.section && <div className="mt-3 text-xl">{student.section.name}</div>
                    }
                    <div className="mt-3 text-xl font-bold">ID: {student.id_no}</div>
                    <div className="mt-14 flex justify-center grayscale"><img className="h-[60px]" src="https://i.postimg.cc/8PLTqbPB/image.png"/></div>
                </div>
            </div>
            

            <div className="shadow-lg p-5 relative h-[700px] w-[500px] border text-center">
               
                <div className="uppercase text-center mt-7 font-bold text-3xl">Internship Details</div>
               

               <div className="flex justify-center mt-10 flex-col items-center text-left">

               <table>
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

               </table>


               <div className="absolute bottom-0   flex flex-col items-center justify-center w-full">
                <div className="font-bold text-2xl text-center ">Company Information</div>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm px-3">
                    <div className="flex gap-3 items-center"> 
                        <div ><Mail size={16}/></div>
                        <div>inspireditbd@gmail.com</div>
                    </div>

                    <div className="flex gap-3 items-center"> 
                        <div ><Home size={16}/></div>
                        <div className="text-[12px] max-w-[170px]">Chartola more, Apex Building, College Rd, Rangpur 5400</div>
                    </div>


                    <div className="flex gap-3 items-center"> 
                        <div ><Earth size={16}/></div>
                        <div>inspireditbd.com</div>
                    </div>

                    <div className="flex gap-3 items-center"> 
                        <div ><PhoneCall size={16}/></div>
                        <div>01318-067123</div>
                    </div>

                  
                    
                    
                </div>
                <div className="h-1 bg-black w-[200px] mt-14 mb-2"></div>
                
                <div className="font-bold">Founder</div>

                <div style={{borderTopLeftRadius: "80px", borderTopRightRadius: "80px"}} className=" w-full bg-black left-0 mt-10 flex justify-center py-3">

                    <img className="h-[80px] bg-white" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"/>

                </div>
               </div>




               </div>
            </div>

            
        </div>
        </div>}
    </>
  );
}
