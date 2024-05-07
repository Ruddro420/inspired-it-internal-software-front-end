import {
  Edit,
  Eye,
  File,
  MoreHorizontal,
  PlusCircle,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import Loading from "@/components/app_components/Loading";
import { deleteClass, getClasses } from "@/lib/api";
import Alert from "@/components/app_components/Alert";

export default function Class() {
  const [classes, setClasses] = useState([]);
  const [isData, setIsData] = useState(false);

  useEffect(() => {
    getClasses()
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
        setIsData(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /* Delete Class */
  const deleteHandler = (id) => {
      toast.promise(
        deleteClass(id)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to delete!");
        }
        const cls = classes.filter((item) => item.id != id);
        setClasses(cls);
        return res.json();
        }),
        {
          loading: 'Deleting Class...', 
          success: <b>Successfully deleted!</b>, 
          error: <b>Failed to delete.</b>, 
        }
      )
  };

  return (
    <>
      {!isData ? (
        <Loading />
      ) : (
        <TooltipProvider>
          <main className="">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <div className="ml-auto flex items-center gap-2">
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Export
                    </span>
                  </Button>
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <Link
                      to="/dashboard/add-classes"
                      className="sr-only sm:not-sr-only sm:whitespace-nowrap"
                    >
                      Add Classes
                    </Link>
                  </Button>
                </div>
              </div>
              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Classes</CardTitle>
                    <CardDescription>Manage your classes here.</CardDescription>
                  </CardHeader>
                  {classes.length == 0 ? (
                    <Alert
                      title="No class is added yet!"
                      subtitle="You can manage your class after adding."
                      link="/dashboard/add-classes"
                      linktitle="Add"
                    />
                  ) : (
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Class Name</TableHead>
                            <TableHead>Section</TableHead>
                            <TableHead>Tuition Fee</TableHead>
                            {/* <TableHead className="hidden md:table-cell">
                        Assigned Teacher
                      </TableHead> */}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {classes.map((cls) => (
                            <TableRow key={cls.id}>
                              <TableCell className="font-medium">
                                <div className="">{cls.name}</div>
                              </TableCell>
                              <TableCell className="font-medium">
                                {cls.sections.length == 0 ? (
                                  <Badge variant="destructive">
                                    No section added!
                                  </Badge>
                                ) : (
                                  <div className="flex items-center gap-1 flex-wrap">
                                    {cls.sections.map((sc) => (
                                      <Badge key={sc.id}>{sc.name}</Badge>
                                    ))}
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="font-bold text-md">
                                  {cls.fee} ৳
                                </div>
                              </TableCell>
                              {/* <TableCell className="hidden md:table-cell">
                        Laser Lemonade
                      </TableCell> */}
                              <TableCell>
                                <div className="block lg:hidden">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="ghost"
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">
                                          Toggle menu
                                        </span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>
                                        Actions
                                      </DropdownMenuLabel>
                                      <Link
                                        to={`/dashboard/class-view/${cls.id}`}
                                      >
                                        <DropdownMenuItem>
                                          View
                                        </DropdownMenuItem>
                                      </Link>
                                      <DropdownMenuItem>Edit</DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => deleteHandler(cls.id)}>
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                                <div className="hidden lg:block">
                                  <div className="flex items-center justify-center gap-3">
                                    <Link
                                      to={`/dashboard/class-view/${cls.id}`}
                                    >
                                      <Button>
                                        <Eye size={20} className="mr-2" /> View
                                      </Button>
                                    </Link>
                                    <Button>
                                      <Edit size={20} className="mr-2" /> Edit
                                    </Button>
                                    <Button
                                      onClick={() => deleteHandler(cls.id)}
                                      variant="destructive"
                                    >
                                      <Trash size={20} className="mr-2" />
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </TooltipProvider>
      )}
    </>
  );
}
