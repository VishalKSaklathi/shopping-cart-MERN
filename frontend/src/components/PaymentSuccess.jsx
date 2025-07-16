import React from 'react'
import paymentSuccessImg from '../assets/payment_success.png'
import { FaHome, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom'

function PaymentSuccess() {
    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                textAlign: 'center',
                fontFamily: 'Arial, sans-serif',
            }}>
                <img
                    src={paymentSuccessImg}
                    alt="payment_success"
                    style={{ width: '200px', height: '200px', objectFit: 'contain', marginBottom: '20px' }}
                />
                <p style={{ fontSize: '20px', marginBottom: '20px' }}>Your order has been placed</p>

                <Link to='/' style={{
                    textDecoration: 'none',
                    color: '#fff',
                    backgroundColor: '#4CAF50',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '16px'
                }}>
                    <FaHome />
                    Go to home
                    <FaArrowRight />
                </Link>
            </div>

        </>
    )
}

export default PaymentSuccess;