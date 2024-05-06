import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { classAdd } from "@/lib/api";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

const AddClasses = () => {
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    // reset
  } = useForm();

  // const [isClick, setIsClick] = useState(false)

  const onSubmit = (data) => {
    toast.promise(
      classAdd(data)
      .then((res) => {
      return res.json();
      }).then((d) => {
        if(d.err)
         throw new Error(d.err);
      }),
      {
        loading: 'Creating class...', 
        success: <b>Successfully created!</b>, 
        error: (error)=> <b>{error.message}</b>, 
      }
    )
  };


  // For Class Data
  const className = [
    { id: "1", name: "Class One" },
    { id: "2", name: "Class Two" },
    { id: "3", name: "Class Three" },
    { id: "4", name: "Class Four" },
    { id: "5", name: "Class Five" },
  ];

  return (
    <div style={{ overflow: "hidden" }}>
      <h1 className="text-2xl font-bold mb-3">Add Class</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="border p-5 rounded">
        <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-4">
          <label htmlFor="Assign Teacher" className="md:col-span-1">
            Class Name
            <Select onValueChange={(value) => setValue("name", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {className.map((section) => (
                    <SelectItem key={section.id} value={section.name}>
                      {section.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </label>
          <label htmlFor="Tuition Fee" className="md:col-span-1">
            Tuition Fee
            <Input
              {...register("fee", { required: true })}
              type="number"
              name="fee"
              placeholder="Tuition Fee"
            />
          </label>
        </div>

        <Button type="submit" className="mt-3">
          Add Class
        </Button>
      </form>
    </div>
  );
};

export default AddClasses;
