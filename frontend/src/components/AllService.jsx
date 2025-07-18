import React from 'react'
import { FaTruck, FaIdBadge, FaMoneyBillWave, FaSyncAlt } from 'react-icons/fa';
function AllService() {
    const services = [
        {
            icon: <FaTruck size={30} className="text-warning" />,
            title: 'Free Delivery',
            subtitle: 'Above ₹500 Only',
        },
        {
            icon: <FaIdBadge size={30} className="text-warning" />,
            title: 'Certified by Experts',
            subtitle: '100% Guarantee',
        },
        {
            icon: <FaMoneyBillWave size={30} className="text-warning" />,
            title: 'Huge Savings',
            subtitle: 'At Lowest Price',
        },
        {
            icon: <FaSyncAlt size={30} className="text-warning" />,
            title: 'Refund Policy',
            subtitle: 'No Questions Asked',
        },
    ];

    return (
        <div className="container">
            <div className="row text-white p-4">
                {services.map((service, index) => (
                    <div className="col-md-3 col-sm-6 mb-3" key={index}>
                        <div className="bg-secondary p-3 rounded text-center h-100">
                            <div className="mb-2">{service.icon}</div>
                            <h5 className="fw-bold">{service.title}</h5>
                            <p className="mb-0">{service.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllService