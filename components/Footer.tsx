import Link from "next/link"
import { useState } from "react";

const Footer = () => {
    const [color, setColor] = useState('transparent');
    const [textColor, setTextColor] = useState('white');
    
    return (
        <div className="flex text-black fixed left-0 bottom-0 w-full z-10 p-8 text-xs">
        <p className="mr-8">Copyright © 2023, MADE BY LULLIPOP & CO. LTD</p>
        <footer className="flex gap-8 items-center justify-center text-black z-10" style={{ backgroundColor: `${color}` }}>
            <Link href="/terms">Terms and Conditions</Link>
            <div>|</div>
            <Link href="/privacy">Privacy Policy</Link>
            <div>|</div>
            <Link href="/cookie">Cookie Policy</Link>
            <div>|</div>
            <Link href="/trafficing">Human Trafficing</Link>
            <div>|</div>
            <Link href="/acessibility">Accessibility Statement</Link>
        </footer>
        </div>
    )
}

export default Footer