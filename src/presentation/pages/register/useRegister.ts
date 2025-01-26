import { RegisterValidationSchema } from "@domain/auth/auth.validations";
import { registerUseCase } from "@domain/auth/register.usecase";
import { zodResolver } from "@hookform/resolvers/zod";
import { httpClient } from "@infra/http-client";
import { useToast } from "@presentation/hooks/use-toast";
import { authService } from "@services/auth.service";
import { useCallback } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { z } from "zod";

type Form = z.infer<typeof RegisterValidationSchema>
export function useRegister() {
    const navigate = useNavigate()
    const { toast } = useToast()

    const { formState:{ errors, isSubmitting }, register, handleSubmit } = useForm<Form>({
        resolver: zodResolver(RegisterValidationSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const handleRegister: SubmitHandler<Form> = useCallback(async (data: Form) => {
        const service = authService({
            client: httpClient
        })
        try {
            await registerUseCase({
                service
            }).execute(data)

            toast({
                variant: "success",
                title: "Success",
                description: "User registration successful",
            })
            
            navigate("/auth/login", { replace: true }) 
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "There was an error registering the user",
            })
        }
    }, [])

    return {
        errors,
        isSubmitting,
        register,
        handleSubmit,
        handleRegister
    }
}