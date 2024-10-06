import { InfiniteScrollCustomEvent } from "@ionic/core";
import { ReactNode } from "react";

type infiniteScrollProps = { fetchItems: (page: number) => Promise<void>, children: ReactNode, page: number }

const InfiniteScroll: React.FC<infiniteScrollProps> = ({ fetchItems, children, page }) => {
    return (
        <>
            <ion-list>
                {children}
            </ion-list>
            <ion-infinite-scroll threshold="2000px" onIonInfinite={(ev: InfiniteScrollCustomEvent) => {
                console.log("infinite scroll event is firing");
                fetchItems(page).then(() => {
                    setTimeout(() => ev.target.complete(), 5000);
                });
            }}>
                <ion-infinite-scroll-content loadingSpinner={"lines"}>
                    
                </ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </>
    );
}

export default InfiniteScroll;