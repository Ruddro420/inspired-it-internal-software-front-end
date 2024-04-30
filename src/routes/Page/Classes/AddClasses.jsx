import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { useEffect,  } from "react";
import { useForm } from "react-hook-form";

const AddClasses = () => {
  const {
    register,
    handleSubmit,
    // setValue,
    // reset
} = useForm()

// const [sections, setSections] = useState([])

  const onSubmit = (data) => {
    fetch('http://localhost:5000/class_add', {
      method: 'POST',
      credentials: 'include', 
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data)
  })
  .then(res=> res.json())
  .then(data=> {
    console.log(data)
  })
  .catch(err=> {
    console.log(err)
  })
  console.log(data)
  }

  useEffect(() => {
    // fetch("http://localhost:5000/sections", {
    //   method: 'GET',
    //   credentials: 'include', 
    // })
    // .then(res=> res.json())
    // .then(data=> {
    //   setSections(data)
    // })
    // .catch(err=> {
    //   console.log(err)
    // })
  }, [])




  // console.log(sections)

  return (
    <div style={{ overflow: "hidden" }}>
      <h1 className="text-2xl font-bold mb-3">Add Class</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="border p-5 rounded">
        <div className="grid grid-cols-1 md:grid-cols-3 mt-3 gap-4">
          <label htmlFor="Name" className="md:col-span-1">
            Name
            <Input {...register("name", { required: true })} type="text" name="name" placeholder="Name" />
          </label>
          <label htmlFor="Tuition Fee" className="md:col-span-1">
            Tuition Fee
            <Input {...register("fee", { required: true })} type="number" name="fee" placeholder="Tuition Fee" />
          </label>
          {/* <label htmlFor="Assign Teacher" className="md:col-span-1">
            Section
            <Select onValueChange={(value) => setValue("sectionId", value)} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Section"/>
                        </SelectTrigger>
                        <SelectContent >
                            <SelectGroup>
                              {
                                sections.map(section=> <SelectItem key={section.id} value={section.id}>{section.name}</SelectItem>)
                              }
                                
                              
                            </SelectGroup>
                        </SelectContent>
                </Select>
          </label> */}
        </div>

        <Button type="submit" className="mt-3">Add</Button>
      </form>
    </div>
  );
};

export default AddClasses;
