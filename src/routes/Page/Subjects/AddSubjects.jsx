import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const AddSubjects = () => {
    return (
        <div style={{ overflow: "hidden" }}>
      <h1 className="text-2xl font-bold mb-3">Add Subject</h1>
      <form className="border p-5 rounded">
        <div className="grid grid-cols-1 md:grid-cols-3 mt-3 gap-4">
          <label htmlFor="Name" className="md:col-span-1">
            Name
            <Input type="text" name="name" placeholder="Name" />
          </label>
          <label htmlFor="Assign Teacher" className="md:col-span-1">
          Assign Subjects
            <Input type="text" name="assginTeacher" placeholder="Assign Teacher" />
          </label>
         
        </div>
        <Button size="sm" className="h-8 gap-1 mt-5">
                    Add Subject
                </Button>
      </form>
    </div> 
    );
};

export default AddSubjects;