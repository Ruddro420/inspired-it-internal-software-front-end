import { File, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { viewStudentsData } from "@/lib/api";
import StudentTable from "@/components/app_components/StudentTable";
import Loading from "@/components/app_components/Loading";
import Alert from "@/components/app_components/Alert";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isData, setIsData] = useState(false)
  /* Fetch students Data */
  useEffect(() => {
    viewStudentsData()
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setStudents(data);
        setIsData(true)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <>{
     !isData ? <Loading/> :
    <TooltipProvider>
      <main className="">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
             
              <Button disabled size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <Link
                  to="/dashboard/add-students"
                  className="sr-only sm:not-sr-only sm:whitespace-nowrap"
                >
                  Add Students
                </Link>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Students</CardTitle>
                <CardDescription>Manage your students here.</CardDescription>
              </CardHeader>
              <CardContent>
                {
                   students.length == 0 ? <Alert title="You have not added any Students yet!" subtitle="Here you can manage students!" link="/dashboard/add-students" linktitle="Add"/> : <StudentTable students={students}/>
                }
              
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </TooltipProvider>}</>
  );
}
