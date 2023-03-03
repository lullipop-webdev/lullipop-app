import Slider from "./Slide"

type Props = {
    heading: string,
    message: string
}

const Hero: React.FC = () => {
    return(
        <div className='flex items-center justify-center h-screen min-h-full overflow-hidden'>
        <div className='absolute top-0 left-0 right-0 bottom-0 h-screen' />
        <Slider heading="DENIM" message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent viverra quam sem, eu consectetur velit tincidunt in. Aenean ut felis eget purus feugiat aliquam sit amet nec nulla. Sed viverra nisl eget velit dictum, finibus viverra risus elementum."/>
            
        {/* <div className='p-5 text-white z-[2] mt-[-10rem]'>
            <h2 className='text-5xl font-bold'>{heading}</h2>
            <p className='py-5 text-xl'>{message}</p>
            <button className='px-8 py-2 border'>Book</button>
        </div> */}
        </div>
    )
}

export default Hero