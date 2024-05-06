import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSettings, settingsAdd, settingsUpdate, getImage } from "../../../lib/api";

import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import Loading from "@/components/app_components/Loading";
import toast from "react-hot-toast";
import axios from 'axios';
import UploadDialog from "@/components/app_components/UploadDialog";


const Settings = () => {
  const [settings, setSettings] = useState({});
  const [isData, setIsData] = useState(true);
  const [image, setImage] = useState(null)
  const {
    register,
    handleSubmit,
    setValue, // Add setValue from useForm
  } = useForm();

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  }; 
  const uploadFile = async (filename) => {
    setIsDialogOpen(true)
    const formData = new FormData();
    const ext = image.name.split(".").pop()
    const renamedFile = new File([image],`${filename}.${ext}`, {type: image.type})
    formData.append('image', renamedFile);
    try {
      const response = await axios.post('http://localhost:5000/logo_upload', formData, {
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        }
      });
      console.log('File uploaded:', response.data);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  const onSubmit = (data) => {
    if(!image) {
      toast.error("Please select institution Logo.")
      return
    }
    if (settings?.name) {
        toast.promise(
            settingsUpdate(data, settings.id)
        .then((res) => res.json())
        .then((d) => {
          if (d.err) throw new Error(d.err);
          if(image){
            uploadFile("logo")
          }

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
              if(d.err)
                throw new Error(d.err);

              if(image){
                  uploadFile("logo")
                }
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
        if (data.length != 0) {
          setValue("name", data[0]?.name || "");
          setValue("phone", data[0]?.phone || "");
          setValue("address", data[0]?.address || "");
          setValue("email", data[0]?.email || "");
          setValue("founding_date", data[0]?.founding_date || "");
          setValue("eiin", data[0]?.eiin || "");
        }
      })
      .catch((err) => {
        console.log(err);
      });

      getImage("inst", "logo")
      .then(res=> {
        if(!res.ok) {
          console.log(res)
          return
        }
        document.querySelector('#logo').src =res.url
      })
      .catch(err=> {
        console.log(err)
      })
      
  }, [setValue, settings?.name]);


  
 
  const previewFile = () => {
    const preview = document.querySelector('#logo')
    const file = document.querySelector('input[type=file]').files[0]
    setImage(file)
    const reader = new FileReader()

    reader.addEventListener('load', ()=> {
      preview.src = reader.result;
    }, false)

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      {!isData ? (
        <Loading />
      ) : (
        <div style={{ overflow: "hidden" }}>
          <UploadDialog progress={uploadProgress.toString()} isOpen={isDialogOpen} onClose={handleCloseDialog}/>
          <h1 className="text-2xl font-bold mb-3">Institute Information</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border p-5 rounded"
            key={settings?.id}
          >
            <div className="flex items-center justify-center">
              <label htmlFor="drop-zone">
              <div className="py-5 px-10 flex flex-col items-center justify-center  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <input onChange={previewFile} id="drop-zone" className="hidden" type="file" accept="image/*"/>
              <img id="logo" className="h-[70px]" src="https://i.postimg.cc/rF77ZXQj/image.png"/>
              </div>
              </label>
            </div>
            <div className="font-medium text-center text-gray-600">Choose Institution Logo</div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
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
