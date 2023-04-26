import { getProductsInCollection, getCollections } from "@/lib/Shopify"
import ShopNew from "../components/ShopNew";

export default function shop({collections}) {
    return (
        <ShopNew collections={collections} />
    )
}

export async function getStaticProps() {
    const collections = await getCollections(10);
    return {
      props: { collections }, // will be passed to the page component as props
    }
}