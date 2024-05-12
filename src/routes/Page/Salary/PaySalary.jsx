import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { getStudentById } from "@/lib/api";
// import { Item } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import Loading from "@/components/app_components/Loading";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Transactions from "@/components/app_components/Transactions/Transactions";

const PaySalary = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [student, setStudent] = useState(null);
  const [isData, setIsData] = useState(false);
  const [getData, setGetData] = useState();
  const [totalFee, setTotalFee] = useState(0);
  //let id = useParams();
  const feeDataHandler = (e) => {
    e.preventDefault();
    getStudentById(getData)
      .then((res) => res.json())
      .then((data) => {
        setStudent(data);
        setIsData(true);
        if (!data) {
          toast.error("Data Not Found!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*   useEffect(() => {
    
  }, [getData]); */
  /* Fetch students Data */

  //console.log(student);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateTotalFee = () => {
    const regularFee = parseFloat(watch("regular_fee")) || 0;
    const fine = parseFloat(watch("fine")) || 0;
    const transportFee = parseFloat(watch("transport_fee")) || 0;
    const bonusFee = parseFloat(watch("bonus_fee")) || 0;
    const othersFee = parseFloat(watch("others_fee")) || 0;

    const total =
      regularFee +
      transportFee +
      bonusFee +
      othersFee -
      fine;
    setTotalFee(total);
  };

  useEffect(() => {
    calculateTotalFee();
  }, [calculateTotalFee, watch]);

  return (
    <>
      {/* {!isData ? (
        <Loading />
      ) : (
        
      )} */}
      <div style={{ overflow: "hidden" }}>
        <h1 className="text-2xl font-bold mb-3">Add Salaries</h1>
        <form onSubmit={feeDataHandler} className="border p-5 rounded">
          <div className="grid grid-cols-1 md:grid-cols-1  mt-3 gap-4">
            <label htmlFor="Id Number" className="md:col-span-1">
              Id Number
              <Input
                onChange={(e) => setGetData(e.target.value)}
                type="number"
                id="idNumber"
                placeholder="Id Number"
                required
              />
            </label>
          </div>
          <Button size="sm" className="h-8 gap-1 mt-5">
            Search Id
          </Button>
        </form>

        {isData && student && (
          <section className="grid grid-cols-3 gap-3 mt-5">
            <div className="col-span-2">
              <form>
                <div className="border p-5 rounded-xl grid grid-cols-2 gap-3">
                  <label htmlFor="Name" className="md:col-span-1">
                    Regular Salary
                    <Input
                      {...register("regular_fee", { required: true })}
                      type="number"
                      name="regular_fee"
                      required
                      placeholder="Regular Fee"
                    />
                  </label>
                  <label htmlFor="Mobile Number" className="md:col-span-1">
                    Bonus Fee
                    <Input
                      {...register("bonus_fee", { required: true })}
                      type="number"
                      name="bonus_fee"
                      placeholder="Bonus Fee"
                    />
                  </label>
                  <label htmlFor="Present Address" className="md:col-span-1">
                    Transport Fee
                    <Input
                      {...register("transport_fee", { required: true })}
                      type="number"
                      name="transport_fee"
                      placeholder="Transport Fee"
                    />
                  </label>
                  <label htmlFor="Date of Birth" className="md:col-span-1">
                    Others
                    <Input
                      {...register("others_fee", { required: true })}
                      type="number"
                      name="others_fee"
                      placeholder="Others"
                    />
                  </label>
                  <label htmlFor="discount_fee" className="md:col-span-2">
                    Fine
                    <Input
                      {...register("fine", { required: true })}
                      type="number"
                      name="fine"
                      placeholder="Total Fine"
                    />
                  </label>

                  <Button size="sm" className="h-8 gap-1 mt-5 col-span-2">
                    Submit & Generate Payslip
                  </Button>
                </div>
              </form>
              {/* Transactions */}
              <Transactions />
            </div>
            <div className=" ">
              <div>
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-05-chunk-4"
                >
                  <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                      <CardTitle className="group flex items-center gap-2 text-lg">
                        {student.name} #ID No: {student.id_no}
                      </CardTitle>
                      <CardDescription>
                        {student.class?.name}
                        {student.section && `-Section: ${student.section.name}`}
                      </CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-1 border-2 rounded">
                      <img
                        alt="Product image"
                        className="aspect-square rounded-md object-cover "
                        height="64"
                        src={`http://localhost:5000/image/students/${student.id_no}`}
                        width="64"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                      <div className="font-semibold">Personal Details</div>
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Student Name
                          </span>
                          <span>{student.name}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Student ID NO
                          </span>
                          <span># {student.id_no}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Email Address
                          </span>
                          <span>{student.email}</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Phone Number
                          </span>
                          <span>{student.phone}</span>
                        </li>
                      </ul>
                      <Separator className="my-2" />
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground font-semibold">
                            Group
                          </span>
                          <span>
                            {student.group ? student.group : "No Group"}
                          </span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">Session</span>
                          <span>{student.session}</span>
                        </li>
                      </ul>
                    </div>
                    <Separator className="my-4" />

                    <Separator className="my-4" />
                    <div className="grid gap-3">
                      <div className="font-semibold">Fees Information</div>
                      <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">
                            Regular Salary
                          </dt>
                          <dd className="font-semibold">
                            {watch("regular_fee") ? watch("regular_fee") : "00"}{" "}
                            ৳
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Bonus Fee</dt>
                          <dd className="font-semibold">
                            {watch("bonus_fee") ? watch("bonus_fee") : "00"} ৳
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">
                            Transport Fee
                          </dt>
                          <dd className="font-semibold">
                            {watch("transport_fee")
                              ? watch("transport_fee")
                              : "00"}{" "}
                            ৳
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Others</dt>
                          <dd className="font-semibold">
                            {watch("others_fee") ? watch("others_fee") : "00"} ৳
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Fine</dt>
                          <dd className="font-semibold">
                          {watch("fine") ? watch("fine") : "00"} ৳
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground font-bold">
                        Total Payable (৳)
                      </dt>
                      <dd className="font-bold">{totalFee}৳</dd>
                    </div>
                    <div className="flex items-center justify-between mt-3 font-bold">
                      <dt className="text-muted-foreground text-red-700">
                        {" "}
                        Due (৳)
                      </dt>
                      <dd className="font-bold">100 ৳</dd>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default PaySalary;
