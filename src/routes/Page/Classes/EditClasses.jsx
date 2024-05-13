import Loading from "@/components/app_components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getClassById } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditClasses = () => {
  const [classes, setClasses] = useState([]);
  const [isData, setIsData] = useState(false);
  // get data from URL
  const classId = useParams();
  useEffect(() => {
    getClassById(classId.id)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setClasses(data);
        setIsData(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [classId]);
  console.log(classes);
  return (
    <div style={{ overflow: "hidden" }}>
      <h1 className="text-2xl font-bold mb-3">Add Class/Batch</h1>
      {!isData ? (
        <Loading />
      ) : (
        <form className="border p-5 rounded">
          <div className="grid grid-cols-1 md:grid-cols-3 mt-3 gap-4">
            <label htmlFor="Tuition/Course Fee" className="md:col-span-1">
              Class/Batch Name
              <Input
                //{...register("name", { required: true })}
                type="text"
                name="name"
                placeholder="Class/Batch Name"
                value={classes.name}
              />
            </label>
            <label htmlFor="Tuition/Course Fee" className="md:col-span-1">
              Tuition/Course Fee
              <Input
                //{...register("fee", { required: true })}
                type="number"
                name="fee"
                placeholder="Tuition Fee"
                value={classes.fee}
              />
            </label>
            <label htmlFor="Tuition/Course Fee" className="md:col-span-1">
              Section
              <Input
                //{...register("fee", { required: true })}
                type="text"
                name="section"
                placeholder="Section"
                value={
                  classes.sections && classes.sections.length > 0
                    ? classes.sections[0].name
                    : "N/A"
                }
              />
            </label>
          </div>

          <Button type="submit" className="mt-3">
            Update Class/Batch
          </Button>
        </form>
      )}
    </div>
  );
};

export default EditClasses;
