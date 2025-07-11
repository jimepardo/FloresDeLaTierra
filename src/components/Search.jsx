import { useState, useEffect } from 'react';

function Search({search, handleSearchChange}) {

    return (
        <>
            <div className="row justify-content-end mb-4">
                <div className="col-12 col-md-6 col-lg-4">
                    <form role="search">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Buscar productos ..."
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Search;