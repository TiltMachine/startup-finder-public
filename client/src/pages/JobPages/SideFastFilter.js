import React from 'react';
import {Container, Row} from "react-bootstrap";

const SideFastFilter = () => {
    return (
        <Container>
            <Row className='whiteBox2 text-center mt-2 mb-2 cursor_pointer'><div>DeFi</div></Row>
            <Row className='whiteBox2 text-center mb-2 cursor_pointer'><div>NFT</div></Row>
            <Row className='whiteBox2 text-center mb-2 cursor_pointer'><div>Web3</div></Row>
            <Row className='whiteBox2 text-center mb-2 cursor_pointer'><div>Polkadot</div></Row>
            <Row className='whiteBox2 text-center mb-2 cursor_pointer'><div>BNB Chain</div></Row>
            <Row className='whiteBox2 text-center mb-2 cursor_pointer'><div>Solana</div></Row>
            <Row className='whiteBox2 text-center mb-2 cursor_pointer'><div>Avalanche</div></Row>
            <Row className='whiteBox2 text-center mb-2 cursor_pointer'><div>DeFi</div></Row>
        </Container>
    )
}

export default SideFastFilter