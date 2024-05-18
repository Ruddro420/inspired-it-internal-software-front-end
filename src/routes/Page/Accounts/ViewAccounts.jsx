/* eslint-disable react/prop-types */
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useEffect, useState } from "react";
import { dateTime, deleteAccounts, getAccounts } from "@/lib/api";
import toast from "react-hot-toast";
import Alert from "@/components/app_components/Alert";
const ViewAccounts = ({ dataLoad, setDataLoad }) => {
  const [account, setAccount] = useState([]);
  /* Get Account Data */
  useEffect(() => {
    getAccounts()
      .then((res) => res.json())
      .then((data) => {
        setAccount(data);
        //setDataLoad(false);
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
        //setDataLoad(false); // Make sure to set dataLoad to false even if there's an error
      });
  }, [dataLoad]);

  /* Delete Class */
  const deleteHandler = (id) => {
    // Prompt the user for confirmation
    if (window.confirm("Are you sure you want to delete this?")) {
      // If the user confirms, proceed with the deletion
      toast.promise(
        deleteAccounts(id).then((res) => {
          if (!res.ok) {
            throw new Error("Failed to delete!");
          }
          const acnt = account.filter((item) => item.id != id);
          setAccount(acnt);
          return res.json();
        }),
        {
          loading: "Deleting Class...",
          success: <b>Successfully deleted!</b>,
          error: <b>Failed to delete.</b>,
        }
      );
    }
  };

  return (
    <TooltipProvider>
      <main className="">
        <Tabs defaultValue="all">
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>View Account Details</CardTitle>
              </CardHeader>
              <CardContent>
                {account.length == 0 ? (
                  <Alert title="No Data Found!" />
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name Of Purpose</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Transactions Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Date
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {account.map((item) => {
                        return (
                          <>
                            <TableRow>
                              <TableCell className="font-medium">
                                {item.purpose}
                              </TableCell>
                              <TableCell>{item.type}</TableCell>
                              <TableCell>{item.transaction_type}</TableCell>
                              <TableCell>{item.amount}</TableCell>
                              <div className="flex items-center">
                                <TableCell>
                                  {dateTime(new Date(item.date))}
                                </TableCell>
                              </div>
                              <TableCell>
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
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => deleteHandler(item.id)}
                                    >
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </TooltipProvider>
  );
};

export default ViewAccounts;
