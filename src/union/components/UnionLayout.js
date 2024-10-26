import React from 'react'
import NavbarComponent from '../../components/NavbarComponent';
import {  Container } from "react-bootstrap";
import { Outlet } from 'react-router-dom';
import FooterComponent from '../../components/FooterComponent';
import ScrollUp from '../../components/ScrollUp';
import PartnersComponent from '../../components/PartnersComponent';
import HeroBanner from '../../components/HeroBanner';

const UnionLayout = () => {
  return (
    <>
        <NavbarComponent />
        <HeroBanner />
        <Container className='App px-0 mb-0' fluid>
            <Outlet/>
        </Container>
        <ScrollUp />
        <PartnersComponent />
        <FooterComponent />
    </>
  )
}

export default UnionLayout