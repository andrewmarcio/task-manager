import logo from "@assets/metrix-logo_fundo-azul-1.png";
import { Button } from "@presentation/components/button";
import { Input } from "@presentation/components/form/input";
import { memo } from "react";
import { useLogin } from "./useLogin";

const Login = memo(() => {
    const { errors, isSubmitting, handleLogin, handleSubmit, register } = useLogin()

    return <div className="flex w-100 h-full items-center justify-center">
        <div className="w-[30dvw] flex flex-col gap-6 p-4 bg-white rounded-lg drop-shadow-2xl">
            <div>
                <picture className="w-100 h-12">
                    <img src={logo} alt="Login logo" />
                </picture>
            </div>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(handleLogin)}>
                <div className="w-full flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold" htmlFor="email">Email</label>
                        <Input {...register("email")} className="w-100" id="email" placeholder="Enter your email" disabled={isSubmitting} />
                        {errors?.email && (<p className="text-xs text-red-600 font-medium">{errors.email.message}</p>)}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold" htmlFor="password">Password</label>
                        <Input {...register("password")} className="w-100" id="password" type="password" placeholder="Enter your password" disabled={isSubmitting} />
                        {errors?.password && (<p className="text-xs text-red-600 font-medium">{errors.password.message}</p>)}
                    </div>
                </div>
                <Button className="text-white" type="submit" loading={isSubmitting}>
                    Login
                </Button>
            </form>
            <Button variant="link" type="button" >
                <a href="/auth/register">
                    Sign up
                </a>
            </Button>
        </div>
    </div>
})

export { Login };
