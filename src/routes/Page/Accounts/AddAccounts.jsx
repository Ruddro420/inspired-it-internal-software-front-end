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
import ViewAccounts from "./ViewAccounts";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { accountsAdd } from "@/lib/api";
import toast from "react-hot-toast";
const AddAccounts = () => {
    const [dataLoad,setDataLoad] = useState(true)
  const {
    register,
    handleSubmit,
    setValue,
    // reset
  } = useForm();

  /* Submit Accounts Data */
  const onSubmit = (data) => {
    // final Data
    data = {
      ...data,
      date: new Date(data.date),
      amount: parseInt(data.amount),
    };
    // add data
    accountsAdd(data)
      .then(function (response) {
        toast.success("Add Successfully");
        setDataLoad(data)
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      {" "}
      <div style={{ overflow: "hidden" }}>
        <h1 className="text-2xl font-bold mb-3">Add Accounts</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="border p-5 rounded">
          <div className="grid grid-cols-1 md:grid-cols-5 mt-3 gap-4">
            <label htmlFor="Name" className="md:col-span-1">
              Name Of Purpose
              <Input
                type="text"
                name="purpose"
                placeholder="Name Of Purpose"
                {...register("purpose", { required: true })}
              />
            </label>
            <label htmlFor="Tuition Fee" className="md:col-span-1">
              Type
              <Select
                onValueChange={(value) => setValue("type", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Type</SelectLabel>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </label>
            <label htmlFor="Tuition Fee" className="md:col-span-1">
              Transactions Type
              <Select
                onValueChange={(value) => setValue("transaction_type", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Transactions Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Type</SelectLabel>
                    <SelectItem value="income">Cash</SelectItem>
                    <SelectItem value="expense">Check</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </label>
            <label htmlFor="Name" className="md:col-span-1">
              Amount
              <Input
                type="number"
                name="amount"
                placeholder="Amount"
                {...register("amount", { required: true })}
              />
            </label>
            <label htmlFor="Assign Teacher" className="md:col-span-1">
              Date
              <Input
                type="date"
                name="date"
                {...register("date", { required: true })}
              />
            </label>
          </div>
          <Button size="sm" className="h-8 gap-1 mt-5">
            Add Accounts
          </Button>
        </form>
      </div>
      {/* View Account */}
      <ViewAccounts dataLoad={dataLoad}/>
    </>
  );
};

export default AddAccounts;
