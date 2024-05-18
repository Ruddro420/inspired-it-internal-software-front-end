import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { useContext, useEffect, useState } from "react";
import {
  fetchImageAndConvertToDataURI,
  getCount,
  getTeacherOrStaffById,
  staffSalaryAdd,
  teacherSalaryAdd,
} from "@/lib/api";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { AuthContext } from "@/Providers/AuthProvider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Alert from "@/components/app_components/Alert";

const PaySalary = () => {
  const { admin } = useContext(AuthContext);

  const { register, handleSubmit } = useForm();
  const [employee, setEmployee] = useState(null);
  const [isData, setIsData] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);
  const [monthlySalary, setMonthlySalary] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [employeeType, setEmployeeType] = useState(null);

  /* Check Student */
  const [checkData, setCheckData] = useState([]);
  useEffect(() => {
    getCount()
      .then((res) => res.json())
      .then((data) => setCheckData(data));
  }, [setCheckData]);

  console.log(checkData);

  //const [dataLoad,SetLoadData] = useState(false)

  const [imageDataURI, setImageDataURI] = useState(null);

  const feeDataHandler = (e) => {
    e.preventDefault();
    setEmployeeType(e.target.employee.value);

    toast.promise(
      getTeacherOrStaffById(e.target.id_no.value, e.target.employee.value)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setEmployee(data);
          setEmployeeId(data.id_no);
          setIsData(true);
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
    if (employeeType == "staff") {
      data = {
        monthly_salary: monthlySalary,
        bonus: bonus,
        staffId: employeeId,
      };
      toast.promise(
        staffSalaryAdd(data)
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
    } else {
      data = {
        monthly_salary: monthlySalary,
        bonus: bonus,
        teacherId: employeeId,
      };
      toast.promise(
        teacherSalaryAdd(data)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
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
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <h1 className="text-2xl font-bold mb-3">Pay Salary</h1>
          {checkData.teacher != 0 || checkData.staff != 0 ? (
            <form
              className="mb-5 flex items-center gap-2"
              onSubmit={feeDataHandler}
            >
              <Input
                className="max-w-[200px]"
                type="number"
                id="id"
                name="id_no"
                placeholder="ID"
              />

              <label htmlFor="type">
                <Select id="type" name="employee" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Employee</SelectLabel>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </label>
              <Button size="sm">
                <Search size={18} /> <span className="ml-2">Search</span>
              </Button>
            </form>
          ) : (
            <Alert
              title="You have not added any Teachers/Staff yet!"
              subtitle="Create Teachers and Staff First"
            />
          )}

          {isData && employee && (
            <div>
              <form
                className="border p-5 rounded-lg"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-2 gap-3">
                  <label htmlFor="Name" className="md:col-span-1">
                    Monthly Salary
                    <Input
                      {...register("monthly_salary", { required: true })}
                      onChange={(e) =>
                        setMonthlySalary(
                          !e.target.value == "" ? parseFloat(e.target.value) : 0
                        )
                      }
                      type="number"
                      name="monthly_salary"
                      required
                      placeholder="Monthly Salary"
                    />
                  </label>
                  <label htmlFor="Mobile Number" className="md:col-span-1">
                    Bonus
                    <Input
                      {...register("bonus")}
                      onChange={(e) =>
                        setBonus(
                          !e.target.value == "" ? parseFloat(e.target.value) : 0
                        )
                      }
                      type="number"
                      name="bonus"
                      placeholder="Bonus"
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
        {isData && employee && (
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
                  <div className="font-semibold">Employee Infromation</div>
                  <ul className="grid gap-3 font-semibold">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Employee Name
                      </span>
                      <span>{employee.name}</span>
                    </li>

                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">#ID</span>
                      <span>{employee.id_no}</span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Fees</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Monthly Salary</dt>
                      <dd className="font-semibold">
                        {monthlySalary.toString().padStart(2, "0")} ৳
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Bonus</dt>
                      <dd className="font-semibold">
                        {bonus.toString().padStart(2, "0")} ৳
                      </dd>
                    </div>
                  </dl>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground font-bold">
                    Paying This Time (৳)
                  </dt>
                  <dd className="font-bold">{monthlySalary + bonus}৳</dd>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default PaySalary;
