import { Activity, MoreHorizontal, Users } from "lucide-react";

import { TbCurrencyTaka } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getClassById } from "@/lib/api";

const ClassView = () => {
    const location = useLocation()
    const param = location.pathname.split('/')[3]

    const [_class, setClass] = useState(null)

    useEffect(()=>{
      getClassById(param)
    .then(res=> res.json())
    .then(data=> {
      // console.log(data)
      setClass(data)
    })
    .catch(err=> {
      console.log(err)
    })
    }, [param])


  return (
    <div>
      {
        _class && <main className="flex flex-1 flex-col gap-4">
        <h1 className="text-2xl font-bold mb-3 border-2 p-3 rounded">
          {_class.name}
        </h1>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Teachers
              </CardTitle>
              <TbCurrencyTaka className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{_class.teachers.length}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{_class.student.length}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Section
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{_class.sections.length}</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Profit
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
            </CardContent>
          </Card>
        </div>
        <hr></hr>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-4">
          <TooltipProvider>
            <main className="">
              <h1 className="text-xl font-bold mb-3">Students</h1>
              <Tabs defaultValue="all">
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Section A</TabsTrigger>
                    <TabsTrigger value="draft">Section B</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="all">
                  <Card x-chunk="dashboard-06-chunk-0">
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                              <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Id</TableHead>
                            <TableHead className="hidden md:table-cell">
                              Address
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Class
                            </TableHead>
                            <TableHead>
                              <span className="sr-only">Actions</span>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="hidden sm:table-cell">
                              <img
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src="https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg"
                                width="64"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              Laser Lemonade
                            </TableCell>
                            <TableCell>3342</TableCell>
                            <TableCell className="hidden md:table-cell">
                              Ranpur , Bangladesh
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              Bangla
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>View</DropdownMenuItem>
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </main>
          </TooltipProvider>
          <TooltipProvider>
            <main className="">
              <h1 className="text-xl font-bold mb-3">Teachers</h1>
              <Tabs defaultValue="all">
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Leave</TabsTrigger>
                    <TabsTrigger value="draft">Replace</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="all">
                  <Card x-chunk="dashboard-06-chunk-0">
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                              <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Id</TableHead>
                            <TableHead className="hidden md:table-cell">
                              Address
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                              Class
                            </TableHead>
                            <TableHead>
                              <span className="sr-only">Actions</span>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {
                            _class.teachers.map(t=><TableRow key={t.teacher.id}>
                            <TableCell className="hidden sm:table-cell">
                              <img
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src="https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg"
                                width="64"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              {t.teacher.name}
                            </TableCell>
                            <TableCell>{t.teacher.id}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {t.teacher.present_address}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {t.teacher.department}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>View</DropdownMenuItem>
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>)
                          }
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </main>
          </TooltipProvider>
        </div>
      </main>
      }
    </div>
  );
};

export default ClassView;
