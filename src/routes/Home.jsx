import { Login } from "@/components/app_components/Login";

const Home = () => {

    const handleGetCookie = () => {
        console.log('Cookie from server!')
        fetch('http://localhost:3000/setCookie', {
            method: 'GET',
            credentials: 'include' // Send cookies along with the request
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <Login />

            {/*  <Button onClick={handleGetCookie}>Get Cookie</Button> */}
        </div>
    );
};

export default Home;