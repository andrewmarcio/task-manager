import { memo } from "react";
import logo from "@assets/metrix-logo_fundo-azul-1.png"
 
const AppBar = memo(() => {
    return <nav className="w-100 flex shadow-xl px-8 bg-white">
        <div className="p-2">
            <picture>
                <img className="w-16 h-8 md:w-36 md:h-12" src={logo} alt="app logo" />
            </picture>
        </div>
    </nav>
})

export { AppBar }