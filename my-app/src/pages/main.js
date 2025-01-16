import React from 'react';
import Navbar from '../components/navbar';
import Carousel from '../components/carousel';
import Maincard from '../components/mainCard';
import Footer from '../components/footer';
export default function Main() {
    return (
        <>
        <Navbar />
        <Carousel />
        <Maincard />
        <Maincard />
        <Maincard />
        <Footer />
        </>
    );
}