import { ArrowUpRight, Users } from "lucide-react";

import { TbCurrencyTaka } from "react-icons/tb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link,  useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { getStudentById } from "@/lib/api";
// import { Item } from "@radix-ui/react-dropdown-menu";
import Loading from "@/components/app_components/Loading";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [isData, setIsData] = useState(false);
  let id = useParams();

  /* Fetch students Data */
  useEffect(() => {
    getStudentById(id.id)
      .then((res) => res.json())
      .then((data) => {
        setStudent(data);
        setIsData(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  console.log(student);
  return (
    <>
      {!isData ? (
        <Loading />
      ) : (
        student && (
          <div className="">
            <div className="">
              <div className="flex justify-between flex-col-reverse md:flex-row gap-6">
                <div className="w-full md:w-[67%]">
                  <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
                    <Card x-chunk="dashboard-01-chunk-0">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Total Attendances
                        </CardTitle>
                        <TbCurrencyTaka className="h-5 w-5 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">20 Days</div>
                      </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-1">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Total Payment
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">৳ 2350+</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* container */}
                  <div className="border mt-4 rounded-md">
                    <CardHeader className="flex flex-row items-center">
                      <div className="grid gap-2">
                        <CardTitle>Transactions</CardTitle>
                        <CardDescription>
                          Recent transactions from your organization.
                        </CardDescription>
                      </div>
                      <Button asChild size="sm" className="ml-auto gap-1">
                        <Link to="#">
                          View All
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead className="hidden xl:table-column">
                              Type
                            </TableHead>
                            <TableHead className="hidden xl:table-column">
                              Status
                            </TableHead>
                            <TableHead className="hidden xl:table-column">
                              Date
                            </TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">Liam Johnson</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                liam@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden xl:table-column">
                              Sale
                            </TableCell>
                            <TableCell className="hidden xl:table-column">
                              <Badge className="text-xs" variant="outline">
                                Approved
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                              2023-06-23
                            </TableCell>
                            <TableCell className="text-right">
                              ৳250.00
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">Olivia Smith</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                olivia@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden xl:table-column">
                              Refund
                            </TableCell>
                            <TableCell className="hidden xl:table-column">
                              <Badge className="text-xs" variant="outline">
                                Declined
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                              2023-06-24
                            </TableCell>
                            <TableCell className="text-right">
                              ৳150.00
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">Noah Williams</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                noah@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden xl:table-column">
                              Subscription
                            </TableCell>
                            <TableCell className="hidden xl:table-column">
                              <Badge className="text-xs" variant="outline">
                                Approved
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                              2023-06-25
                            </TableCell>
                            <TableCell className="text-right">
                              ৳350.00
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">Emma Brown</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                emma@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden xl:table-column">
                              Sale
                            </TableCell>
                            <TableCell className="hidden xl:table-column">
                              <Badge className="text-xs" variant="outline">
                                Approved
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                              2023-06-26
                            </TableCell>
                            <TableCell className="text-right">
                              ৳450.00
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <div className="font-medium">Liam Johnson</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                liam@example.com
                              </div>
                            </TableCell>
                            <TableCell className="hidden xl:table-column">
                              Sale
                            </TableCell>
                            <TableCell className="hidden xl:table-column">
                              <Badge className="text-xs" variant="outline">
                                Approved
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                              2023-06-27
                            </TableCell>
                            <TableCell className="text-right">
                              ৳550.00
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </div>
                </div>

                {/* Profile Section */}
                <div className="md:w-[33%] w-full border rounded-md">
                  <div>
                    <Card
                      className="overflow-hidden"
                      x-chunk="dashboard-05-chunk-4"
                    >
                      <CardHeader className="flex flex-row items-start bg-muted/50">
                        <div className="grid gap-0.5">
                          <CardTitle className="group flex items-center gap-2 text-lg">
                            {student.name } #ID No: {student.id_no}
                          </CardTitle>
                          <CardDescription>
                            {student.class?.name}  {student.section &&  `- <b>Section:</b> ${student.section.name}`}
                          </CardDescription>
                        </div>
                        <div className="ml-auto flex items-center gap-1 border-2 rounded">
                          <img
                            alt="Product image"
                            className="aspect-square rounded-md object-cover "
                            height="64"
                            src={`http://localhost:5000/image/students/${student.id_no}`}
                            width="64"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 text-sm">
                        <div className="grid gap-3">
                          <div className="font-semibold">Personal Details</div>
                          <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground">
                                Email Address
                              </span>
                              <span>{student.email}</span>
                            </li>
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground">
                                Phone Number
                              </span>
                              <span>{student.phone}</span>
                            </li>
                          </ul>
                          <Separator className="my-2" />
                          <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground">
                                Date of Birth
                              </span>
                              <span>{student.date_of_birth}</span>
                            </li>
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground">
                                Group
                              </span>
                              <span>
                                {student.group
                                  ? student.group 
                                  : "No Group"}
                              </span>
                            </li>
                            <li className="flex items-center justify-between">
                              <span className="text-muted-foreground">
                                B/C Number
                              </span>
                              <span>{student.birth_certificate_no}</span>
                            </li>
                            <li className="flex items-center justify-between font-semibold">
                              <span className="text-muted-foreground">
                                Gender
                              </span>
                              <span>{student.gender }</span>
                            </li>
                            <li className="flex items-center justify-between font-semibold">
                              <span className="text-muted-foreground">
                                Session
                              </span>
                              <span>{student.session}</span>
                            </li>
                            <li className="flex items-center justify-between font-semibold">
                              <span className="text-muted-foreground">
                                Blood Group
                              </span>
                              <span>{student.blood_group }</span>
                            </li>
                          </ul>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-3">
                            <div className="font-semibold">Present Address</div>
                            <address className="grid gap-0.5 not-italic text-muted-foreground">
                              <span>{student.present_address}</span>
                            </address>
                          </div>
                          <div className="grid auto-rows-max gap-3">
                            <div className="font-semibold">
                              Permanent Address
                            </div>
                            <div className="text-muted-foreground">
                              <span>{student.permanent_address}</span>
                            </div>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid gap-3">
                          <div className="font-semibold">
                            Parents Information
                          </div>
                          <dl className="grid gap-3">
                            <div className="flex items-center justify-between">
                              <dt className="text-muted-foreground">
                                Parents Name
                              </dt>
                              <dd>{student.parent_name}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                              <dt className="text-muted-foreground">
                                Parents Phone
                              </dt>
                              <dd>
                                <a href="mailto:">{student.parent_phone}</a>
                              </dd>
                            </div>
                            <div className="flex items-center justify-between">
                              <dt className="text-muted-foreground">
                                L-Guardian Name
                              </dt>
                              <dd>
                                <a href="#">{student.local_guardian}</a>
                              </dd>
                            </div>
                            <div className="flex items-center justify-between">
                              <dt className="text-muted-foreground">
                                L-Guardian Phone
                              </dt>
                              <dd>
                                <a href="#">{student.local_guardian_phone}</a>
                              </dd>
                            </div>
                          </dl>
                        </div>
                        <Separator className="my-4" />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default StudentProfile;
