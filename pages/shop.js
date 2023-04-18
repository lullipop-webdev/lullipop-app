import { getProductsInCollection, getCollections } from "@/lib/Shopify"
import Shop from "../components/Shop";

export default function shop({categories}) {
    return (
        <div className="flex justify-center">
            <Shop categories={categories} />
        </div>
    )
}

export async function getStaticProps() {
    const categories = await getCollections(10);
    return {
      props: { categories }, // will be passed to the page component as props
    }
}