import { Fragment, useState, useEffect } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

import { useRouter } from "next/router";
import ProductCard from "./ProductCard";
import { getProductsInCollection } from "@/lib/Shopify";

var sortOptionsList = [
  { name: 'Most Popular',       href: '#', key: 'BEST_SELLING', current: false },
  { name: 'Newest',             href: '#', key: 'CREATED',      current: false },
  { name: 'Title: A to Z',      href: '#', key: 'TITLE_ASC',    current: false },
  { name: 'Title: Z to A',      href: '#', key: 'TITLE_DESC',   current: false },
  { name: 'Price: Low to High', href: '#', key: 'PRICE_LOW',    current: false },
  { name: 'Price: High to Low', href: '#', key: 'PRICE_HIGH',   current: false },
];

const subCategories = [
    { name: 'Totes', href: '#' },
    { name: 'Backpacks', href: '#' },
    { name: 'Travel Bags', href: '#' },
    { name: 'Hip Bags', href: '#' },
    { name: 'Laptop Sleeves', href: '#' },
]
var filtersList = [
    {
      id: 'category',
      name: 'Category',
      options: [
        { value: 'new-arrivals', label: 'New Arrivals', checked: false },
        { value: 'sale', label: 'Sale', checked: false },
        { value: 'travel', label: 'Travel', checked: true },
        { value: 'organization', label: 'Organization', checked: false },
        { value: 'accessories', label: 'Accessories', checked: false },
      ],
    }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ShopNew = ({ collections }) => {
  const router = useRouter();
  const q = router.query.q;

  const [sortOptions, setSortOptions] = useState(sortOptionsList);
  const [filters, setFilters] = useState(filtersList);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [products, setProducts] = useState([]);
  const [globalProducts, setGlobalProducts] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const handleCollectionClick = async (collection, option_key = null) => {
    setSelectedCollection(collection);
    // Call a function or perform an action based on the selected collection
    console.log("selectedCollection:: ", selectedCollection);
    const products = await getProductsInCollection(collection.node.handle, option_key);
    setGlobalProducts(products);
    setProducts(products);
    // set categories
    const updatedFilters = filters.map(filter => {
      if (filter.id === 'category') {
        const updatedOptions = filter.options.reduce((acc, option) => {
          // check if productType is null
          for (let i = 0; i < products.length; i++) {
            const productType = products[i].node.productType;
            if (productType) {
              const updatedOption = { value: productType.toLowerCase(), label: productType, checked: false };
              // Check if option already exists in the filter
              if (!acc.some((opt) => opt.value === updatedOption.value)) {
                acc.push(updatedOption);
              }
            }
          }
          // If no matching product is found, update option with 'others'
          const othersOption = { value: 'others', label: 'Others', checked: false };
          if (!acc.some((opt) => opt.value === othersOption.value)) {
            acc.push(othersOption);
          }
          return acc;
        }, [])
        return { ...filter, options: updatedOptions }
      } else {
        return filter
      }
    })
    setFilters(updatedFilters);
  };

  const handleCategoryOnchange = async (filter_option, filter_id, event_checked) => {
    console.log("event_checked::", event_checked)
    const updatedFilters = filters.map(filter => {
      if (filter.id === filter_id) {
        const updatedOptions = filter.options.map(option => {
          if (option.value === filter_option.value) {
            return { ...option, checked: event_checked };
          } else {
            return option;
          }
        });
        return { ...filter, options: updatedOptions };
      } else {
        return filter;
      }
    });
    setFilters(updatedFilters);

    filterProductsByCategories(updatedFilters, filter_id);
  }

  const resetCategoryFilter = (filter_id) => {
    // set to false
    const updatedFilters = filters.map(filter => {
      if (filter.id === filter_id) {
        const updatedOptions = filter.options.map(option => {
          return { ...option, checked: false };
        });
        return { ...filter, options: updatedOptions };
      } else {
        return filter;
      }
    });
    console.log(updatedFilters);
    setFilters(updatedFilters);
  }

  const filterProductsByCategories = (_filters, filter_id) => {
    const fltr = _filters.filter((data) => data.id == filter_id);
    if(fltr.length > 0){
      var selectedOptions = fltr[0].options.filter(option => option.checked === true).map(option => (option.label == "Others") ? '' : option.label);
      console.log("selectedOptions::", selectedOptions);
      if (selectedOptions.length > 0){
        var filteredProducts = globalProducts.filter((product) => ( selectedOptions.includes(product.node.productType) ));
        setProducts(filteredProducts);
      } else {
        setProducts(globalProducts);
      }
    }
  }

  const handleSortOptionClick = (option_key) => {
    const newSortOptions = sortOptions.map(option => {
      return {...option, current: (option.key === option_key) }
    });
    setSortOptions(newSortOptions);
    handleCollectionClick(selectedCollection, option_key);
    resetCategoryFilter('category');
  };

  useEffect(() => {
    handleCollectionClick((selectedCollection != null) ? selectedCollection : collections[0]);
  }, [selectedCollection]);

  return (
    <div>
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Collections</h3>
                  <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                    {collections.map((collection, i) => (
                      <li key={i} onClick={() => handleCollectionClick(collection)}>
                        <a href="#" className="block px-2 py-3">
                          {collection.node.title}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    checked={option.checked}
                                    onChange={(event) => handleCategoryOnchange(option, section.id, event.target.checked) }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight dark:text-white text-gray-900">Shop</h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 dark:text-white hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 dark:text-white group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name} onClick={() => handleSortOptionClick(option.key)}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 dark:text-white hover:text-gray-500 sm:ml-7">
              <span className="sr-only">View grid</span>
              <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 dark:text-white sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <form className="hidden lg:block">
              <h3 className="sr-only">Categories</h3>
              <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900 dark:text-white">
                {collections.map((collection, i) => (
                  <li key={i} onClick={() => handleCollectionClick(collection)}>
                    <a href="#">{collection.node.title}</a>
                  </li>
                ))}
              </ul>

              {filters.map((section) => (
                <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white dark:bg-black py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900 dark:text-white">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon className="h-5 w-5 dark:text-white" aria-hidden="true" />
                            ) : (
                              <PlusIcon className="h-5 w-5 dark:text-white" aria-hidden="true" />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                checked={option.checked}
                                onChange={(event) => handleCategoryOnchange(option, section.id, event.target.checked) }
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600 dark:text-white"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>

            {/* Product grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                  products?.map(product => (
                    <ProductCard key={product.node.id} product={product} />
                  ))
                }
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ShopNew;