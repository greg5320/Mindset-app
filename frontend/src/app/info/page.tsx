import React, { Suspense } from 'react';
import ClientProgram from './clientProgram';

export default function InfoPage() {
  return (
    <Suspense fallback={<div>Загрузка страницы...</div>}>
      <ClientProgram />
    </Suspense>
  );
}