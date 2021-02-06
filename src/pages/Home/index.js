import React, { useEffect, useRef, useState } from 'react'
import Picture from '../../components/Picture';
import { pictureService } from './../../services/picture.service';
import InfiniteScroll from 'react-infinite-scroll-component';
import Carousel, { Modal, ModalGateway } from 'react-images';

export default function Home() {
    const offset = useRef(0);
    const limit = useRef(20);
    const total = useRef(0);
    const [gif, setGif] = useState({ isOpen: false, url: '' });

    const [listPicture, setListPicture] = useState([]);

    useEffect(async () => {
        await callGetPictures();
    }, []);

    const toggleModal = () => {
        setGif({
            ...gif,
            isOpen: !gif.isOpen
        });
    }

    const currentGif = (url) => {
        setGif({
            ...gif,
            url,
            isOpen: true
        });
    }

    const loadMorePictures = async () => {
        console.log("LOADINGGG")
        offset.current += limit.current;
        await callGetPictures();
    }

    const callGetPictures = async () => {
        const { data } = await pictureService.fetchPictures(offset.current, limit.current);
        total.current = data.pagination.total_count;
        setListPicture(listPicture.concat(data.data));
    }

    const generatePictures = () => {
        return listPicture.map((pic, index) => {
            return <div className="col-6 col-md-4 col-lg-3" key={index}>
                <Picture pic={pic} currentGif={currentGif} />
            </div>
        })
    }

    return (
        <div>
            <InfiniteScroll
                dataLength={listPicture.length}
                next={loadMorePictures}
                hasMore={total.current !== listPicture.length}
                loader={<h4 className="text-center mt-5">Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div className="container mt-5">
                    <div className="row">
                        {generatePictures()}
                    </div>
                </div>
            </InfiniteScroll>
            <ModalGateway>
                {gif.isOpen ? (
                    <Modal onClose={toggleModal}>
                        <Carousel views={[{ src: gif.url }]} />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    )
}
