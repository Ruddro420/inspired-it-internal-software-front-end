import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSettings, settingsAdd, settingsUpdate } from "../../../lib/api";

import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import Loading from "@/components/app_components/Loading";
import toast from "react-hot-toast";

const Settings = () => {
  const [settings, setSettings] = useState({});
  const [isData, setIsData] = useState(true);
  const {
    register,
    handleSubmit,
    setValue, // Add setValue from useForm
  } = useForm();

  const onSubmit = (data) => {
    if (settings?.name) {
        toast.promise(
            settingsUpdate(data, settings.id)
        .then((res) => res.json())
        .then((d) => {
            throw new Error(d.err);
        })
        .catch(() => {
        //   console.log(err);
        }),
            {
              loading: 'Updating Settings...', 
              success: <b>Successfully Updated!</b>, 
              error: (error)=> <b>{error.message}</b>, 
            }
          )
    } else {

        toast.promise(
            settingsAdd(data)
            .then((res) => res.json())
            .then((d) => {
                throw new Error(d.err);
            })
            .catch((err) => {
              console.log(err);
            }),
            {
              loading: 'Updating Settings...', 
              success: <b>Successfully Updated!</b>, 
              error: (error)=> <b>{error.message}</b>, 
            }
          )
     
    }
  };

  useEffect(() => {
    getSettings()
      .then((res) => res.json())
      .then((data) => {
        setSettings(data[0]);
        setIsData(true);
        if (!settings.name) {
          setValue("name", data[0]?.name || "");
          setValue("phone", data[0]?.phone || "");
          setValue("address", data[0]?.address || "");
          setValue("email", data[0]?.email || "");
          setValue("founding_date", data[0].founding_date || "");
          setValue("eiin", data[0]?.eiin || "");
        }
      })
      .catch((err) => {
        console.log(err);
      });


      
  }, [setValue, settings?.name]);



  return (
    <>
      {!isData ? (
        <Loading />
      ) : (
        <div style={{ overflow: "hidden" }}>
          <h1 className="text-2xl font-bold mb-3">Institute Information</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border p-5 rounded"
            key={settings?.id}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <label htmlFor="Name" className="md:col-span-1">
                Institute Name
                <Input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                />
              </label>
              <label htmlFor="Mobile Number" className="md:col-span-1">
                Mobile Number
                <Input
                  {...register("phone", { required: true })}
                  type="number"
                  name="phone"
                  placeholder="Mobile Number"
                  required
                />
              </label>
              <label htmlFor=" Address" className="md:col-span-1">
                Institute Address
                <Input
                  {...register("address", { required: true })}
                  type="text"
                  name="address"
                  placeholder="Address"
                  required
                />
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <label htmlFor="Email" className="md:col-span-1">
                Institute Email
                <Input
                  {...register("email", { required: true })}
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </label>
              <label htmlFor="Joining Date" className="md:col-span-1">
                Founding Date
                <Input
                  {...register("founding_date", { required: false })}
                  type="text"
                  name="founding_date"
                  placeholder="Joining Date"
                />
              </label>
              <label htmlFor="NID Number" className="md:col-span-1">
                EIIN Number
                <Input
                  {...register("eiin", { required: true })}
                  type="text"
                  name="eiin"
                  placeholder="EIIN Number"
                  required
                />
              </label>
            </div>
            {settings?.name ? (
              <Button type="submit" size="sm" className="h-8 gap-1 mt-5">
                Update Information
              </Button>
            ) : (
              <Button type="submit" size="sm" className="h-8 gap-1 mt-5">
                Add Information
              </Button>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default Settings;
