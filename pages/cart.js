// import { getProductsInCollection, getCollections } from "@/lib/Shopify"
import Cart from "../components/Cart";

export default function cart({collections}) {
    return (
        <Cart />
    )
}

export async function getStaticProps() {
    // const collections = await getCollections(10);
    return {
      props: { }, // will be passed to the page component as props
    }
}