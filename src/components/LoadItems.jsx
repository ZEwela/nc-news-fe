const LoadItems = ({itemsLength, totalItems, limit, loadMoreButtonDisabled, handleLoadMore, handleLoadLess}) => {
    return (
        <>
            <section>
                {itemsLength !== totalItems && <button disabled={loadMoreButtonDisabled} onClick={ () => handleLoadMore()} className="article-list-load-button">
                    Load more
                </button>}
                { itemsLength > limit && <button onClick={handleLoadLess} className="article-list-load-button">
                    Load less
                </button>}
            </section>
        </>
    )
}

export default LoadItems