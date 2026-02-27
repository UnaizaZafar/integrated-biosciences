import { Logo } from "../../assets/svgs/logo";

export default function Footer(){
    return(
        <>
        <footer className="w-full flex justify-center items-center py-4 px-6">
            <div className="w-full max-w-7xl flex justify-between items-center">
                <div className="shrink-0">
                    <Logo />
                </div>
            </div>
        </footer>
        </>
    )
}