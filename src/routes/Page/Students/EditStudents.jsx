const EditStudents = () => {
  return (
    <>
      <div>
        <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
          <CardHeader className="text-center bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="flex flex-col items-center justify-center gap-2 text-lg">
                <div className="">
                  <img alt="logo" className="h-[80px]" src={imageDataURI} />
                </div>

                <div className="lg:w-[77%]">
                  <div>{admin?.inst_name}</div>
                  <div className="text-sm">EIIN: {admin?.inst_eiin}</div>
                  <CardDescription>
                    Date: {dateTime(new Date())}
                  </CardDescription>
                </div>
              </CardTitle>

              <div className="text-xl mt-2 font-bold">
                Addmission Payment Receipt
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold">Student Informations</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span>{watch("name")}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Class</span>
                  <span> {class_} </span>
                </li>
                {sec && (
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Section</span>
                    <span> {sec} </span>
                  </li>
                )}
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">#ID</span>
                  <span> {watch("id_no")} </span>
                </li>

                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Session</span>
                  <span> {watch("session")} </span>
                </li>
              </ul>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Addmission Fee</span>
                  <span>
                    <input
                      onChange={(e) =>
                        setFee(
                          !e.target.value == "" ? parseFloat(e.target.value) : 0
                        )
                      }
                      defaultValue={0}
                      className="border dark:bg-black rounded-xl w-[100px] text-center"
                      type="number"
                      placeholder="00"
                    />
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span>
                    <input
                      onChange={(e) =>
                        setDiscount(
                          !e.target.value == "" ? parseFloat(e.target.value) : 0
                        )
                      }
                      defaultValue={0}
                      className="border dark:bg-black  rounded-xl w-[100px] text-center"
                      type="number"
                      placeholder="00"
                    />
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Other</span>
                  <span>
                    <input
                      onChange={(e) =>
                        setOther(
                          !e.target.value == "" ? parseFloat(e.target.value) : 0
                        )
                      }
                      defaultValue={0}
                      className="border dark:bg-black  rounded-xl w-[100px] text-center"
                      type="number"
                      placeholder="00"
                    />
                  </span>
                </li>
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">Total</span>
                  <span>{fee + other - (fee + other) * (discount / 100)}</span>
                </li>
              </ul>
            </div>

            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Payment Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-1 text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    Type
                  </dt>
                  <dd>Cash</dd>
                </div>
              </dl>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground"></div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default EditStudents;
