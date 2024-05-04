import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/Providers/AuthProvider";
import { Eye, EyeOff } from "lucide-react";
import {  useEffect, useRef, useState, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [eye, setEye] = useState(false);
  const handleEye = () => {
    setEye(!eye);
  };

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate()
  const { changeUserState } = useContext(AuthContext)

  const handleLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    fetch("http://localhost:5000/admin_login", {
      method: "POST",
      credentials: "include", // Send cookies along with the request
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.errors){
          toast.error(data.errors.err)
        } else {
          changeUserState(data)
          if(!data.errors){
            navigate('/dashboard')
          }
        }

      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
      // if(admin)) {
      //   navigate('/dashboard')
      // }
  }, [])
  return (
    <>
      <Card className="mx-auto max-w-sm mt-10">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Login with your email and password!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label className="text-left" htmlFor="email">
                Email
              </Label>
              <Input
                name="email"
                id="email"
                type="email"
                ref={emailRef}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
              </div>
              <div className="flex gap-3 items-center relative">
                <Input
                  ref={passwordRef}
                  name="password"
                  id="password"
                  placeholder="Password"
                  type={eye ? "text" : "password"}
                  required
                />
                <div
                  onClick={handleEye}
                  className="absolute right-4 cursor-pointer"
                >
                  {eye ? <EyeOff size="20" /> : <Eye size={20} />}
                </div>
              </div>
            </div>
            <CardFooter>
              <Button onClick={handleLogin} type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
