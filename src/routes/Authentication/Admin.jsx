import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
    const [eye, setEye] = useState(false)
    const handleEye = () => {
        setEye(!eye)
    }

    const handleLogin = () => {
      fetch('http://192.168.0.103:5000/admin_login', {
        method: 'POST',
        credentials: 'include', // Send cookies along with the request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: 'admin@gmail.com', password: 'admin'})
      })
      .then(res=> res.json())
      .then(data=> {
          console.log(data)
      })
      .catch(err=> {
          console.log(err)
      })
    }


    const handleLogout = () => {
      fetch('http://192.168.0.103:5000​/admin_logout', {
        method: 'GET',
        credentials: 'include', // Send cookies along with the request
      })
      .then(res=> res.json())
      .then(data=> {
          console.log(data)
      })
      .catch(err=> {
          console.log(err)
      })
    }

  return (
    <>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Login with your email and password!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label className="text-left" htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
              </div>
             <div className="flex gap-3 items-center relative"> 
             <Input id="password" placeholder="Password" type={eye ? "text":"password"} required />
             <div onClick={handleEye} className="absolute right-4 cursor-pointer">
                {
                    eye ? <EyeOff size="20"/> : <Eye size={20}/>
                }
             </div>
             </div>
            </div>
            <Button onClick={handleLogin} type="submit" className="w-full">
              Login
            </Button>
                Or
            <Link to="/staff_login">
            <Button onClick={handleLogout}>Logout</Button>
            <Button variant="outline" className="w-full">
            Staff Login
          </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Admin;
