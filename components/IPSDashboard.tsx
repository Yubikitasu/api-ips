'use client';

import { useEffect, useState } from 'react';
import { database } from '@/lib/firebase';
import { ref, onValue, push, set } from 'firebase/database';

export default function IPSDashboard() {
  const [signals, setSignals] = useState<any>(null);
  const [positionX, setPositionX] = useState<number>(0);
  const [positionY, setPositionY] = useState<number>(0);

  useEffect(() => {
    // 1. Tham chiếu đến path 'signals' trong database
    const signalRef = ref(database, 'signals');

    // 2. Lắng nghe thay đổi realtime
    const unsubscribe = onValue(signalRef, (snapshot) => {
      const data = snapshot.val();
      setSignals(data);
      console.log("Dữ liệu mới nhận được:", data);
    });

    const positionXRef = ref(database, 'position_x');
    const positionYRef = ref(database, 'position_y');

    const unsubscribePositionX = onValue(positionXRef, (snapshot) => {
      const data = snapshot.val();
      setPositionX(data);
      console.log("position_x mới nhận được:", data);
    });

    const unsubscribePositionY = onValue(positionYRef, (snapshot) => {
      const data = snapshot.val();
      setPositionY(data);
      console.log("position_y mới nhận được:", data);
    });

    // Cleanup khi component unmount
    return () => {
      unsubscribe();
      unsubscribePositionX();
      unsubscribePositionY();
    };
  }, []);

  const changePosition = () => {

    let x = parseFloat((document.getElementById('posX') as HTMLInputElement).value);
    let y = parseFloat((document.getElementById('posY') as HTMLInputElement).value);

    const positionXRef = ref(database, 'position_x');
    const positionYRef = ref(database, 'position_y');

    set(positionXRef, x);
    set(positionYRef, y);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Realtime Signal Monitor</h1>
      
      <div className="my-4">
        Position: ({positionX}, {positionY})
      </div>

      {/* // Hai form để nhập vị trí x và y */}
      <div className="mb-4">
        <label htmlFor="posX" className="block text-sm font-medium">Position X:</label>
        <input type="number" placeholder="X" className="border p-2 mr-2" id="posX" />
        <label htmlFor="posY" className="block text-sm font-medium">Position Y:</label>
        <input type="number" placeholder="Y" className="border p-2" id="posY"  />
        <button onClick={changePosition} className="bg-blue-500 text-white px-4 py-2 ml-2">Send Position Data</button>
      </div>

      <div>
        {signals ? Object.values(signals).map((signal: any, index: number) => (
          <div key={index}>
            {signal.position ? `${signal.position[0]}, ${signal.position[1]}` : "N/A"},
            {signal.rssi ? (signal.rssi).map((rssi: number) => rssi).join(', ') : "N/A"}
          </div>
        )) : "Đang chờ dữ liệu..."}
      </div>
    </div>
  );
}