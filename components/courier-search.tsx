import React, { useState, useCallback } from 'react';
import debounce from "lodash/debounce";
import DHLLogo from '@/assets/images/delivery/dhl.png';
import OrlenLogo from '@/assets/images/delivery/orlen.png';
import InpostLogo from '@/assets/images/delivery/inpost.png';
import Image from "next/image";

const fetchCouriers = async (query) => {
    const response = await fetch('https://api.polkurier.pl/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            authorization: {
                login: '78334',
                token: process.env.NEXT_PUBLIC_POLKURIER_API_TOKEN,
            },
            apimethod: 'get_courier_point',
            data: {
                couriers: ['PACZKA_W_RUCHU', 'INPOST_PACZKOMAT', 'DHL_POINT'],
                searchquery: query,
            },
        }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
};

const fetchPrice = async () => {
    const response = await fetch('https://api.polkurier.pl/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            authorization: {
                login: '78334',
                token: process.env.NEXT_PUBLIC_POLKURIER_API_TOKEN,
            },
            apimethod: 'order_valuation',
            data: {
                shipmenttype : "envelope",
                packs: [{
                    length: 10,
                    width: 20,
                    height: 30,
                    weight: 5,
                    amount: 1,
                    type: "ST"
                }],
                returnvaluations: "INPOST_PACZKOMAT"
            },
        }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
};


const CourierSearch = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [couriers, setCouriers] = useState([]);
    const [selectedCourier, setSelectedCourier] = useState(null);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const debouncedSearch = useCallback(
        debounce(async (value) => {
            if (value.length > 2) {
                try {
                    const result = await fetchCouriers(value);
                    setCouriers(result.response);
                    setDropdownOpen(true);
                } catch (error) {
                    console.error('Błąd podczas pobierania listy kurierów:', error);
                }
            } else {
                setCouriers([]);
                setDropdownOpen(false);
            }
        }, 200),
        []
    );

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
    };

    const handleCourierClick = async (courier) => {
        setSelectedCourier(courier);
        setQuery(courier.id);
        setDropdownOpen(false);

        try {
            const result = await fetchPrice()
            onSearch(result.response.grossprice);
        } catch (error) {
            console.error('Błąd podczas pobierania ceny dowozu', error);
        }
    };

    const handleInputFocus = () => {
        if (query.length > 2) {
            setDropdownOpen(true);
        }
    };

    return (
        <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className="flex w-full mb-4">
                <Image
                    src={DHLLogo}
                    alt="DHL Logo"
                    width={100}
                    height={100}
                    className="w-[75px] md:w-[125px] object-contain flex-shrink-0 mr-6"
                />
                <Image
                    src={InpostLogo}
                    alt="Inpost Logo"
                    width={125}
                    height={250}
                    className="w-[75px] md:w-[125px] h-auto object-contain flex-shrink-0 mr-6"
                />
                <Image
                    src={OrlenLogo}
                    alt="Orlen Logo"
                    width={50}
                    height={50}
                    className="w-[75px] md:w-[100px] h-auto object-contain flex-shrink-0"
                />
            </div>

            <p className="text-xl font-bold mb-4">Wybierz swój punkt odbioru (min. 3 znaki) i oblicz koszty przesyłki:</p>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                placeholder="Szukaj punktu..."
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {isDropdownOpen && couriers.length > 0 && (
                <ul className="border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto bg-white shadow-lg z-10">
                    {couriers.map((courier) => (
                        <li
                            key={courier.id}
                            onClick={() => handleCourierClick(courier)}
                            className={`p-3 cursor-pointer hover:bg-blue-100 ${
                                selectedCourier?.id === courier.id ? 'bg-blue-200' : ''
                            }`}
                        >
                            {courier.id} - {courier.city} - {courier.address}
                        </li>
                    ))}
                </ul>
            )}

            {selectedCourier && (
                <div className="mt-6 p-4 border border-gray-300 rounded-md bg-gray-50">
                    <h2 className="text-lg font-black font-semibold">Szczegóły dostawy</h2>
                    <p><strong>ID:</strong> {selectedCourier.name || selectedCourier.id} - {selectedCourier.provider}</p>
                    <p><strong>Miasto:</strong> {selectedCourier.city}</p>
                    <p><strong>Kod pocztowy:</strong> {selectedCourier.zip}</p>
                    <p><strong>Ulica:</strong> {selectedCourier.street}</p>
                    <p><strong>Adres:</strong> {selectedCourier.address}</p>
                </div>
            )}
        </div>
    );
};

export default CourierSearch;
