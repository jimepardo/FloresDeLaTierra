import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Filter from '../components/Filter';
import Breadcrumb from '../components/Breadcrumb';
import ProductList from '../components/ProductList';
import { CartContext } from '../context/CartContext';
import loading from '../assets/loading.gif'; 

function ProductListByCategory() {
    const { category, subcategory } = useParams();

    const { load, search } = useContext(CartContext);

    const displayTitle = () => {
        const formattedCategory = category ? category.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';
        const formattedSubcategory = subcategory ? subcategory.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';

        if (formattedCategory && formattedSubcategory) {
            return `${formattedCategory} - ${formattedSubcategory}`;
        } else if (formattedCategory) {
            return formattedCategory;
        } else if (search) {
            return `Resultados para "${search}"`;
        }
        return "Todos los Productos";
    }


    return (
        <div id='main-content-wrapper' className='container-fluid'><br />
            <div style={{ padding: '20px', maxWidth: '80%', margin: '0 auto' }} >
                <h1 style={{ textAlign: 'center', color: '#344E41' }}>{displayTitle()}</h1>
                <br />
                <Breadcrumb category={category} subcategory={subcategory} />
                <br />
                <div className="row"> {/* Added a row for sidebar and main content */}
                    {/* Left Sidebar for Filters */}
                    <div className="col-lg-3 col-md-4 d-none d-md-block"> {/* Hidden on small screens, block on medium and up */}
                        <Filter />
                    </div>
                    {/* Main Content Area */}
                    <div className="col-lg-9 col-md-8">
                        <div className="row justify-content-center g-4" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }} >
                            {
                                load ? <img src={loading} alt="loading" className="loading" /> :
                                    <ProductList category={category} subcategory={subcategory}/>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductListByCategory;