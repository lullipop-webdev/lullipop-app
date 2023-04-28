import { useRouter } from 'next/router';
import { useState } from 'react';

const navigation = [
    { name: 'Terms and Conditions', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Modern Slavery', href: '#' },
    { name: 'Accessibility Statement', href: '#' }
  ]
  
  export default function Footer() {
    const [color, setColor] = useState('transparent');
    const router = useRouter();

    const pathname = router.pathname;
    let determiner = false;

    if(pathname === "/") {
      determiner = true;
    }

    const opaqueLinks = "fixed left-0 bottom-0 w-full z-10"
    return (
      <footer style={{backgroundColor: (determiner) ? `${color}` : `none`}} className={`bg-white dark:bg-black ${determiner&&opaqueLinks} uppercase pb-3`}>
        <div className="mx-auto px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center items-center">
            <p className="text-xs text-center text-gray-400 dark:text-white">&copy; 1939-2023 Lullipop Ltd. All Rights Reserved</p>
            {
              navigation.map((item, i) => (
                <div key={i} className={`px-4 py-2 text-xs ${(i+1 < navigation.length) ? 'border-r' : ''} border-gray-500 dark:border-white`}>
                  <a href={item.href} className="text-gray-500 dark:text-white hover:text-white">
                    {item.name}
                  </a>
                </div>
              ))
            }
          </nav>
          
        </div>
      </footer>
    )
}