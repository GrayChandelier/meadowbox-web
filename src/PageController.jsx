import styles from "./App.module.scss";

export default function PageController({currentPage,setCurrentPage, lastPage, buttonsCount=3})
{

    if(currentPage > lastPage) {currentPage = lastPage}
    else if(currentPage < 1) {currentPage = 1;}
    const buttons = [];

    let backoffset = -Math.trunc(buttonsCount/2);
    if (currentPage + backoffset <= 0)
    {
   
        backoffset = 0;
    }
    else if(currentPage - backoffset >= lastPage)
    {
        backoffset = backoffset*2;
    }

    if(buttonsCount > lastPage)
    {
        buttonsCount = lastPage;
    }
    for(let i = 0; i < buttonsCount; i++)
        {
            let _page = currentPage + i + backoffset;
            if(_page == currentPage)
            {
                buttons.push(<button className={styles.pageControllerPageCurrent}
                    onClick={() => setCurrentPage(_page)}> {_page} </button>);
            }
            else{
                buttons.push(<button className={styles.pageControllerPage}
                    onClick={() => setCurrentPage(_page)}> {_page} </button>);
            }
            
        }

    return (                
    <div className={styles.pageController}>
        <div style={{
            display:"flex",
            justifyContent:"space-between"
            
        }}>
            <button className={styles.pageControllerAccent}
                    onClick={() => setCurrentPage(currentPage - 1)}> {"<<"} </button>

            <button className={styles.pageControllerAccent}
                    onClick={() => setCurrentPage(currentPage + 1)}> {">>"}</button>
        </div>
        
        <div style={{
            display:"flex",
            justifyContent:"space-between"
            
        }}>
       
        
            <button className={styles.pageControllerPageEdge} onClick={() => setCurrentPage(1)}> 1.. </button>
            {buttons}
            <button className={styles.pageControllerPageEdge}  onClick={() => setCurrentPage(lastPage)}> ..{lastPage} </button>

        </div>
    </div>
    );
}