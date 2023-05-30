import Image from "next/image";
import Link from "next/link";

export default function ProductChoices() {

    const images = [
        'https://cdn.shopify.com/s/files/1/0691/7881/8843/products/custom_resized_d9e5e13b-48f4-4a90-be86-6a4ec01c3ba9.png?v=1673296066',  
        'https://cdn.shopify.com/s/files/1/0691/7881/8843/products/PinkBottomBack_720x1080_69e10a5d-dfe0-4a71-b0a9-dde2b8c2e63d.png?v=1673295464',
        'https://cdn.shopify.com/s/files/1/0691/7881/8843/products/JEZ_9714_c82ebb8a-8b5e-4445-8d00-8b3fb2814fde.jpg?v=1673295455',
        'https://cdn.shopify.com/s/files/1/0691/7881/8843/products/custom_resized_2d0c72a0-8148-4c30-8d2b-28d31a474c56.jpg?v=1673296064'
    ];
    const colors = [];

    const sizes = ["XS", "S", "S+", "M", "L", "XL", "XXL"]
    const sizeDefs = [];

    sizes.map((size, i) => {
        sizeDefs.push(
            <div className="container justify-center text-center mx-auto px-4 py-4 bg-zinc-800 border shadow-lg rounded-xl text-white">
                <p>{size}</p>
            </div>
        )
    })

    images.map((image, i) => {
        colors.push(
            <Image src={image} alt="Lullipop" width={160} height={90} className='object-fill rounded-xl'  />
        )
    })
    return (
        <div className="flex flex-col">
            <div className="flex flex-row w-full justify-between mt-2 mb-2">
                <p className="text-xs">Color: WFU Inspired Black and Gold Set</p>
                <Link href="#" className="text-xs text-pink-400 underline">Size Guide</Link>
            </div>
            <div className="flex flex-row w-full bg-zinc-800 border space-x-4 shadow-lg rounded-2xl mb-2 md:w-1/6">
                {colors}
            </div>
            <div>
                <p className="text-md">Bra Size</p>
            </div>
            <div className="flex flex-row mb-2">
                {sizeDefs}
            </div>
            <div className="mb-2">
                <p className="text-sm">Choose Thong or Briefs</p>
            </div>
            <div className="flex flex-row justify-center space-x-2 text-black">
                <select className="px-12 py-3 rounded-xl border-2 border-pink-400">
                    <option selected>Thong</option>
                </select>
                <select className="px-12 py-3 rounded-xl border-2 border-pink-400">
                    <option selected>XS</option>
                </select>
            </div>
        </div>
    )
}