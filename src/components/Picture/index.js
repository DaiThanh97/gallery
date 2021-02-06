import React, { memo, useState } from 'react'
import './style.css';

function Picture(props) {
    const { pic, currentGif } = props;


    return (
        <div className="holder my-5">
            <div className="card text-white bg-light">
                <button className="btnPic" onClick={() => currentGif(pic.images.original.url)}>
                    <img className="card-img-top img-fluid picture" src={pic.images.original.url} alt="" />
                </button>
                <div className="card-body p-2 card-body--config">
                    <i className="fas fa-paperclip"></i>
                    <div className="social-holder">
                        <div className="view">
                            <i className="fas fa-eye"></i>
                            <span className="ml-1">6,231</span>
                        </div>
                        <div className="comment">
                            <i className="fas fa-comment"></i>
                            <span className="ml-1">14</span>
                        </div>
                        <div className="love">
                            <i className="fas fa-heart"></i>
                            <span className="ml-1">550</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="user">
                <img src={pic.user?.avatar_url} className="avatar" />
                <h6 className="username">{pic.username}</h6>
            </div>
        </div>
    )
}

export default memo(Picture)