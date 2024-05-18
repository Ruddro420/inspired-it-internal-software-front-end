import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { useContext, useState } from "react";
import {
  fetchImageAndConvertToDataURI,
  getStudentById,
  RegularFeeAdd,
} from "@/lib/api";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
// import Transactions from "@/components/app_components/Transactions/Transactions";
import { Search } from "lucide-react";
import { AuthContext } from "@/Providers/AuthProvider";

const AddFees = () => {
  const { admin } = useContext(AuthContext);

  const { register, handleSubmit } = useForm();
  const [student, setStudent] = useState(null);
  const [isData, setIsData] = useState(false);
  const [getData, setGetData] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [regularFee, setRegularFee] = useState(0);
  const [fine, setFine] = useState(0);
  const [transportFee, setTransportFee] = useState(0);
  const [idCardFee, setidCardFee] = useState(0);
  const [uniformFee, setUniformFee] = useState(0);
  const [othersFee, setOthersFee] = useState(0);
  const [discountFee, setDiscountFee] = useState(0);
  const [prevDue, setPrevDue] = useState(0)


  //const [dataLoad,SetLoadData] = useState(false)

  const [imageDataURI, setImageDataURI] = useState(null);

  const feeDataHandler = (e) => {
    e.preventDefault();
    toast.promise(
      getStudentById(getData)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setStudent(data);
          setStudentId(data.id);
          setIsData(true);
          setPrevDue(data.due)
          if (!data) {
            throw new Error("Student not Found!");
          }
        }),
      {
        loading: "Searching....",
        success: <b>Found!</b>,
        error: (error) => <b>{error.message}</b>,
      }
    );

    const loadImageDataURI = async () => {
      const logoURI = await fetchImageAndConvertToDataURI("inst", "logo");
      setImageDataURI(logoURI);
    };

    loadImageDataURI();
  };

  const onSubmit = (data) => {
    data = {
      regular_fee: regularFee,
      transport_fee: transportFee,
      fine: fine,
      id_card_fee: idCardFee,
      uniform_fee: uniformFee,
      others_fee: othersFee,
      discount_fee: discountFee,
      studentId: studentId,
      due: prevDue - (regularFee  - discountFee)
    };
    toast.promise(
      RegularFeeAdd(data)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // SetLoadData(true)
          if (data.err) {
            throw new Error("Something went wrong!");
          }
        }),
      {
        loading: "Searching....",
        success: <b>Fee added successfully!</b>,
        error: (error) => <b>{error.message}</b>,
      }
    );
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <h1 className="text-2xl font-bold mb-3">Add Fee</h1>
          <form
            className="mb-5 flex items-center gap-2"
            onSubmit={feeDataHandler}
          >
            <Input
              className="max-w-[200px]"
              onChange={(e) => setGetData(e.target.value)}
              type="text"
              id="idNumber"
              placeholder="ID Search..."
            />
            <Button size="sm">
              <Search size={18} /> <span className="ml-2">Search</span>
            </Button>
          </form>

          {isData && student && (
            <div>
              <form
                className="border p-5 rounded-lg"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-3 gap-3">
                  <label htmlFor="Name" className="md:col-span-1">
                    Regular Fee
                    <Input
                      {...register("regular_fee", { required: true })}
                      onChange={(e) =>
                        setRegularFee(
                          !e.target.value == "" ? parseFloat(e.target.value) : 0
                        )
                      }
                      type="number"
                      name="regular_fee"
                      required
                      placeholder="Regular Fee"
                    />
                  </label>
                  <label htmlFor="Mobile Number" className="md:col-span-1">
                    Fine
                    <Input
                      {...register("fine")}
                      onChange={(e) =>
                        setFine(
                          !e.target.value == "" ? parseFloat(e.target.value) : 0
                        )
                      }
                      type="number"
                      name="fine"
                      placeholder="Fine"
                    />
                  </label>
                  <label htmlFor="Present Address" className="md:col-span-1">
                    Transport Fee
                    <Input
                      {...register("transport_fee")}
                      onChange={(e) =>
                        setTransportFee(
                          !e.target.value == "" ? parseFloat(e.target.value) : 0
                        )
                      }
                      type="number"
                      name="transport_fee"
                      placeholder="Transport Fee"
                    />
                  </label>

                  <label htmlFor="Permanent Address" className="md:col-span-1">
                    ID Card Fee
                    <Input
                      {...register("id_card_fee")}
                      onChange={(e) =>
                        setidCardFee(
                          !e.target.value == "" ? parseFloat(e.target.value) : 0
                        )
                      }
                      type="number"
                      name="id_card_fee"
                      placeholder="ID Card Fee"
                    />
                  </label>
                  <label htmlFor="Email" className="md:col-span-1">
                    Uniform Fee
                    <Input
                      {...register("uniform_fee")}
                      type="number"
                      onChange={(e) =>
                        setUniformFee(
                          !e.target.value == "" ? parseFloat(e.target.value) : 0
                        )
                      }
                      name="uniform_fee"
                      placeholder="Uniform Fee"
                    />
                  </label>
                  <label htmlFor="Date of Birth" className="md:col-span-1">
                    Others
                    <Input
                      {...register("others_fee")}
                      type="number"
                      onChange={(e) =>
                        setOthersFee(
                          !e.target.value == "" ? parseFloat(e.target.value) : 0
                        )
                      }
                      name="others_fee"
                      placeholder="Others"
                    />
                  </label>
                  <label htmlFor="discount_fee" className="md:col-span-1">
                    Discount Fee
                    <Input
                      {...register("discount_fee")}
                      type="number"
                      onChange={(e) =>
                        setDiscountFee(
                          !e.target.value == "" ? parseFloat(e.target.value) : 0
                        )
                      }
                      name="discount_fee"
                      placeholder="Discount Fee"
                    />
                  </label>
                </div>
                <Button size="sm" className="mt-5">
                  Submit
                </Button>
              </form>
              {/* <Transactions getData={getData} dataLoad={dataLoad} /> */}
            </div>
          )}
        </div>
        {isData && student && (
          <div>
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="flex flex-col items-center w-full">
                  <img className="h-10" src={imageDataURI}></img>
                  {admin && (
                    <div className="mt-3 text-center">
                      <div className="font-bold text-xl">{admin.inst_name}</div>
                      <div className="font-bold text-sm">
                        EIIN: {admin.inst_eiin}
                      </div>
                      <div className="font-bold mt-2">
                        Payment Money Reciept
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className=" text-sm">
                <div className="grid gap-3">
                  <Separator className="my-2" />
                  <div className="font-semibold">Student Infromation</div>
                  <ul className="grid gap-3 font-semibold">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Student Name
                      </span>
                      <span>{student.name}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Class</span>
                      <span>{student.class.name}</span>
                    </li>

                    {student.section && (
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">Section</span>
                        <span>{student.section.name}</span>
                      </li>
                    )}
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">#ID</span>
                      <span>{student.id_no}</span>
                    </li>
                    {student.group && (
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground font-semibold">
                          Group
                        </span>
                        <span className="uppercase">{student.group}</span>
                      </li>
                    )}
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Session</span>
                      <span>{student.session}</span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Fees</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Regular Fee</dt>
                      <dd className="font-semibold">
                        {regularFee.toString().padStart(2, "0")} ৳
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Fine</dt>
                      <dd className="font-semibold">
                        {fine.toString().padStart(2, "0")} ৳
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Transport Fee</dt>
                      <dd className="font-semibold">
                        {transportFee.toString().padStart(2, "0")} ৳
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">ID Card Fee</dt>
                      <dd className="font-semibold">
                        {idCardFee.toString().padStart(2, "0")} ৳
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Uniform Fee</dt>
                      <dd className="font-semibold">
                        {uniformFee.toString().padStart(2, "0")} ৳
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Others</dt>
                      <dd className="font-semibold">
                        {othersFee.toString().padStart(2, "0")} ৳
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Discount Fee</dt>
                      <dd className="font-semibold">
                        {discountFee.toString().padStart(2, "0")} ৳
                      </dd>
                    </div>
                  </dl>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground font-bold">
                    Paying This Time (৳)
                  </dt>
                  <dd className="font-bold">
                    {regularFee +
                      fine +
                      transportFee +
                      idCardFee +
                      uniformFee +
                      othersFee -
                      discountFee}
                    ৳
                  </dd>
                </div>
                <div className="flex items-center justify-between mt-3 font-bold">
                  <dt className="text-muted-foreground text-red-700">
                    Course/Class fee (৳)
                  </dt>
                  <dd className="font-bold">{student.class.fee} ৳</dd>
                </div>

                <div className="flex items-center justify-between mt-3 font-bold">
                  <dt className="text-muted-foreground text-red-700">
                    Previous Due (৳)
                  </dt>
                  <dd className="font-bold">
                    {prevDue} ৳
                  </dd>
                </div>
                
                <div className="flex items-center justify-between mt-3 font-bold">
                  <dt className="text-muted-foreground text-red-700">
                    Current Due (৳)
                  </dt>
                  <dd className="font-bold">
                    {prevDue -
                      (regularFee  -
                        discountFee)}
                    ৳
                  </dd>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default AddFees;
