import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ category, subcategory, productName }) => {

    const formatUrlSegment = (segment) => {
        return segment ? segment.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';
    };

    const toUrlSlug = (name) => {
        return name ? name.toLowerCase().replace(/\s+/g, '-') : '';
    };
    
    return (
        <>
            <nav aria-label="breadcrumb" className='container-fluid'>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                    <li className="breadcrumb-item"><Link to="/products">Productos</Link></li>
                    {category && (
                        <li className={`breadcrumb-item ${!subcategory ? 'active' : ''}`} aria-current={!subcategory ? 'page' : undefined}>
                            {!subcategory ? formatUrlSegment(category) : <Link to={`/products/${toUrlSlug(category)}`}>{formatUrlSegment(category)}</Link>}
                        </li>
                    )}
                    {(subcategory && !productName) && (
                        <li className={`breadcrumb-item ${!productName ? 'active' : ''}`} aria-current={!productName ? 'page' : undefined}>
                            {!productName ? formatUrlSegment(subcategory) : <Link to={`/products/${toUrlSlug(category)}/${toUrlSlug(subcategory)}`}>{formatUrlSegment(subcategory)}</Link>}
                        </li>
                    )}
                    {(subcategory && productName) && (
                        <>
                            <li className={`breadcrumb-item ${!subcategory && !productName ? 'active' : ''}`} aria-current={subcategory && productName ? 'page' : undefined}>
                                {!productName ? formatUrlSegment(subcategory) : <Link to={`/products/${toUrlSlug(category)}/${toUrlSlug(subcategory)}`}>{formatUrlSegment(subcategory)}</Link>}
                            </li>
                            <li className={`breadcrumb-item ${productName ? 'active' : ''}`} aria-current={productName ? 'page' : undefined}>
                                {productName}
                            </li>
                        </>
                    )}

                </ol>
            </nav >
        </>
    )
}

export default Breadcrumb;