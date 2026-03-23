// app/api/invoices/route.ts
import { NextResponse } from 'next/server';
import { database } from '@/lib/firebase';
import { ref, onValue, push, set, get } from 'firebase/database';
import { send } from 'node:process';

export async function POST(request: Request) {
  const body = await request.json();
  // Logic to process the body and save data (e.g., to a database)
  console.log(body);

  // Get position_x and position_y from Firebase Realtime Database
    const positionRef = ref(database, 'position_x');
    const snapshot = await get(positionRef);
    const position_x = snapshot.val();
    console.log("position_x:", position_x);

    const positionYRef = ref(database, 'position_y');
    const ySnapshot = await get(positionYRef);
    const position_y = ySnapshot.val();
    console.log("position_y:", position_y);

  const sendTestData = (body: JSON) => {
    const newDataRef = push(ref(database, 'signals'));
    set(newDataRef, {
        "position": [position_x, position_y],
        ...body
    });
  };

  sendTestData(body);

  return NextResponse.json({ status: 'success', data: body });
}
