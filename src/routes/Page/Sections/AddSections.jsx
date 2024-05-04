import Alert from "@/components/app_components/Alert";
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
import { getClasses, sectionAdd } from "@/lib/api";
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
  const [isData, setIsData] = useState(false)

  const onSubmit = (data) => {
     
     toast.promise(
      sectionAdd(data)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create class");
      }
      reset()
      return res.json();
      }),
      {
        loading: 'Creating section...', 
        success: <b>Successfully created!</b>, 
        error: <b>Failed to create section.</b>, 
      }
    )
    
  };

  useEffect(() => {
    getClasses()
    .then(res=> res.json())
    .then(data=> {
      setClasses(data)
      setIsData(true)

    })
    .catch(err=> {
      console.log(err)
    })
  }, [])



  return (
   <>
    {
      !isData ? <Loading/> :  <div style={{ overflow: "hidden" }}>
      <h1 className="text-2xl font-bold mb-3">Add Sections</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="border p-5 rounded">
      {
        classes.length==0 && <Alert title="You have not added class yet!" subtitle="To create section, create class first!" link="/dashboard/add-classes" linktitle="Add"/>
      }
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
