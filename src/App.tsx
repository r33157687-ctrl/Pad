/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AnimatedLogin } from './components/AnimatedLogin';
import { AdminCommandCenter } from './components/AdminCommandCenter';
import { StudentPortal } from './components/StudentPortal';
import { PostModal } from './components/PostModal';
import { DetailViewerModal } from './components/DetailViewerModal';
import { ToastContainer } from './components/ToastContainer';

function PortalRouter() {
  const { session, adminPreviewAsStudent } = useApp();

  // 1. If not logged in -> Show Animated Login Page
  if (!session.isLoggedIn) {
    return <AnimatedLogin />;
  }

  // 2. If logged in as Admin and not in Student Preview Mode -> Show Admin Command Center
  if (session.role === 'admin' && !adminPreviewAsStudent) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
        <AdminCommandCenter />
        <PostModal />
        <DetailViewerModal />
        <ToastContainer />
      </div>
    );
  }

  // 3. Logged in as Student / Member (or Admin previewing student portal)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      <StudentPortal />
      <PostModal />
      <DetailViewerModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <PortalRouter />
    </AppProvider>
  );
}
