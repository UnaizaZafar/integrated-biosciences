import { Logo } from "../../assets/svgs/logo";

export default function Footer(){
    return(
        <>
        <footer className="relative z-20 w-full h-screen flex justify-center items-center py-4 px-6 bg-[#e7e7e7]">
            <div className="w-full max-w-7xl flex justify-between items-center">
                <div className="shrink-0">
                    <Logo />
                </div>
            </div>
        </footer>
        </>
    )
}