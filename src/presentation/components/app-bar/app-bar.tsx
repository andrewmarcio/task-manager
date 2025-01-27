import { memo, useCallback } from "react";
import { Avatar } from "../avatar";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuShortcut, 
    DropdownMenuTrigger 
} from "../dropdown-menu";
import { LogOut, User } from "lucide-react";
import { authService } from "@services/auth.service";
import { cookiesService } from "@infra/cookies/cookies.service";
import { useNavigate } from "react-router-dom";
 
const AppBar = memo(() => {
    const navigate = useNavigate()
    
    const logOut = useCallback(() => {
        authService({ cookies: cookiesService(), client: {} as any}).logout()
        navigate("/auth/login")
    }, [])

    return <div className="w-100 flex flex-row items-center justify-between">
        <div className="flex flex-col">
            <h3 className="text-xl md:text-3xl font-bold">
                Welcome back!
            </h3>
        </div>

        <DropdownMenu modal>
            <DropdownMenuTrigger>
                <Avatar className="flex items-center justify-center">
                    <User className="text-gray-500 w-5 h-5" />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
                <DropdownMenuLabel>
                    <div className="flex flex-col font-sm">
                        Test User
                        <p className="text-xs font-normal">test.user@gmail.com</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem className="hover:cursor-pointer" onClick={logOut}>
                    Logout
                    <DropdownMenuShortcut>
                        <LogOut className="w-4 h-4" />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
})

export { AppBar };
