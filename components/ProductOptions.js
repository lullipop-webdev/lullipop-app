import React, { useState, useEffect } from 'react'

export default function ProductOptions({ name, values, selectedOptions, setOptions, productInventory, selectedVariant }) {
  //console.log(values)
  return (
    <fieldset className="mt-3 text-black dark:text-white">
      <legend className="text-xl font-semibold">{name}</legend>
      <div className="inline-flex items-center flex-wrap">
        {
          values&&values.map(value => {
            const id = `option-${name}-${value}`
            const checked = selectedOptions[name] === value

            return (
              <label key={id} htmlFor={id}>
                <input
                  className="sr-only"
                  type="radio"
                  id={id}
                  name={`option-${name}`}
                  value={value}
                  checked={checked}
                  onChange={() => {
                    setOptions(name, value)
                  }}
                />
                <div className={`p-2 pl-3 pr-3 mt-3 text-lg rounded block cursor-pointer mr-4 ${checked ? "text-white bg-[#e17e99]" : "text-white bg-zinc-800"}`}>
                  <span className="px-1">{value}</span>
                </div>
              </label>
            )
          })
        }
      </div>
    </fieldset>
  )
}