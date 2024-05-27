/* eslint-disable react/prop-types */
import Alert from "@/components/app_components/Alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { dateTime } from "@/lib/api";
import { Download } from "lucide-react";
import React from "react";
import generatePDF, { Margin, Resolution, usePDF } from "react-to-pdf";

const GenerateFeeReport = ({ regularFee, start, end, income }) => {
  const { targetRef } = usePDF();
  const downloadHandler = () => {
    // setTimeout(() => {
    //const id = parseInt(document.getElementById("student_id2").value);
    generatePDF(targetRef, {
      filename: `FEE_REPORT.pdf`,
      method: open,
      resolution: Resolution.HIGH,
      page: {
        margin: Margin.SMALL,
      },
    });
  };
  return (
    <TooltipProvider>
      {regularFee ? (
        <>
          <div className="mt-5">
            <Button
              onClick={downloadHandler}
              variant="destructive"
              size="sm"
              className="flex ml-auto gap-2  mt-2 mb-3"
            >
              <Download size={19} /> Download as PDF
            </Button>
          </div>
          <main className="">
            <Card x-chunk="dashboard-06-chunk-0">
              <div ref={targetRef}>
                <div className="mx-auto my-10">
                  <center>
                    <img src="https://i0.wp.com/inspireditbd.com/wp-content/uploads/2023/07/logo-scaled.webp?fit=512%2C120&ssl=1" />
                  </center>
                  <div className="flex justify-center mt-2 mx-auto items-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold mb-6">
                        Regular Fee Report
                      </h1>
                    </div>
                  </div>
                  <div className="flex justify-center items-center mb-5 text-md mt-2">
                    <div>
                      <div className="font-bold">
                        {" "}
                        <span className="pb-5">
                          {dateTime(new Date(start))} -{" "}
                          {dateTime(new Date(end))}
                        </span>{" "}
                      </div>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="text-xl">
                    {regularFee?.map((item) => (
                      <div
                        key={item.id}
                        className="lg:flex grid grid-cols-2 gap-6 justify-between items-center m-6 "
                      >
                        <div>
                          <b>DATE</b>
                          <p>=========</p>
                          <p>{dateTime(new Date(item.collectionDate))}</p>
                        </div>
                        <div>
                          <b>REGULAR FEE</b>
                          <p>===================</p>
                          <p>{item.regular_fee} ৳</p>
                        </div>
                        <div>
                          <b>FINE</b>
                          <p>===================</p>
                          {item.fine} ৳
                        </div>
                        <div>
                          <b>ID FEE</b>
                          <p>===================</p>
                          {item.id_card_fee} ৳
                        </div>
                        <div>
                          <b>DUE</b>
                          <p>===================</p>
                          {item.due} ৳
                        </div>

                        <div>
                          <b>TOTAL</b>
                          <p>===================</p>
                          {item.total}
                        </div>
                      </div>
                    ))}

                    <div>
                      <div className="ml-6 flex justify-between border-b-2 border-black items-center font-bold align-middle"></div>
                      <div className="flex justify-between ml-6 border-b-2 border-black items-center font-bold">
                        <p>TOTAL FEE</p>
                        <div className="flex justify-between gap-6 lg:mr-20 mb-10 mt-10 ">
                          <p className="lg:mr-16">
                            INCOME: {income} ৳
                          </p>
                          <p className="">TOTAL: {income} ৳</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </main>
        </>
      ) : (
        <Alert title="Please Select The Range Of The Report!" />
      )}
    </TooltipProvider>
  );
};

export default GenerateFeeReport;
