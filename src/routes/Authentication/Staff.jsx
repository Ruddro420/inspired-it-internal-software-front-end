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



const Staff = () => {
    const [eye, setEye] = useState(false)
    const handleEye = () => {
        setEye(!eye)
    }

  return (
    <>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Staff Login</CardTitle>
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
            <Button type="submit" className="w-full">
              Login
            </Button>
                Or
            <Link to="/admin_login">
            <Button variant="outline" className="w-full">
            Admin Login
          </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Staff;