// AngleContext.js
import React, { createContext, useContext, useState } from 'react';

const AngleContext = createContext();

export const AngleProvider = ({ children }) => {
    const [angle, setAngle] = useState(180);
    const [data, setData] = useState([])
    const [ss, setSs] = useState([])
    const [galeri, setGaleri] = useState([])
    const [ssGal, setSsGal] = useState()

    console.log(ss)

    return (
        <AngleContext.Provider value={{ angle, setAngle, data, setData, ss, setSs, galeri, setGaleri, ssGal, setSsGal }}>
            {children}
        </AngleContext.Provider>
    );
};

export const useAngle = () => useContext(AngleContext);
