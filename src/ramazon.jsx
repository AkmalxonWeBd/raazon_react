import React, { useState, useEffect } from 'react';

function RamadanCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const martDays = [
        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
        "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
        "31"
    ];
    const aprilDays = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ];

    const martSaharlikVaqtlar = [
        "05:13", "05:12", "05:10", "05:08", "05:07", "05:05", "05:03", "05:01", "05:00", "04:58",
        "04:56", "04:54", "04:53", "04:51", "04:49", "04:47", "04:45", "04:44", "04:42", "04:40",
        "04:38",
    ];
    const aprilSaharlikVaqtlar = [
        "04:36", "04:34", "04:33", "04:31", "04:29", "04:27", "04:25", "04:23", "04:22"
    ];

    const martIftorlikVaqtlar = [
        "18:19", "18:20", "18:21", "18:22", "18:23", "18:24", "18:25", "18:27", "18:28", "18:29",
        "18:30", "18:31", "18:32", "18:33", "18:34", "18:35", "18:36", "18:37", "18:38", "18:39",
        "18:40",
    ];
    const aprilIftorlikVaqtlar = [
        "18:42", "18:43", "18:44", "18:45", "18:46", "18:47", "18:48", "18:49", "18:50"
    ];

    // Qolgan vaqtni hisoblash funksiyasi
    const calculateRemainingTime = (targetTime, iftorlikVaqti) => {
        const diffInMs = targetTime.getTime() - currentDate.getTime();
        if (diffInMs <= 0) {
            if (currentDate.getTime() > iftorlikVaqti.getTime()) {
                return "Utib ketdi";
            } else {
                const diff = iftorlikVaqti.getTime() - currentDate.getTime();
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                return `Saharlik o'tib ketdi: iftorlikga ${hours} soat,${minutes} daqiqa,${seconds} soniya`;
            }
        } else {
            const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diffInMs / (1000 * 60)) % 60);
            const seconds = Math.floor((diffInMs / 1000) % 60);
            return `${days} kun, ${hours} soat, ${minutes} daqiqa, ${seconds} soniya`;
        }
    };

    return (
        <div className="container">
            <div className="header">RAMAZON Taqvimi</div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Sana</th>
                            <th>Saharlik</th>
                            <th>Iftorlik</th>
                            <th>Qolgan vaqt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {martDays.map((day, index) => (
                            <tr key={day}>
                                <td>{`${day} mart`}</td>
                                <td>{martSaharlikVaqtlar[index]}</td>
                                <td>{martIftorlikVaqtlar[index]}</td>
                                <td>{calculateRemainingTime(new Date(`March ${day}, ${currentDate.getFullYear()} ${martSaharlikVaqtlar[index]}`), new Date(`March ${day}, ${currentDate.getFullYear()} ${martIftorlikVaqtlar[index]}`))}</td>
                            </tr>
                        ))}
                        {aprilDays.map((day, index) => (
                            <tr key={day}>
                                <td>{`${day} Aprel`}</td>
                                <td>{aprilSaharlikVaqtlar[index]}</td>
                                <td>{aprilIftorlikVaqtlar[index]}</td>
                                <td>{calculateRemainingTime(new Date(`April ${day}, ${currentDate.getFullYear()} ${aprilSaharlikVaqtlar[index]}`), new Date(`April ${day}, ${currentDate.getFullYear()} ${aprilIftorlikVaqtlar[index]}`))}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RamadanCalendar;
