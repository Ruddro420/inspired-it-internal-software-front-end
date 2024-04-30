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
} from "@/components/ui/select"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Sections = () => {
  const {
    register,
    handleSubmit,
    // reset
    setValue
  } = useForm();

  const [classes, setClasses] = useState([])

  const onSubmit = (data) => {
    // reset()
    fetch("http://localhost:5000/section_add", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({...data, classId: parseInt(data.classId)}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
  };

  useEffect(() => {
    fetch("http://localhost:5000/classes", {
      method: 'GET',
      credentials: 'include', 
    })
    .then(res=> res.json())
    .then(data=> {
      setClasses(data)
    })
    .catch(err=> {
      console.log(err)
    })
  }, [])



  return (
    <div style={{ overflow: "hidden" }}>
      <h1 className="text-2xl font-bold mb-3">Add Sections</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="border p-5 rounded">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          <label htmlFor="name" className="md:col-span-1">
            Name
            <Input
              {...register("name", { required: true })}
              type="text"
              id="name"
              placeholder="Name"
            />
          </label>

        
         <label htmlFor="Class">
                        Class and Section
                        <Select onValueChange={(value) => setValue("classId", value)} id="Class">
                            <SelectTrigger>
                                <SelectValue placeholder="Select Class" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Class</SelectLabel>
                                   {
                                    classes.map(cls=>  <SelectItem key={cls.id} value={cls.id.toString()}>{cls.name}</SelectItem>)
                                   }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </label>
       
        </div>
        <Button size="sm" className="h-8 gap-1 mt-5">
          Add Section
        </Button>
      </form>
    </div>
  );
};

export default Sections;
