
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
import { Link } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getData } from '@/lib/GET';
import Spinner from '../Spinner';
import Loading from "../Loading";
import { dateTime } from "@/lib/api";
import { ArrowUpRight } from "lucide-react";



 
const Transaction = () => {

  const [date, setDate] = useState(new Date())
  const [monthly, setMonthly ] = useState([])
  const [transactions, setTransactions] = useState([])
  const [isData, setIsData] = useState(false)

  useEffect(() => {
    getData('transactions/with-month')
    .then(res=>res.json())
    .then(data=> {
      const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      data.sort((a, b) => {
        return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
    })
      setMonthly(data)
    })

    getData('transactions/all')
    .then(res=>res.json())
    .then(data=> {
      // console.log(data)
      setTransactions(data)
      setIsData(true)
      
    })

  }, [])
  

  const chartConfig = {
    type: "line",
    height: 240,
    series: [
      {
        name: "Sales",
        data: monthly.map(entry => entry.netProfit),
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: monthly.map(entry => entry.month),
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };



  return (
    <div>
      <main className="grid grid-cols-4 gap-5">
        
        <div className="col-span-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Latest Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your institution.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {!isData ? <Loading /> :
              <>
              {
                transactions.length > 0 ? <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Purpose</TableHead>
                    <TableHead>
                      Type
                    </TableHead>
                    <TableHead>
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  { transactions.map(entry => <TableRow key={entry.id}>
                    <TableCell>
                      <div className="font-medium">{entry.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {dateTime(new Date(entry.date))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`"text-xs" ${entry.type=='expense' ? "bg-red-500" : ""}`}>
                        {entry.type}
                      </Badge>
                    </TableCell>
                    <TableCell>৳{entry.amount}</TableCell>
                  </TableRow>)}              
                 
                </TableBody>
              </Table> : "No Data"
              }
              </>
}
            </CardContent>
          </Card>
        
        </div>
      <div>
      <div className="calendar rounded-md border flex justify-center">
      <Calendar
         mode="single"
         selected={date}
         onSelect={setDate}
        
         />
      </div>
      <Card className="mt-5">
      {monthly ? <Chart {...chartConfig} /> : <Spinner/>}
      </Card>
      </div>
      </main>
    </div>
  );
};

export default Transaction;
