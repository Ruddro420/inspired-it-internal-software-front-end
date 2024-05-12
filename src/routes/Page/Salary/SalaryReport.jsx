
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const SalaryReport = () => {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <h1 className="text-2xl font-bold mb-3">Report Details</h1>
        <form className="border p-5 rounded">
          <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-4">
            <label htmlFor="Assign Teacher" className="md:col-span-1">
              From
              <Input type="date" name="fromdDate" />
            </label>
            <label htmlFor="Assign Teacher" className="md:col-span-1">
              To
              <Input type="date" name="toDate" />
            </label>
          </div>
          <Button size="sm" className="h-8 gap-1 mt-5">
            Generate Report
          </Button>
        </form>
      </div>
      {/* <TooltipProvider>
        <main className="">
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>View  Report Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Employee Name</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Employee ID
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Total Amount
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          29.04.2024 - 29.04.2024
                        </TableCell>
                        <TableCell>name</TableCell>

                        <TableCell>200364</TableCell>

                        <TableCell>15000 ৳</TableCell>
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
      </TooltipProvider> */}
      {/* <GenereateReport /> */}
    </>
  );
};

export default SalaryReport;