import Loading from "@/components/app_components/Loading";
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
import toast from "react-hot-toast";

const AddSections = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue
  } = useForm();

  const [classes, setClasses] = useState([])

  const onSubmit = (data) => {
     reset()
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
        // console.log(data);
        toast.success('Successfully added!')
        setValue('classId',"")
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


  console.log(classes);


  return (
   <>
    {
      classes.length == 0 ? <Loading/> :  <div style={{ overflow: "hidden" }}>
      <h1 className="text-2xl font-bold mb-3">Add Sections</h1>
      {
        classes.length == 0 && <h1 className="bg-[#FF9E00] p-2 text-[white] rounded mb-2">Please Add Classes First</h1>
      }
      <form onSubmit={handleSubmit(onSubmit)} className="border p-5 rounded">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <label htmlFor="name" className="md:col-span-1">
            Name
            <Input
              {...register("name", { required: true })}
              type="text"
              id="name"
              placeholder="Name"
              disabled={classes.length === 0 ? true : false}
              required
            />
          </label>

        
         <label htmlFor="Class">
                        Class
                        <Select  onValueChange={(value) => setValue("classId", value)} id="Class" disabled={classes.length === 0 ? true : false} required>
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
        <Button size="sm" className="h-8 gap-1 mt-5" disabled={classes.length === 0 ? true : false}>
          Add Section
        </Button>
      </form>
    </div>
    }
   </>
  );
};

export default AddSections
