import { LoginValidationSchema } from "@domain/auth/auth.validations";
import { loginUseCase } from "@domain/auth/login.usecase";
import { zodResolver } from "@hookform/resolvers/zod";
import { cookiesService } from "@infra/cookies/cookies.service";
import { httpClient } from "@infra/http-client";
import { useToast } from "@presentation/hooks/use-toast";
import { authService } from "@services/auth.service";
import { useCallback } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { z } from "zod";

type Form = z.infer<typeof LoginValidationSchema>
export function useLogin() {
    const navigate = useNavigate()
    const { toast } = useToast()

    const { formState:{ errors, isSubmitting }, register, handleSubmit } = useForm<Form>({
        resolver: zodResolver(LoginValidationSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const handleLogin: SubmitHandler<any> = useCallback(async (data: Form) => {
        const cookies = cookiesService()
        const service = authService({
            client: httpClient
        })
        try {
            await loginUseCase({
                cookies,
                service
            }).execute(data)

            toast({
                variant: "success",
                title: "Success",
                description: "Login successful",
            })
            
            navigate("/home", { replace: true })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "There was an error logging in",
            })
        }
    }, [])

    return {
        errors,
        isSubmitting,
        register,
        handleSubmit,
        handleLogin
    }
}