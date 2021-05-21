import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import AnimationScrollMore from '../Animation/arrow-down-scroll-more';

function SkeletonScroll() {
    const scrollmore = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: scrollmore.current, // the dom element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: AnimationScrollMore,
        });
    }, []);
    return <div className="d-flex justiy-content-center" ref={scrollmore}></div>;
}

SkeletonScroll.propTypes = {};

export default SkeletonScroll;
