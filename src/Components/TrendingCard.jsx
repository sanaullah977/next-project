import React from 'react';

const Trending = () => {
    return (
        <div>
             <div className='flex flex-col justify-center items-center bg-gray-100 p-10'>
            
            <h1 className='font-bold text-4xl'>Trending Apps</h1>
           

 <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-col-1 gap-10 items-center  justify-center md:p-10 sm:p-5 p-0 '>

  {
//    productsView.map(product => (
//     <Link to={`/appdetailsmain/${product.id}`}> <div key={product.id} className="card  border-2 bg-white w-72 shadow-md hover:scale-110 transition ease-in-out">
//        <figure className=''>
//          <img className='h-[180px] w-[220px] p-5'
//            src={product.image}
//            alt="Apps" />
//        </figure>
//        <div className="card-body">
//          <h2 className="card-title">
//            {product.title}
//          </h2>
//          <div className="card-actions justify-between">
//            <div className="badge badge-outline  text-green-600 bg-green-100"><img className='h-3' src={download} alt="" />{product.downloads}</div>
//            <div className="badge badge-outline  text-yellow-600 bg-yellow-100"><img className='h-3' src={rating} alt="" />{product.ratingAvg}</div>
//          </div>
//        </div>
//      </div></Link>
//    ))
  }
 </div>

           {/* <Link to='/apps'><button className='btn btn-outline bg-gradient-to-br from-[#632EE3] to-[#9F62F2] text-white w-30'>See All</button></Link> */}
           
            
        </div>
        </div>
    );
};

export default Trending;