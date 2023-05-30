import React from 'react';
import StarRating from './StarRating'


const ReviewList = ({}) => {

  const reviews = [
    {
      name: 'John Doe',
      rating: 4,
      review:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at lorem vitae nunc malesuada efficitur. Sed ultricies urna nec velit faucibus elementum. Fusce eleifend augue non eros eleifend, sit amet bibendum turpis consequat. Nunc in gravida massa. Cras fringilla metus nunc, ut accumsan quam dictum non. Vestibulum blandit, augue vel iaculis fringilla, sapien diam consequat mi, quis tristique nibh dolor ac nibh. Nulla facilisi.',
      product: 'Organic Cotton Triangle Bra & Thong/Briefs Set - XS - RED'
    },
    {
      name: 'Jane Smith',
      rating: 5,
      review:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at lorem vitae nunc malesuada efficitur. Sed ultricies urna nec velit faucibus elementum. Fusce eleifend augue non eros eleifend, sit amet bibendum turpis consequat. Nunc in gravida massa. Cras fringilla metus nunc, ut accumsan quam dictum non. Vestibulum blandit, augue vel iaculis fringilla, sapien diam consequat mi, quis tristique nibh dolor ac nibh. Nulla facilisi.',
      product: 'Organic Cotton Triangle Bra & Thong/Briefs Set - M - TEAL'
    },
    {
      name: 'Bob Johnson',
      rating: 3,
      review:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at lorem vitae nunc malesuada efficitur. Sed ultricies urna nec velit faucibus elementum. Fusce eleifend augue non eros eleifend, sit amet bibendum turpis consequat. Nunc in gravida massa. Cras fringilla metus nunc, ut accumsan quam dictum non. Vestibulum blandit, augue vel iaculis fringilla, sapien diam consequat mi, quis tristique nibh dolor ac nibh. Nulla facilisi.',
      product: 'Organic Cotton Triangle Bra & Thong/Briefs Set - S - LAVENDER'
    }
  ];

  return (
    <div className="w-full mx-auto bg-gray-100 py-16 text-dark dark:text-white">
      <div className='container mx-auto px-6'>
        {reviews.map((review, i) => (
          <div key={review.name} className={`border-gray-400 ${ i===(reviews.length-1) ? '' : 'mb-8 border-b-4' }`}>
            <div className="flex items-center mb-2 justify-between">
              <h3 className="mr-2 uppercase text-2xl font-semibold">{review.name}</h3>
              <StarRating size={25} rate={review.rating}/>
            </div>
            <p className="mb-2 text-xl">{review.review}</p>
            <p className="text-sm font-medium text-dark uppercase my-6">{review.product}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default ReviewList;
