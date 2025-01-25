import { memo } from "react";
import logo from "@assets/metrix-logo_fundo-azul-1.png";
import { Input } from "@presentation/components/form/input";
import { Button } from "@presentation/components/button";


const Register = memo(() => {
    return <div className="flex w-100 h-full items-center justify-center">
        <div className="w-full flex flex-col gap-6 p-4 bg-white rounded-lg shadow-xl">
            <div>
                <picture className="w-100 h-12">
                    <img src={logo} alt="Login logo" />
                </picture>
            </div>
            <div className="w-full flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium" htmlFor="name">Name</label>
                    <Input className="w-100" id="name" placeholder="Enter your name" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium" htmlFor="email">Email</label>
                    <Input className="w-100" id="email" placeholder="Enter your email" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium" htmlFor="password">Password</label>
                    <Input className="w-100" id="password" type="password" placeholder="Enter your password" />
                </div>
            </div>
            <Button className="text-white">
                Register
            </Button>
        </div>
    </div>
})

export { Register }